# Fingerspelling - 한글 지문자 연습

한글 지문자를 연습하기 위한 사이트.

## 개발 관련

### Getting Started

development server 실행:

```bash
yarn dev
```

자동으로 [http://localhost:3001](http://localhost:3001)에서 결과를 확인할 수 있음.

[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)를 사용하여 IBM Plex Sans KR 폰트를 적용함.

### 사용 API

#### [우리말샘](https://opendict.korean.go.kr/service/openApiInfo)

> 우리말샘에 구축된 사전 정보를 검색할 수 있는 오픈 API.
>
> 사전 검색(https://opendict.korean.go.kr/api/search)과 사전 내용 조회(https://opendict.korean.go.kr/api/view)가 가능하다.
>
> 서비스 요청이 하루에 50,000건으로 제한되므로 주의 필요.
