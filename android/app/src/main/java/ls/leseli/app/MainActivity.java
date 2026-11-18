package ls.leseli.app;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.WindowManager;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.webkit.WebViewAssetLoader;

/**
 * Leseli – a thin Android shell around the offline web app in assets/www.
 * The app is served from https://appassets.androidplatform.net/ by WebViewAssetLoader, so it is a
 * "secure origin" (microphone recording and storage work) but NOTHING is loaded from the internet:
 * the manifest does not even ask for the INTERNET permission.
 */
public class MainActivity extends Activity {
    static final String START = "https://appassets.androidplatform.net/assets/www/index.html";
    private static final int REQ_MIC = 7, REQ_FILE = 8;
    WebView web;
    LeseliBridge bridge;
    private PermissionRequest pendingWebPermission;
    private Runnable afterMic;
    private ValueCallback<Uri[]> fileCallback;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        web = new WebView(this);
        setContentView(web);

        final WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);          // localStorage: settings, progress
        s.setDatabaseEnabled(true);            // IndexedDB: voice recordings
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(true);
        s.setTextZoom(100);                    // Leseli has its own text-size setting
        s.setCacheMode(WebSettings.LOAD_NO_CACHE);

        bridge = new LeseliBridge(this);
        web.addJavascriptInterface(bridge, "LeseliNative");

        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return loader.shouldInterceptRequest(request.getUrl());
            }
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri u = request.getUrl();
                if ("appassets.androidplatform.net".equals(u.getHost())) return false;
                try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (Exception ignored) { }
                return true;
            }
        });

        web.setWebChromeClient(new WebChromeClient() {
            // getUserMedia (recording questions / narration) -> Android microphone permission
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(() -> {
                    if (hasMic()) request.grant(request.getResources());
                    else { pendingWebPermission = request; askMic(null); }
                });
            }
            // <input type="file"> (importing lesson packs / backups)
            @Override
            public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams params) {
                if (fileCallback != null) fileCallback.onReceiveValue(null);
                fileCallback = cb;
                Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("*/*");
                try { startActivityForResult(Intent.createChooser(i, "Leseli"), REQ_FILE); }
                catch (Exception e) { fileCallback = null; return false; }
                return true;
            }
        });

        if (savedInstanceState != null) web.restoreState(savedInstanceState);
        else web.loadUrl(START);
    }

    boolean hasMic() {
        return Build.VERSION.SDK_INT < 23 || checkSelfPermission(Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED;
    }

    void askMic(Runnable then) {
        afterMic = then;
        if (Build.VERSION.SDK_INT >= 23) requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, REQ_MIC);
    }

    @Override
    public void onRequestPermissionsResult(int code, String[] perms, int[] results) {
        super.onRequestPermissionsResult(code, perms, results);
        if (code != REQ_MIC) return;
        boolean ok = results.length > 0 && results[0] == PackageManager.PERMISSION_GRANTED;
        if (pendingWebPermission != null) {
            if (ok) pendingWebPermission.grant(pendingWebPermission.getResources()); else pendingWebPermission.deny();
            pendingWebPermission = null;
        }
        if (afterMic != null) { Runnable r = afterMic; afterMic = null; if (ok) r.run(); else bridge.listenFailed("permission"); }
    }

    @Override
    protected void onActivityResult(int req, int res, Intent data) {
        super.onActivityResult(req, res, data);
        if (req == REQ_FILE && fileCallback != null) {
            Uri[] out = (res == RESULT_OK && data != null && data.getData() != null) ? new Uri[]{data.getData()} : null;
            fileCallback.onReceiveValue(out);
            fileCallback = null;
        }
    }

    /** Android back button: let the web app go back (close dialogs, previous page) first. */
    @Override
    public void onBackPressed() {
        web.evaluateJavascript("(window.LeseliBridge && LeseliBridge.back) ? LeseliBridge.back() : false", value -> {
            if (!"true".equals(value)) super.onBackPressed();
        });
    }

    void keepScreenOn(boolean on) {
        runOnUiThread(() -> {
            if (on) getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            else getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        });
    }

    void js(final String code) { runOnUiThread(() -> web.evaluateJavascript(code, null)); }

    @Override protected void onSaveInstanceState(Bundle out) { super.onSaveInstanceState(out); web.saveState(out); }
    @Override protected void onPause() { super.onPause(); bridge.stop(); }
    @Override protected void onDestroy() { bridge.shutdown(); web.destroy(); super.onDestroy(); }
}
