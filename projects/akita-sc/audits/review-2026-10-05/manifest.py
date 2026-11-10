# Regenerates the PHASE-0-SPEC §9.7 manifest rows from the current artifacts (same app list, same method).
import base64, hashlib, json, re, sys
root = '/Users/kylebreeding/akita/akita-sc'
spec = open(f'{root}/docs/principal-resolution/PHASE-0-SPEC.md').read()
sec = spec[spec.index('### 9.7 Final artifact manifest'):]
sec = sec[:sec.index('\n### ', 10)] if '\n### ' in sec[10:] else sec
rows = re.findall(r'^\| ([^|]+?) \| `([^`]+)` \| ([\d,]+) \| (\d+) \| (?:(\d+) \| )?`([0-9a-f]{64})` \|(?: ([^|]*)\|)?', sec, re.M)
out = []
for name, path, old_b, old_clear, old_pages, old_sha, note in rows:
    d = json.load(open(f'{root}/projects/akita-sc/smart_contracts/artifacts/{path}.arc56.json'))
    a = base64.b64decode(d['byteCode']['approval']); c = base64.b64decode(d['byteCode']['clear'])
    pages = -(-(len(a) + len(c)) // 2048) - 1
    sha = hashlib.sha256(a).hexdigest()
    changed = '' if sha == old_sha else ' (changed)'
    out.append((name, path, len(a), len(c), pages, sha, (note or '').strip(), int(old_b.replace(',', '')), changed))
for name, path, a, c, p, sha, note, old, ch in out:
    delta = f'{a - old:+,}' if a != old else '0'
    print(f'| {name} | `{path}` | {a:,} | {delta} | {c} | {p} | `{sha}`{ch} | {note} |')
print(len(out), 'apps', sum(1 for r in out if r[8]), 'changed', file=sys.stderr)
