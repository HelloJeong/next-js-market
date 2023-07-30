# <svg aria-label="Next.js logomark" class="next-mark_root__wLeec" height="80" role="img" viewBox="0 0 180 180" width="80"><mask height="180" id=":R0:mask0_408_134" maskUnits="userSpaceOnUse" style="mask-type:alpha" width="180" x="0" y="0"><circle cx="90" cy="90" fill="black" r="90"></circle></mask><g mask="url(#:R0:mask0_408_134)"><circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#:R0:paint0_linear_408_134)"></path><rect fill="url(#:R0:paint1_linear_408_134)" height="72" width="12" x="115" y="54"></rect></g><defs><linearGradient gradientUnits="userSpaceOnUse" id=":R0:paint0_linear_408_134" x1="109" x2="144.5" y1="116.5" y2="160.5"><stop stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id=":R0:paint1_linear_408_134" x1="121" x2="120.799" y1="54" y2="106.875"><stop stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient></defs></svg> [**Next.js**](https://nextjs.org/ "next 공식 홈페이지")

_Fastcampus nextjs13 강의 내용을 정리해둔 자료입니다._

<br />
<br />

# docker-compose.yml

```bash
docker-compose up
```

pgadmin 페이지에서 server 생성 추가 할 때 Hostname에는 container_name(현재 파일 기준 `postgres`)을 입력해준다.

# prisma[참고](https://authjs.dev/reference/adapter/prisma)

```bash
npx prisma db push
```

? - optional <br />
@id - primary key<br />
@unique - unique<br />
@default(cuid()) - auto increment id<br />
@relation<br />

### \[...nextauth\].ts 파일

import { PrismaAdapter } from "@next-auth/prisma-adapter";
@auth/prisma-adapter 타입 문제 발생하여 @next-auth로

### providers[참고](https://next-auth.js.org/providers/credentials)

### configurations[참고](https://next-auth.js.org/configuration/nextjs)

- matcher에 설정된 routing은 로그인된 유저만 갈 수 있게 됨

### next-cloudinary[참고](https://next-cloudinary.spacejelly.dev/)

- settings - upload - upload preset unsigned 변경
- next.config.js 수정
- dashboard - media library에서 upload 파일들 확인 가능

### react-kakao-maps-sdk[참고](https://react-kakao-maps-sdk.jaeseokim.dev/)

- `LatLng is not a constructor`

  - sdk Script에서 `&autoload=false` 추가

- KakaoMap componen를 dynamic import를 하지 않으면 에러가 남

### app/(home)

- 경로를 건드리지 않는 그룹핑의 개념

### react-toastify[참고](https://www.npmjs.com/package/react-toastify)

- `import 'react-toastify/dist/ReactToastify.css';`
- client 컴포넌트이기 때문에 component를 만들어서 layout에 붙이는 형태로 사용

### dayjs[참고](https://day.js.org/)

> relativeTime

```javascript
dayjs.extend(relativeTime);

var a = dayjs("2000-01-01");

dayjs("1999-01-01").from(a); // a year ago
```

### pagination

> npm install @lucasmogari/react-pagination

### react-loader-spinner[참고](https://www.npmjs.com/package/react-loader-spinner)

### 채팅을 구현하는 여러가지 방법

1. http polling
1. websocket
1. redis
1. pusher 등

해당 강의에서는 polling을 이용한 방법

### polling

- 클라이언트가 일정한 간격으로 서버에 요청을 보내서 결과를 전달받는 방식

```typescript
const POLL_TIME = 1000;

setInterval(() => fetch("url"), POLL_TIME);
```

- 구현이 상당히 쉽지만 서버에 부담이 됨
- 폴링의 주기가 짧으면 서버 성능에 부담
- 주기가 길면 실시간성이 좋지 않음
- 서버에서 바뀐 데이터가 없어도 계속 요청을 해야하고 결과를 줘야함

### long polling [참고](https://systemdesignbasic.wordpress.com/2020/02/01/12-long-polling-vs-websockets-vs-server-sent-events/)

- 요청을 보내면 서버가 대기하고 있다가 이벤트가 발생했거나 타임아웃이 발생할 때까지 기다린 후에 응답을 주게 됨
- 클라이언트는 응답을 받자마자 다시 요청을 보낸다
- 서버의 상태 변화가 많이 없다면 폴링 방식보다 서버의 부담이 줄어든다
- 실시간 메시지 전달이 중요하지만, 서버의 상태 변화가 자주 발생하지 않는 서비스에 적합

### streaming

- 클라이언트에서 서버에 요청을 보내고 끊기지 않는 연결상태에서 계속 데이터를 수신
- 양방향 소통보다는 서버에서 계속 요청을 받는 것에 유용

### websocket

- handshake을 위해서만 http 프로토콜을 이용하고 그 이후부터는 독립적인 프로토콜 ws를 사용
- 임의로 연결을 끊기 전까지는 계속 연결이 되어 있음

### SWR(stale-while-revalidate) [참고](https://swr.vercel.app/)

- 데이터를 가져오기 위한 React Hook 라이브러리
- 원격 데이터를 가져올 때 캐싱된 데이터가 있으면 그 데이터를 먼저 반환(stale)한 다음 가져오기 요청(revalidate)을 보내고, 마지막으로 최신 데이터와 함께 제공하는 라이브러리
- 특징 및 장점
  - Lightweight
  - Realtime
  - Suspense
  - Pagination
  - Backend Agnostic
  - SSR / SSG Ready
  - Typescript Ready
  - Remote + Local

### useSWRMutation [참고](https://swr.vercel.app/docs/mutation#userswrmutation)

- useSWR : 먼저 요청을 보내고 mutate를 사용할 수 있음
- useSWRMutation : 요청을 보내지 않고 trigger를 통해 요청을 보냄
