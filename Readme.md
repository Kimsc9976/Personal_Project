#개인프로젝트 인증 시스템 구현

진행 순서

1. 가입페이지 형성

1.1 아이디, 비밀번호, 비밀번호 확인, 이메일 (optional 전화번호)

1.1.2 필수적인 칸이 채워지지 않았을 경우 pop-up 반환 후 진행 안됨

1.2 가입 후 pop-up 과 함께 가입페이지로 이동

1.3 아이디 및 비밀번호는 MySQL을 이용하여 저장

1.3.1 비밀번호는 암호화 과정을 통해 DB에 저장



2. 관리자 서버 생성

2.1 관리자 서버에서는 1.3을 확인할 수 있어야함

2.2 유저 관리 페이지 제작 

2.2.1 이 페이지에는 로그인 횟수를 저장할 수 있도록 함

2.2.2 table 우측에는 경고버튼을 두어, 이메일(전화번호)로 경고 문자 발송
      (로그인 시 경고문자가 pop-up될 수 있으면 좋을 듯)

3. 비밀번호 찾기는 등록한 Email 및 아이디을 통해 진행 됨

3.1 두개가 맞을 경우 비밀번호 변경 페이지로

3.1.2 변경된 비밀번호를 MySQL에 저장해야함



** 남는 것 : 캐시, 인증서버 API, Email인증


