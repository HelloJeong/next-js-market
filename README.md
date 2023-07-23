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
