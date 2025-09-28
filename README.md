# psytest

간단한 포춘쿠키/운세 웹앱. 쿠키를 깨면 오늘의 운세 지수와 키워드를 보여줍니다.
[🔗 데모 바로가기](https://tomato-300v3a-300v4a-300v5a-200a4b-200a5b.taild52800.ts.net/)  

## 서비스 이미지 
<img width="199" height="423" alt="image" src="https://github.com/user-attachments/assets/a35719eb-7ae4-4e0b-9c60-97d94932c23b" /> <img width="200" height="424" alt="image" src="https://github.com/user-attachments/assets/46c2abbc-69a9-4a36-978d-c1923a92e0cc" /> <img width="199" height="424" alt="image" src="https://github.com/user-attachments/assets/f1c0394d-2f11-4492-a071-a470123955fe" />

## 기술 스택
![Spring Boot](https://img.shields.io/badge/SpringBoot-6DB33F?logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

## 주요 기능
- 🍪 포춘쿠키 개봉 애니메이션
- 📊 오늘의 운세 지수 / 키워드 제공
- 🔗 결과 공유(링크 복사)

## 기능 개선
- 원인: 서버 캐시 + preload + 프론트 애니메이션
- 결과: **평균 응답시간 200ms → 40ms (–80%)**
- (측정 조건) Chrome DevTools, 동일 네트워크, **n=20**, 캐시 워밍 후(304 포함)

### 성능 요약
| 지표 | 개선 전 | 개선 후 | 비고 |
|---|---:|---:|---|
| 평균 API 응답 | 200ms | **40ms** | n=20, 워밍 후 |
| 첫 문서 로드 | 636ms | **11ms** | DevTools |
| 주요 정적 리소스 | 수십~수백 ms | **10~40ms** | preload/304 효과 |

- 백엔드: **in-memory 캐시(TTL)** 적용으로 반복 연산 제거
- 프론트: **로딩 애니메이션**으로 체감 지연 상쇄, **`<link rel="preload">`** 적용
  
<p align="center">
  <div> <개선 전> </div>
  <div> <img width="754" height="283" alt="image" src="https://github.com/user-attachments/assets/53b31bd4-1141-40fc-8472-2b88312bfd65" /> </div>
</p>
<p align="center">
  <div> <개선 후> </div>
  <div> <img width="754" height="308" alt="image" src="https://github.com/user-attachments/assets/0a86e90e-735f-4fd6-8f1c-0ce59d838deb" /> </div>
</p>


<img width="377" height="190" alt="image" src="https://github.com/user-attachments/assets/cea59545-76ab-4802-a4b2-f2af79b79d77" />

<img width="379" height="199" alt="image" src="https://github.com/user-attachments/assets/0b4a9c75-0212-4c0d-8dd9-4005c1a0ec9d" />
