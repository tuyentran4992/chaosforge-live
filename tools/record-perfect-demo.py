import os
import glob
import subprocess
from playwright.sync_api import sync_playwright

RAW_DIR = "user/media/raw_video"
AUDIO_TRACK = "user/media/voiceover-full.mp3"
FINAL_OUTPUT = "user/media/chaosforge-demo-2min.mp4"

os.makedirs(RAW_DIR, exist_ok=True)
for f in glob.glob(f"{RAW_DIR}/*"):
    try:
        os.remove(f)
    except:
        pass

print("[1/5] Launching Playwright Chromium...")
with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        args=[
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--enable-gpu",
            "--use-gl=angle",
            "--enable-webgl",
            "--disable-background-timer-throttling",
            "--disable-backgrounding-occluded-windows",
            "--disable-renderer-backgrounding"
        ]
    )
    context = browser.new_context(
        viewport={"width": 1920, "height": 1080},
        record_video_dir=RAW_DIR,
        record_video_size={"width": 1920, "height": 1080}
    )
    page = context.new_page()
    
    print("[2/5] Navigating to http://127.0.0.1:3000/#stage...")
    page.goto("http://127.0.0.1:3000/#stage")
    page.wait_for_selector("#hypeBtn")
    # Intro voiceover (t=0..10s)
    page.wait_for_timeout(10000)
    
    print("[3/5] Starting 1-Click Simulate 500 Viewers Hype...")
    page.click("#hypeBtn")
    # Poll runs for 15s (t=10..26s)
    page.wait_for_timeout(16000)
    
    # Active chaos begins (t=26..36s)
    page.wait_for_timeout(10000)
    
    # Doge meme prompt (t=36..55s)
    print("Submitting Doge Meme prompt...")
    page.fill("#judgePrompt", "!forge bonk doge storm with boom sound")
    page.click("#judgeCompile")
    page.wait_for_timeout(19000)
    
    # Popcat meme prompt (t=55..74s)
    print("Submitting Popcat Meme prompt...")
    page.fill("#judgePrompt", "!forge zero gravity popcat invasion with bruh sound")
    page.click("#judgeCompile")
    page.wait_for_timeout(19000)
    
    # Panic clear (t=74s)
    print("Demonstrating Broadcaster Safety: Spacebar Panic Clear...")
    page.click("#panicMiniBtn")
    page.wait_for_timeout(3000)
    
    # Streamer Deck (t=77..95s)
    print("Navigating to Streamer Control Deck (#deck)...")
    page.evaluate("() => { location.hash = '#deck'; }")
    page.wait_for_timeout(7000)
    
    print("Connecting Raid Room TW26 and firing chaos cartridge...")
    page.evaluate("() => { document.getElementById('joinRoom')?.click(); }")
    page.wait_for_timeout(2000)
    page.evaluate("() => { document.getElementById('sendCart')?.click(); }")
    page.wait_for_timeout(9000)
    
    # OBS Overlay (t=95..105s)
    print("Navigating to OBS Transparent Overlay (#overlay)...")
    page.evaluate("() => { location.hash = '#overlay'; }")
    page.wait_for_timeout(10000)
    
    # Return to Stage for finale hero shot (t=105..117s)
    print("Returning to Stage (#stage) for finale hero shot...")
    page.evaluate("() => { location.hash = '#stage'; }")
    page.wait_for_timeout(12000)
    
    print("[4/5] Closing browser and saving video...")
    context.close()
    browser.close()

# Locate recorded webm
raw_files = glob.glob(f"{RAW_DIR}/*.webm")
if not raw_files:
    raise RuntimeError("No recorded video found in raw_video directory")

raw_video = raw_files[0]
print(f"Raw video recorded: {raw_video}")

# Verify duration of raw video
probe = subprocess.run(
    ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", raw_video],
    capture_output=True, text=True, check=True
)
raw_dur = float(probe.stdout.strip())
print(f"Raw video duration: {raw_dur:.2f} seconds")

# Encode to 60 FPS MP4 with voiceover mixed
print("[5/5] Encoding to 60 FPS H.264 MP4 with full voiceover audio...")
encode_cmd = [
    "ffmpeg", "-y",
    "-i", raw_video,
    "-i", AUDIO_TRACK,
    "-filter:v", "minterpolate=fps=60:mi_mode=blend",
    "-c:v", "libx264",
    "-preset", "fast",
    "-crf", "20",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    FINAL_OUTPUT
]
subprocess.run(encode_cmd, check=True)
print(f"SUCCESS: Perfect 60 FPS demo video with voiceover saved to {FINAL_OUTPUT}!")
