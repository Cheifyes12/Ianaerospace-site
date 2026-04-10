#!/usr/bin/env python3
"""
Batavia Aerospace — Local Dev Server
Run: python3 serve.py
Then open: http://localhost:8080
"""
import http.server, socketserver, os, webbrowser, threading, time

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # silence request logs; remove this line if you want to see them

def open_browser():
    time.sleep(0.8)
    webbrowser.open(f"http://localhost:{PORT}")

print(f"🚀 Batavia Aerospace dev server running at http://localhost:{PORT}")
print("   Press Ctrl+C to stop\n")
threading.Thread(target=open_browser, daemon=True).start()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
