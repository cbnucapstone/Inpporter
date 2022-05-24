from io import TextIOWrapper

import speech_recognition as sr
from pydub import AudioSegment
import sys

sys.stdout = TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')  # 한글 깨짐 방지 위한 부분

#AudioSegment.converter = "C:\\Program Files\\ffmpeg-5.0.1-full_build\\ffmpeg-5.0.1-full_build\\bin\\ffmpeg.exe"
#AudioSegment.ffmpeg = "C:\\Program Files\\ffmpeg-5.0.1-full_build\\ffmpeg-5.0.1-full_build\\bin\\ffmpeg.exe"
#AudioSegment.ffprobe ="C:\\Program Files\\ffmpeg-5.0.1-full_build\\ffmpeg-5.0.1-full_build\\bin\\ffprobe.exe"

src = "apart.mp3"
dst = "test.wav"

audSeg = AudioSegment.from_mp3(src)
audSeg.export(dst, format="wav")

r = sr.Recognizer()
with sr.AudioFile(dst) as source:
    audio = r.record(source, duration=120)

vToText = r.recognize_google(audio_data=audio, language='ko-KR')

print(vToText)