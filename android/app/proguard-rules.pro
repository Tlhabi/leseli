# Keep the JavaScript bridge methods (called by name from the web app)
-keepclassmembers class ls.leseli.app.LeseliBridge { @android.webkit.JavascriptInterface <methods>; }
