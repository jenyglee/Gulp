# Gulp-Application
React native 프로젝트 어플리케이션 '꿀꺽' 입니다. 영양제 복용알람 서비스 앱으로, CRUD 기능과 '자동검색 API', 'Stack/tab Navigator', 'REST API' 등 다양한 기능들을 추가하였습니다.

## 팀 구성
프론트엔드 1명, 백엔드 1명

[프로젝트 포트폴리오 상세 보기](http://jenyglee93.com/1/0)

![스크린샷01](https://user-images.githubusercontent.com/86715916/147723480-04a65442-63b0-4366-a6f9-c5d7219aa9cf.jpg)
![스크린샷02](https://user-images.githubusercontent.com/86715916/147723484-45448d38-15c3-4b2e-a626-6492ff0d6585.jpg)
![스크린샷03](https://user-images.githubusercontent.com/86715916/147723485-e984a368-3a42-4c5e-8519-38fd69f6c6ea.jpg)
![스크린샷04](https://user-images.githubusercontent.com/86715916/147723486-de782e6f-3c73-4731-9c2b-c707a678ea1d.jpg)
![스크린샷05](https://user-images.githubusercontent.com/86715916/147723488-c763b1a7-25b4-4c9c-99b3-3bab16c4ed44.jpg)
![스크린샷06](https://user-images.githubusercontent.com/86715916/147723489-a98741b8-1085-4fb8-b33c-54f1ee160cd2.jpg)


## 주요기능
1. **알람생성**(복용시간, 복용요일, 복용중인 영양제 등록)/**알람수정**/**알람삭제**
2. 영양제 복용완료 횟수(경험치)에 따른 **레벨링 디자인**
3. **복용 캘린더**
4. **영양제 종류별 순위**
5. 등록한 알람 시간에 **푸쉬알림**
6. **회원가입, 로그인**
7. **이메일 중복확인**
8. **회원정보 변경**
9. **회원탈퇴**



> 구현 컴포넌트 및 라이브러리
> - Styled Components
> - JWT decode
> - Axios
> - React Redux
> - Redux Thunk
> - AsyncStorage
> - Firebase
> - Lodash
> - React Native Calendars
> - React Native-Swiper
> - Expo Image Picker


## 앱 스크린


### 알람 생성/수정/삭제
> 알람생성 시 영양제를 검색할 때 DB에서 검색어에 맞는 데이터를 제공해주며, 데이터가 없을 경우 이용자가 신규등록할 수 있도록 구현했습니다. 

![04](https://user-images.githubusercontent.com/86715916/147725541-e37c8c9a-4e84-4be1-8596-99568709c133.jpg)
![05](https://user-images.githubusercontent.com/86715916/147725544-f793b836-7673-4adb-98da-c8400fb3c476.jpg)
![02](https://user-images.githubusercontent.com/86715916/147725538-019dde01-6288-4514-8b86-d8f14b6be456.jpg)
![03](https://user-images.githubusercontent.com/86715916/147725540-bd27c4eb-cb75-422f-9a07-8be4e51b49b8.jpg)



### 캘린더
> 한 달을 기점으로 복용완료한 날짜를 계산하여 '복용달성률'을 제공하며, 날짜를 터치해 상세 알람을 확인할 수 있습니다.(백엔드 API가 아직 미완성되어 임시데이터로 구현시켰습니다.) 
> 
![07](https://user-images.githubusercontent.com/86715916/147725547-3aa841d1-e5b8-40b9-bd0d-1c01e6347daf.jpg)


### 랭크
> 이용자가 많이 등록한 영양제 순서대로 순위를 매겨 리스트를 나열합니다.(백엔드 API가 아직 미완성되어 임시데이터로 구현시켰습니다.) 

![13](https://user-images.githubusercontent.com/86715916/147725555-18ca89af-d024-4722-ae3b-f4e418c1d84b.jpg)


### 마이페이지
> 프로필 사진 변경, 회원정보 변경, 레벨링 시스템 확인 등 다양한 기능을 모아놓았습니다.

![14](https://user-images.githubusercontent.com/86715916/147725557-d1978e86-1abb-4035-8595-5f77f627c6fc.jpg)
![15](https://user-images.githubusercontent.com/86715916/147725559-a6407755-fdda-411d-8267-2c0e68920591.jpg)
![16](https://user-images.githubusercontent.com/86715916/147725562-c6c0c0ac-0623-44bd-afee-f05237e9c17e.jpg)

### 회원가입&로그인
> 회원가입 시 닉네임-이메일-패스워드 순서대로 입력할 때마다 Input 컴포넌트가 나타나는 애니메이션을 적용했습니다.

![08](https://user-images.githubusercontent.com/86715916/147725549-e33980d9-44da-4b81-ae39-ced2d535f04a.jpg)
![09](https://user-images.githubusercontent.com/86715916/147725550-099c7687-8a58-4d39-9843-c13af18ffe2c.jpg)
![10](https://user-images.githubusercontent.com/86715916/147725551-2113d4ba-cecb-4338-bced-a7e3356faaf4.jpg)
![11](https://user-images.githubusercontent.com/86715916/147725553-4c673bcc-b93f-4c9a-8b30-f4402b6a1970.jpg)


---




## 구현의 어려움 및 이슈

### 알람 목록(AlarmList)
#### 알람 변경/삭제 응용하기(feat. bind())
> 등록되어있는 알람을 변경/삭제하는 과정에서, 알람에 있는 메뉴 버튼을 눌러 모달 창을 띄우고, 그 안에서 ‘변경하기’ or ‘지우기’를 눌러 해당 알람을 컨트롤해야 했습니다. 이 과정에서 문제는 모달에 있는 버튼을 누르면 이때 **컨트롤할 알람이 무엇인지 알 수 없다**는 것이었습니다. 제가 공부하며 배웠던 delete, update의 기능은 모달창을 건너지 않고 바로 컨트롤했었기에, 현재 해당 알람을 컨트롤하기 위해서는 메뉴 버튼을 눌렀던 **알람의 id를 파라미터로 넘겨주어야 했습니다.**
>
> 이용자가 메뉴를 누른 알람의 id를 state에 저장해놓은 뒤, ‘변경하기’ or ‘지우기’ 버튼을 눌렀을 때 ‘bind’ 메서드로 state에 저장된 알람의 id를 파라미터로 전달하여 컨트롤할 수 있도록 구현했습니다.



#### 데이터 쪼개고 다듬고 요리하기

![01](https://user-images.githubusercontent.com/86715916/147724199-cc4a4882-32bd-4c65-bea0-01c8e8682714.jpg)

> api를 이용하여 알람 정보를 가져오면 요일, 시간, 영양제, 유저정보를 불러옵니다. 이때 **대부분 데이터는 제 컴포넌트에 들어가기에 적절하지 않은 형태로 되어있었습니다.** 예를들어 ‘배열형태, 한글’을 기준으로 만들어둔 컴포넌트에 ‘문자열, 숫자’ 형태의 데이터로 되어있고, ‘3:30 pm’ 형태로 컴포넌트에 들어갈 데이터는 ’15:30:00’ 형태로 되어있었습니다. 이런 데이터들은 새롭게 다듬을 필요가 있었기에 여러가지 자바스크립트 메서드를 이용하여 데이터를 쪼개고 다듬어 컴포넌트에 입힐 수 있었습니다.



#### 화면에도 focus가 있다?!(feat. addListener)

> [알람추가] 화면에서 새로운 알람을 저장한 뒤 [알람목록] 화면으로 돌아왔을 때 새로 알람이 추가되지 않았던 점이 있었습니다. 이는 화면만 이동하는 것으로 끝나는 것이 아니라 포커스도 이동시켜야 한다는 것을 배울 수 있었습니다. 포커스를 알람목록 화면으로 이동시켰을 경우에 함수를 호출시켜줘야 했습니다. 방법은 **addListener**를 이용하는 방법, react-native 훅인 **useFocusEffect** 또는 **useIsFocused**를 사용하는 방법이 있었습니다. 저는 그 중 addListener가 더욱 전통적인 라이프사이클 방식을 사용하는 것 같아 이것으로 제 코드를 정리해보고 싶었습니다.
>
> ‘navigation.addListener("focus", function)’ 안에 저장된 알람을 불러와 목록창에 표시해주도록 하였고, 마운트가 끝날 경우 위 함수를 리턴시켜 이벤트를 종료하는 것까지 적용해 구현에 성공할 수 있었습니다.

#### 알람 완료는 하루에 한번만

![02](https://user-images.githubusercontent.com/86715916/147724338-71bda494-0ce5-4560-87d1-0a3d9d7dee1a.jpg)

> 알람은 터치하여 복용체크를 할 수 있습니다. 이 때 오늘 등록된 모든 알람이 체크되면 축하 메시지가 담긴 완료 모달창이 뜹니다. 이때 전체 완료를 확인하는 조건은 알람의 completed 오브젝트이며, 모든 알람이 completed : true 상태가 되면 알람 모달창이 노출되도록 되어있습니다. 하지만 알람을 터치할 때마다 completed 조건이 변경되어 수시로 완료 모달이 노출되는 문제가 있었습니다.
>
> 저는 이것을 **오늘의 날짜를 이용하여 해결하기로 했습니다.** 빈 스토어를 만들어논 뒤 알람 전체 완료 모달이 노출되면 당일의 날짜를 스토어에 저장시켰습니다. 이후 스토어의 날짜와 당일의 날짜를 비교시켜 같은 값일 경우에는 완료 모달 노출이 되지 않도록 구현했습니다. 이렇게 하여 다음날 전체 알람을 완료시키면 당일의 날짜가 스토어에 저장된 날짜와 다르기 때문에 완료 모달 노출을 허락하게 됩니다.


### 알람 추가(AddAlarm)
#### 반복해서 조건을 확인하기(feat. some(), every())
> 이용자가 직접 선택지를 고르거나 입력해야 하는 input이 있는 화면의 경우 빈칸인 상태로 다음 화면으로 넘어갈 수 없도록 기능을 만들어주어야 했습니다. [알람추가] 화면의 경우 약, 복용시간, 요일 총 3가지 값이 존재하는지 확인하기 위해 다중 if문을 사용하였습니다.
>
> 우선 각각의 값을 state로 정리해놓은 뒤 **if(등록된 약이 있는지) 👉 if(선택한 복용시간이 있는지) 👉 if(체크된 요일이 있는지) 순서대로 확인할 수 있도록 구현을 했습니다.** 여기서 마지막 if(체크된 요일이 있는지)에서는 전체 요일 중에 'checked : true'로 되어있는 요일이 있으면 ‘체크된 요일이 있다’고 판단하도록 기능을 생각했습니다. 이 경우 반복문을 통해 요일 오브젝트를 하나하나 체크해야 했습니다.
>
> 반복문은 주로 map을 사용했으나 map은 컴포넌트를 반복시켜서 보여줄 때 사용하는 함수이기에 지금 구현할 기능에 쓰일 수 없었습니다. 그래서 다른 함수를 찾다가 ‘some’ 함수를 발견하였고, 조건을 만족하면 바로 true를 반환시켜주도록 하여 구현할 수 있었습니다.

#### 어느 화면에서 왔어?(feat. route.params)

![03](https://user-images.githubusercontent.com/86715916/147724677-27862706-d1e9-469f-8561-c3768881e51a.jpg)


> ‘AddAlarm’ 화면은 여러가지 이용루트의 **연결통로**같은 역할을 합니다. ‘알람을 추가하기 위해’, ‘알람을 변경하기 위해’, ‘영양제를 추가하고 나서’. 이렇게 다양한 화면에서 이 화면으로 넘어오기 때문에 그에 따른 동작들을 분리하여 실행시켜주어야 했습니다.
>
> 우선 화면을 이동할 때 **이동 전 화면의 이름을 담은 변수(const screenName=’AddAlarm’)를 파라미터로 함께 전달하여 조건을 만들어주었습니다.** 그리고 각각의 조건마다 동작을 다르게 주었습니다. ‘알람을 추가할 때’는 모든 값을 삭제, ‘알람을 변경할 때’는 해당 알람을 api로 조회하여 데이터를 컴포넌트에 입력, ‘복용중인 영양제를 추가한 뒤’에는 해당 영양제명이 들어있는 저장소를 불러와 컴포넌트에 교체. 이렇게 구현하여 한 화면 컴포넌트 상에서 다양한 목적으로 동작을 나눌 수 있었습니다.

### 영양제 검색(SearchMedicine)
#### 연관검색어로 쉽게 찾아서 등록하기
> 복용중인 영양제는 서버에 저장된 영양제 데이터를 검색해서 등록시키기를 원했습니다. 서버에 미리 수백개의 영양제를 등록시켜둔 상태이며, 영양제마다 **‘카테고리-브랜드명-영양제명’으로 세분화하여 세밀한 검색이 가능하도록 구현시켰습니다.**
>
> 영양제를 찾을 땐 카테고리 > 브랜드명 > 영양제명 순서대로 api 검색을 해야 하기 때문에 **react native의 애니메이션 효과를 적용하여 노출된 인풋의 입력이 완료될 때마다 다음 인풋을 노출시키도록 구현했습니다.** 그리고 인풋에 텍스트를 넣을 때마다 검색 api가 일어나는 것은 너무 반복이 심하기에 lodash 라이브러리의 **debounce 기능을 주어 텍스트 입력 후 0.3초간 입력이 없을 시 api를 실행시키도록 구현해주었습니다.**

### 영양제 신규등록(AddMedicine)
#### 이용자가 함께 만들어가는 데이터베이스
> ‘영양제 검색’ 화면에서 이용자가 찾는 영양제가 검색되지 않았다면 ‘영양제 추가’ 화면으로 이동됩니다. 이 때 이용자의 귀찮음을 덜기 위해 앞서 입력한 영양제의 카테고리, 브랜드, 영양제명을 그대로 전달해 영양제 추가화면에 입력되어 있도록 하였습니다. 이용자는 여기서 추가하기 버튼만 눌러 데이터베이스에 올리고, 알람에 해당 영양제를 등록할 수 있게 구현하였습니다.

### 복용 캘린더(Calendar)
#### 라이브러리 디자인 갈아엎기

![04](https://user-images.githubusercontent.com/86715916/147724680-8b8011ee-b0e4-4e02-9d99-89e98ea4f44a.jpg)

> 라이브러리의 고유 속성에는 markedDates(마크스타일), hideArrows(화살표 노출), showWeekNumbers(총 몇째 주 노출), hideDayNames(요일 노출) 등 어느정도 스타일을 조정하는 속성이 있었지만 섬세한 작업은 어려움이 있었습니다. 또한 제 작업물과 같이 ‘월’이 표시되는 박스와 ‘일’이 표시되는 박스를 따로따로 노출하는 것도 불가능 했습니다. 저는 이런 부분을 구현시키기 위해 직접 node module에 들어가 분석했습니다. **node module 안에서 스타일을 건드리면 라이브러리의 기능을 그대로 유지하면서 디자인적인 시도를 할 수 있다는 걸 깨달았습니다.** 하지만 .gitignore에서 node module은 커밋과 푸시를 막았기 때문에 저장에 어려움이 있다는 것을 깨달았습니다. 이 부분은 react-native-calendars 라이브러리의 라이센스를 확인 후 직접 클론받아서 필요한 부분을 수정 후에 패키지를 로컬로 추가했습니다.

#### 선택한 날짜의 데이터 불러오기
> 이 부분은 현재 api가 나오질 않아 제가 임시 데이터를 만들어서 구현했습니다. 저장되어있는 알람 데이터들 사이에서 제가 선택한 날짜에 등록된 알람을 불러와야 했습니다. 캘린더 라이브러리에서 선택된 날짜를 스토어에 저장시켰습니다. 그리고 스토어에 있는 이 날짜와 임시 데이터에 등록된 날짜의 값이 동일한 알람 데이터를 찾아 state에 저장시켰습니다. 여기에 저장된 값들을 컴포넌트에서 입력시켜 선택된 날짜의 알람들이 하단에 뜰 수 있도록 구현했습니다.


### 영양제 랭킹(Rank)
#### 데이터를 한번에 다 뿌리면 너무 무거울텐데!?(feat. FlatList)
> 약 리스트를 보여주는 [영양제 랭킹] 화면에는 데이터가 많게는 수백개까지 들어갈 수가 있기에 이 데이터들을 화면에 뿌려주는 과정에서 메모리가 무거워질 수 있다고 생각했습니다. 이 것을 해결하기 위해서는 화면에 보여지는 안에서만 리스트가 노출되고 그외에는 리스트가 가려지는 방법으로 해주면 데이터가 많아도 메모리가 무거워질 일이 없을 것이라고 판단했습니다. 이는 마침 **react native에서 제공하는 FlatList 컴포넌트가 있기에 적용방법을 익혀 구현할 수 있었습니다.**


### 마이페이지(MyPage)
#### 토큰에서 유저정보 꺼내기 (feat. JWT-decode)
> ‘마이페이지’ 화면과 ‘회원정보 변경’ 화면에서는 이용자의 정보가 컴포넌트에 입력되어 있어야 합니다. 이런 경우 토큰 자체를 decoding 하여 유저정보를 찾을 수 있었습니다. ‘JWT-decode’ 라이브러리를 이용해 유저의 이름, 이메일정보를 불러와 스토어에 저장하고, 필요한 화면 컴포넌트에서 불러와 컴포넌트에 입력시켰습니다.


### 화면구조(Navigator)
#### 하단 탭바가 필요 없는 화면은?
> 앱의 모든 화면 컴포넌트에는 하단 탭바가 필요한 화면과 필요없는 화면들이 있습니다. 하단 탭바가 ‘있는’ 화면과 ‘없는’ 화면을 공존시키기 위해서는 Stack의 구조 자체를 건드려야 했습니다. react native의 이론을 공부할 당시에는 Stack Navigator와 Tab Navigator를 개별적으로 사용하는 방법을 배웠으나, 현재 프로젝트의 경우에는 두 Navigator를 합쳐서 구조를 짜야했기 때문에 **어떤 것을 ‘어미 컴포넌트’로 둘 것인지 선택해야 했습니다.**
> 
> 저는 Stack Navigator를 어미 컴포넌트로 두어 그 안에 모든 화면들을 넣었으며, 하단 탭바가 필요한 화면들을 하나의 자식 컴포넌트로 묶어서 함께 넣어주었습니다.


