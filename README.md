# Desk Glance — 웹앱 (공개 배포본)

책상 위 스마트폰을 초가독성 일정 디스플레이로 바꾸는 완전 온디바이스 앱.

- 배포: GitHub Pages → https://david-hyun.github.io/desk-glance-app/
- 개인정보처리방침: [privacy.html](privacy.html)
- 이 리포는 **빌드 산출물**입니다. 소스는 비공개 리포(`desk-glance`)의 `preview/desk-glance-preview.html`이며,
  `preview/build_webapp.py`가 개인 데이터를 제거하고 PWA 메타를 주입해 이곳의 `index.html`을 생성합니다.
- `.well-known/assetlinks.json`: Play 스토어 TWA 검증용 — Play App Signing의 SHA-256 지문으로 교체 필요.

## 갱신 방법

```bash
cd desk-glance/preview
python build_webapp.py
cd ../../desk-glance-app
git add -A && git commit -m "rebuild" && git push
```
