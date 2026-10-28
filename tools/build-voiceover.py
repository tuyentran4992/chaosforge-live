import subprocess
import os

VOICE = "en-US-AndrewMultilingualNeural"

segments = [
    {
        "id": "seg1",
        "start": 1.0,
        "text": "Every day, millions of Twitch viewers watch their favorite creators, but chat is still trapped in a tiny text box. When streamers are locked in battle, messages get lost and viewers become passive. What if Twitch chat could rewrite reality on the broadcast screen in real time? Meet ChaosForge Live, the real-time Twitch chaos engine powered by OpenAI Codex."
    },
    {
        "id": "seg2",
        "start": 21.0,
        "text": "The entire interaction loop takes just 45 seconds. Viewers type forge with any wild idea into chat. A live poll appears directly on OBS, and chat votes at 4 hertz. The winning idea goes straight into OpenAI Codex. Instead of dangerous eval calls, Codex compiles natural language into a strict JSON Abstract Syntax Tree, defining physics, collisions, and Web Audio envelopes in under 100 milliseconds."
    },
    {
        "id": "seg3",
        "start": 44.0,
        "text": "And then, chaos unleashes! Powered by our Meme Chaos Pack, viewers summon Twitch culture icons like Bonk Doge and Popcat with pure Canvas vector physics. When entities collide, floating neon reaction badges like SKILL ISSUE and RIGGED flash with custom synthesized sound effects."
    },
    {
        "id": "seg4",
        "start": 62.0,
        "text": "Streamers always stay in complete control: our Center 60 percent Safe Zone keeps gameplay crosshairs visible, and the Spacebar Panic Clear purges the entire overlay in under 60 milliseconds. In the Streamer Deck, creators can battle rivals in our Two-Streamer Raid Room by firing chaos cartridges directly across streams."
    },
    {
        "id": "seg5",
        "start": 82.0,
        "text": "OBS Studio setup is seamless with our transparent browser source. ChaosForge Live is built modularly across 76 files, passing 100 percent of automated tests with zero eval. OpenAI Codex transforms Twitch viewers from spectators into co-creators. We cannot wait to see you at TwitchCon!"
    }
]

os.makedirs("user/media/audio_parts", exist_ok=True)

print("Generating audio segments using edge-tts...")
for seg in segments:
    outfile = f"user/media/audio_parts/{seg['id']}.mp3"
    cmd = [
        "edge-tts",
        "--voice", VOICE,
        "--rate", "+5%",
        "--text", seg["text"],
        "--write-media", outfile
    ]
    subprocess.run(cmd, check=True)
    
    # Check duration using ffprobe
    probe = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", outfile],
        capture_output=True, text=True, check=True
    )
    dur = float(probe.stdout.strip())
    print(f"Segment {seg['id']}: start={seg['start']}s, dur={dur:.2f}s, end={seg['start']+dur:.2f}s")
