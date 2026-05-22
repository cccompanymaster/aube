# AUBE — 상현역 브런치 카페

`AUBE (오브)` 브랜드 랜딩 페이지. 정적 사이트(HTML + CSS + Vanilla JS).

## 구조

```
.
├── index.html          # 메인 랜딩
├── css/style.css       # 디자인 시스템 · 모든 섹션 스타일
├── js/script.js        # 인트로 · 메뉴 탭 · 스크롤 리빌 · 플로팅 CTA
├── robots.txt
├── sitemap.xml
└── README.md
```

## 디자인 토큰

| 토큰 | 값 |
| --- | --- |
| Warm Ivory | `#F6F1EA` |
| Cream Beige | `#EFE7DA` / `#D8C3A5` |
| Deep Brown | `#8B6B4A` |
| Soft Black | `#1F1F1F` |

폰트: Pretendard(본문), Noto Serif KR(한글 강조), Cormorant Garamond / Playfair Display(영문).

## 섹션 구성

1. Intro Loader (세션당 1회)
2. Hero — "한 접시의 정성은, 공간의 분위기까지 완성합니다."
3. About — 브랜드 무드 + 운영시간 메타
4. Signature Menu — Brunch / Coffee / Dessert 탭
5. Space Mood — 풀블리드 패럴랙스
6. Gallery — 4컷 이미지 그리드
7. Location — 정보 + Google Maps embed + 네이버지도/카카오맵/톡톡/전화 CTA
8. SNS — Instagram 6컷 그리드
9. Footer
10. 하단 고정 CTA(Hero 이탈 시 등장)
11. 우측 플로팅 4버튼: 네이버톡톡 / 인스타그램 / 네이버지도 / 전화(펄스)

## 이미지 교체

현재 이미지는 모두 Unsplash 자리표시자입니다.
실제 매장 사진으로 교체 시:

- Hero: `index.html` 의 `.hero-bg img` (자연광 매장 와이드 컷, 2000px 권장)
- About: 매장 무드 세로컷 4:5
- Menu 9컷: 시그니처 메뉴 4:3
- Mood: 풀블리드 와이드 무드컷
- Gallery 4컷: 1:1.2 세로 비율
- Instagram 6컷: 1:1 정사각

## 실 운영 적용 체크리스트

- [ ] `index.html` 의 `og:url` / `canonical` / `JSON-LD url` 을 실 도메인으로 교체
- [ ] `og:image` 를 1200×630 자체 배너로 교체
- [ ] 메뉴 카드의 메뉴명/설명을 실제 메뉴로 갱신
- [ ] 인스타그램 6컷 자리에 실제 피드 이미지 적용
- [ ] Google Maps embed 의 검색어를 정확한 상호명/주소로 미세조정
- [ ] `sitemap.xml` 의 `loc` 을 실 도메인으로 변경

## 운영 정보

- 상호: AUBE (오브)
- 대표: 송철우
- 사업자등록번호: 251-40-00899
- 주소: 경기도 용인시 수지구 광교마을로91 104호
- 연락처: 010-6890-5907
- 이메일: wanna_dog@naver.com
- 운영시간: 매일 09:00 — 21:00 (월요일 휴무, 브레이크 13:00–15:00)
- Instagram: [@aube_2024](https://instagram.com/aube_2024)
- 네이버톡톡: <https://talk.naver.com/ct/w5yag3>
