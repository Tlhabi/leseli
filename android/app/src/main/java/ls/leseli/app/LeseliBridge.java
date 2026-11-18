package ls.leseli.app;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.util.Base64;
import android.webkit.JavascriptInterface;

import androidx.core.content.FileProvider;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Locale;

/**
 * Everything the web app asks the phone to do. Exposed to JavaScript as window.LeseliNative.
 * See app/js/speech.js for the JavaScript side.
 */
public class LeseliBridge {
    private final MainActivity act;
    private TextToSpeech tts;
    private boolean ttsReady = false;
    private SpeechRecognizer recognizer;

    LeseliBridge(MainActivity a) {
        act = a;
        tts = new TextToSpeech(a, status -> {
            ttsReady = status == TextToSpeech.SUCCESS;
            if (ttsReady) tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                @Override public void onStart(String id) { }
                @Override public void onDone(String id) { act.js("LeseliBridge.onSpeech && LeseliBridge.onSpeech(" + JSONObject.quote(id) + ",'done')"); }
                @Override public void onError(String id) { act.js("LeseliBridge.onSpeech && LeseliBridge.onSpeech(" + JSONObject.quote(id) + ",'error')"); }
            });
        });
    }

    /* ---------- text to speech ---------- */
    private Locale localeOf(String code) {
        String[] p = code.replace('_', '-').split("-");
        return p.length > 1 ? new Locale(p[0], p[1]) : new Locale(p[0]);
    }

    private boolean available(Locale l) {
        try { return tts.isLanguageAvailable(l) >= TextToSpeech.LANG_AVAILABLE; } catch (Exception e) { return false; }
    }

    /** First language from the JSON list that this phone can speak, or "" */
    @JavascriptInterface
    public String bestLang(String jsonList) {
        if (!ttsReady) return "";
        try {
            JSONArray a = new JSONArray(jsonList);
            for (int i = 0; i < a.length(); i++) if (available(localeOf(a.getString(i)))) return a.getString(i);
        } catch (Exception ignored) { }
        return "";
    }

    @JavascriptInterface
    public boolean hasTrueSesotho() { return ttsReady && (available(new Locale("st")) || available(new Locale("st", "ZA"))); }

    @JavascriptInterface
    public void speak(String text, String langsJson, float rate, String id) {
        if (!ttsReady) { act.js("LeseliBridge.onSpeech && LeseliBridge.onSpeech(" + JSONObject.quote(id) + ",'error')"); return; }
        String code = bestLang(langsJson);
        tts.setLanguage(code.isEmpty() ? Locale.ENGLISH : localeOf(code));
        tts.setSpeechRate(Math.max(0.4f, Math.min(1.6f, rate)));
        Bundle b = new Bundle();
        tts.speak(text, TextToSpeech.QUEUE_FLUSH, b, id);
    }

    @JavascriptInterface
    public void stop() { try { if (tts != null) tts.stop(); } catch (Exception ignored) { } }

    /* ---------- speech to text (works offline if the phone has the offline language pack) ---------- */
    @JavascriptInterface
    public void listen(final String lang) {
        act.runOnUiThread(() -> {
            if (!SpeechRecognizer.isRecognitionAvailable(act)) { listenFailed("unavailable"); return; }
            if (!act.hasMic()) { act.askMic(() -> listen(lang)); return; }
            if (recognizer != null) recognizer.destroy();
            recognizer = SpeechRecognizer.createSpeechRecognizer(act);
            recognizer.setRecognitionListener(new RecognitionListener() {
                @Override public void onResults(Bundle r) {
                    ArrayList<String> m = r.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                    String t = (m != null && !m.isEmpty()) ? m.get(0) : "";
                    act.js("LeseliBridge.onListen && LeseliBridge.onListen(" + JSONObject.quote(t) + ", null)");
                }
                @Override public void onError(int error) { listenFailed("e" + error); }
                @Override public void onReadyForSpeech(Bundle p) { }
                @Override public void onBeginningOfSpeech() { }
                @Override public void onRmsChanged(float v) { }
                @Override public void onBufferReceived(byte[] b) { }
                @Override public void onEndOfSpeech() { }
                @Override public void onPartialResults(Bundle b) { }
                @Override public void onEvent(int t, Bundle b) { }
            });
            Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang);
            i.putExtra(RecognizerIntent.EXTRA_PREFER_OFFLINE, true);
            i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
            recognizer.startListening(i);
        });
    }

    void listenFailed(String why) { act.js("LeseliBridge.onListen && LeseliBridge.onListen('', " + JSONObject.quote(why) + ")"); }

    /* ---------- sharing files (reports, lesson packs, backups) by WhatsApp / Bluetooth / email ---------- */
    private File shareDir() { File d = new File(act.getCacheDir(), "share"); d.mkdirs(); return d; }

    private void shareFile(File f, String mime) {
        Uri uri = FileProvider.getUriForFile(act, act.getPackageName() + ".files", f);
        Intent s = new Intent(Intent.ACTION_SEND);
        s.setType(mime);
        s.putExtra(Intent.EXTRA_STREAM, uri);
        s.putExtra(Intent.EXTRA_SUBJECT, f.getName());
        s.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        act.startActivity(Intent.createChooser(s, act.getString(R.string.share_title)));
    }

    private static String safe(String name) { return name.replaceAll("[^A-Za-z0-9._-]", "_"); }

    @JavascriptInterface
    public void shareText(String filename, String text, String mime) {
        try {
            File f = new File(shareDir(), safe(filename));
            OutputStream o = new FileOutputStream(f); o.write(text.getBytes("UTF-8")); o.close();
            shareFile(f, mime == null ? "text/plain" : mime);
        } catch (Exception e) { act.js("toast && toast('Could not share: " + e.getClass().getSimpleName() + "')"); }
    }

    @JavascriptInterface
    public void shareBase64(String filename, String mime, String b64) {
        try {
            File f = new File(shareDir(), safe(filename));
            OutputStream o = new FileOutputStream(f); o.write(Base64.decode(b64, Base64.DEFAULT)); o.close();
            shareFile(f, mime);
        } catch (Exception ignored) { }
    }

    /** Share the installed app itself, so a teacher can pass Leseli to another phone with Bluetooth – no data needed. */
    @JavascriptInterface
    public void shareApp() {
        try {
            File src = new File(act.getApplicationInfo().sourceDir);
            File out = new File(shareDir(), "Leseli.apk");
            InputStream in = new FileInputStream(src); OutputStream o = new FileOutputStream(out);
            byte[] buf = new byte[65536]; int n; while ((n = in.read(buf)) > 0) o.write(buf, 0, n);
            in.close(); o.close();
            shareFile(out, "application/vnd.android.package-archive");
        } catch (Exception ignored) { }
    }

    /* ---------- small things ---------- */
    @JavascriptInterface
    public void vibrate(int ms) {
        try {
            Vibrator v = (Vibrator) act.getSystemService(Context.VIBRATOR_SERVICE);
            if (v == null) return;
            if (Build.VERSION.SDK_INT >= 26) v.vibrate(VibrationEffect.createOneShot(Math.max(5, ms), VibrationEffect.DEFAULT_AMPLITUDE));
            else v.vibrate(Math.max(5, ms));
        } catch (Exception ignored) { }
    }

    @JavascriptInterface
    public void keepScreenOn(boolean on) { act.keepScreenOn(on); }

    @JavascriptInterface
    public String appVersion() {
        try { PackageInfo p = act.getPackageManager().getPackageInfo(act.getPackageName(), 0); return "Android app " + p.versionName; }
        catch (Exception e) { return "Android app"; }
    }

    void shutdown() {
        try { if (tts != null) tts.shutdown(); } catch (Exception ignored) { }
        try { if (recognizer != null) recognizer.destroy(); } catch (Exception ignored) { }
    }
}
