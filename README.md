![Logo Image](/docs/icon_beta.png)

# 치지직 방송 알림 디스코드  봇
치지직에서 방송 시작시 자동으로 Discord (디스코드) 메시지를 보내주는 봇입니다

![Preview Discord Bot](/docs/chzzk_preview.png)

## 설치 및 사용법
먼저 해당 Git의 리포지토리를 복사하거나 압축 파일을 다운로드 받아 압축을 풉니다

그런 다음에 필요한 라이브러리들을 설치하기 위해 터미널 및 명령 프롬프트를 열어서 디렉토리 이동 후 `npm i` 명령어를 입력해 주시기 바랍니다

그 후 `.env.example` 파일 이름을 `.env`으로 바꾸고 파일을 열어 **디스코드 토큰**, 그리고 **디스코드 서버의 채널 ID 값**을 입력해주신 다음에, 마찬가지로 `config.json.example` 파일을 `config.json`로 이름을 바꾸고 파일을 열어서 **치지직 사용자 ID**를 입력해 주세요

이제 `npm run start`로 디스코드 봇을 실행해 줍니다! 앞으로 자동으로 생방송 시 디스코드에 자동으로 메시지를 보낼겁니다

## FAQ
> 해당 소스 코드를 자유롭게 사용해도 될까요?

네, MIT 라이선스로 배포되어 누구든지 자유롭게 사용하셔도 됩니다

> 디스코드 봇은 어떻게 만드나요?

[공식 디스코드 개발자 포털](https://discord.com/developers/applications)에 들어가서 애플리케이션을 생성해 주시면 됩니다. 서버에 추가하는 등 자세한 정보는 인터넷 검색으로 활용해 참고해 주시기 바랍니다

> 이 봇이 잘 작동되나요?

2023년 12월 19일 기준으로 현재 작동이 되며, **베타 시작 후 4시간 만에** 제작한 것이라 불안정할 수도 있는 점에 양해 부탁드립니다. 제 개인 서버의 디스코드 봇도 수정하고 있기 때문에 가능하면 업데이트 하겠습니다

### 사용된 라이브러리
* [discord.js](https://discord.js.org)
* [dotenv](https://github.com/motdotla/dotenv)
* [node-cron](https://github.com/node-cron/node-cron)
* [sequelize](https://sequelize.org)
* [sqlite3](https://github.com/TryGhost/node-sqlite3)