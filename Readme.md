# ✏️개인프로젝트 인증 시스템 구현 T^T


## 1. 12/25 진행이 마무리 된 부분
- 1. 가입페이지, 로그인페이지
- 2. 유저 관리 페이지(유저 정보는 나오나 관리를 할 수 있는 tool은 제작 못함)
- 3. 인증서버 API (authorization)
- 4. DB를 사용하여 데이터 저장
- 5. Password Encryption 
      --> `이런 보안부분은 처음이라 salt의 저장 위치를 특정짓지 못하겠습니다.`
- 6. JWT를 이용한 access token & refresh token 제출
## 2. 진행이 안 된 부분
- 1. JWT를 이용한 authentication
- 2. Email 인증 
- 3. 프로그램 실행 시 MySQL 자동실행
- 4. 데이터 분할 구체화  --> `(DB에 inform과 person(user)가 있지만, person에 대한 정보는 사용하고 있지 않음)`
- 5. logout key 구현 안 됨


## 3. 기술 스택 : 
- 1. Node.js
- 2. Express.js
- 3. MySQL
- 4. JWT

## 4. 아키텍쳐 : 
![image](https://user-images.githubusercontent.com/68680106/209464807-3f9a8f9d-9bfb-44b0-b090-878915b7538c.png)
## 5. 구현 : 
      - 1. DB4PP.sql 에는 테스트 data가 담겨져있습니다.

      - 2. Have_to_install.txt 파일에는 초기 세팅에 설치한 module이 있습니다.

      - 3. /src/data에 사용한 html파일들이 있습니다.

      - 4. html 파일을 certificate.js 가 불러오는 방식으로 프로그램이 동작합니다. 

            - 4.1. local의 main page는 Token 정보가 유효할 때는 blog페이지를, 
            그렇지 않을 경우에는 log_in 페이지를 request하도록 제작했습니다.

            - 4.2 Sing up, Sign in, ID duplicate의 function은 topic.js에 있습니다.
                  - 4.2.1 ID duplicate을 하기위해 quary 데이터를 받는 방식을 사용했습니다.
                        ((혹시 다른방식 있으면 알려주셨으면 좋겠습니다..))
                        ((지금 형태에서는 이 방식 밖에 생각이 나지 않았습니다.))
            - 4.3 sleep.js 에는 특정 function을 동기방식으로 적용하기 위해 만들었습니다.

            - 4.3 logic.js 에는 특정 alert, confirm, checking하는 만들어 사용했습니다.
      
      - 5. /src/inform에는 secretkey와 user_data를 저장할 수 있는 파일들을 만들었습니다. 

## 참조. test data : 
      - ksc9595 는 /admin 으로 접근이 됩니다.
      - tncks097 은 blog로 접근 합니다.
      1. ID : ksc9595,  PW : zxc123asd456
      2. ID : tncks097, PW : zxc123  

## **후에 작업할 부분**
      - logout 구현
      - 관리자 페이지 접근권한 부여
      - User 관리
