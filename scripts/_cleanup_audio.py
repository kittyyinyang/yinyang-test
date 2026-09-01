# -*- coding: utf-8 -*-
"""清理 index.html 中的音频方案残留（用户已决定不用音频）"""
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
P = r"D:\Workbuddy\yinyang-test\index.html"
s = io.open(P, encoding='utf-8').read()
orig = len(s)
removed = []

def cut(pattern, label, flags=0):
    global s
    m = re.search(pattern, s, flags)
    if not m:
        removed.append(f"[miss] {label}")
        return
    s = s[:m.start()] + s[m.end():]
    removed.append(f"[cut ] {label} ({m.end()-m.start()} chars)")

# 1) 音频清单 script 引入
cut(r'\n<script src="data/audio_manifest\.js"></script>', 'audio_manifest script tag')

# 2) 音频 CSS
cut(r'\.ev-item \.ev-go\.ev-go-audio\{[^}]*\}\n', 'CSS .ev-go-audio')
cut(r'\.ev-audio\{[^}]*\}\n', 'CSS .ev-audio')

# 3) 音频播放模式注释块 + evMode + evAudioMeta + evDurTxt + toggleEvAudio
cut(r'/\* ── 原话音频直播[\s\S]*?function toggleEvAudio\(btn, qaId, idx, meta\)\{[\s\S]*?\n\}\n', 'audio functions block')

# 4) toggleEvPlayer 里的 audio 分流分支
cut(r'  /\* forceMode[\s\S]*?else if\(_md!==\'video\'\)\{ var am=evAudioMeta\(qaId, idx\); if\(am\)\{ toggleEvAudio\(btn, qaId, idx, am\); return; \} \}\n',
    'audio branch in toggleEvPlayer')

# 5) 若 evMode 仍在（上面块未覆盖），单独删
cut(r'function evMode\(\)\{\s*try\{[\s\S]*?\n\}\n', 'evMode()')

# 6) audio_manifest 其它引用
cut(r'\.ev-item \.ev-go\.ev-go-audio[^\n]*\n', 'CSS .ev-go-audio (dup)')

io.open(P, 'w', encoding='utf-8').write(s)
print("清理项：")
for r in removed: print("  " + r)
print(f"\n体积 {orig} -> {len(s)} (减少 {orig-len(s)} 字符)")
left = re.findall(r'[^\n]*(?:evAudioMeta|toggleEvAudio|AUDIO_MANIFEST|ev-go-audio|audio_manifest)[^\n]*', s)
print("\n残留引用：", left if left else "无 ✅")
