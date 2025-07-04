# 지원자가 과제에 대해 직접 작성하는 내용입니다.

## 🛠 기술 스택

> 프로젝트에서 사용한 기술들을 아래 표에 작성해주세요.

| 구분           | 선택한 기술 | 버전 | 선택 이유 |
|--------------| ----------- | ---- | --------- |
| **프레임워크**    | next.js | v15 | SSR, 서버 컴포넌트 |
| **상태 관리**    | zustand, @tanstack/react-query | v5 | persist로 간편하게 localstorage 제어(리스트/카드 보기), 서버 데이터 상태 관리 용이성 |
| **스타일링**     | tailwindcss | v4 |  클래스 명으로 간단한 스타일링 |
| **빌드 도구**    | webpack | v5 | nextjs 내장 빌드 도구 |
| **코드 품질 관리** | eslint, prettier | v9 | 익숙한 코드관리 도구. prettier-plugin-tailwindcss 적용하여 클래스명 order 관리 |

---

## 📋 구현 완료 기능

> 아래 체크박스를 통해 구현 완료한 기능들을 표시해주세요.
> 
> (요구사항을 모두 구현하는 것이 평가 기준은 아니며, 필수 요구사항을 모두 구현하지 못해도 추가 요구사항을 구현할 수 있습니다.)

### ✅ 필수 요구사항

- [x] 기본 페이지 및 레이아웃 구성
- [x] 공통 > 모달
- [x] 공통 > 페이지네이션
- [x] 홈 페이지 > 기본
- [x] 서비스 게시판 > 기본
- [x] 서비스 게시판 > 게시글 더보기 액션
- [x] 서비스 게시판 > 게시글 UI 타입 변경
- [x] 서비스 게시판 > 게시글 상세
- [x] 서비스 게시판 > 게시글 등록 및 수정

### 🎯 추가 요구사항

- [x] 게시글 작성 중, 페이지 이동
- [ ] 도커 설정
- [ ] Module Federation 적용

---

## 💡 주요 구현 내용

> 각 페이지별로 구현한 기능과 기술적 고려사항을 설명해주세요.

### 1. 기본 페이지 및 레이아웃

homework/src/app/layout.tsx 에 provider, 레이아웃을 적용.

SubHeader 컴포넌트로 서비스 게시판의  "서비스 게시판", "게시글 등록" 등의 컨텐츠 헤더를 동일한 스타일로 관리할 수 있게 함. 

### 2. 공통 컴포넌트

- **모달**: ModalContext.ts 의 useModal로 openModal 매서드로 컴포넌트를 인자로 받아 실행. AlertModal UI 컴포넌트로 확인창 공통 모달을 사용.
```js
const { openModal } = useModal()
openModal(
  <AlertModal
    title="안내"
    message="작성 중인 내용이 사라집니다. 페이지를 이동하시겠습니까?"
    onConfirm={() => {
      router.push(href)
    }}
    confirmText="이동"
  />,
)
```

- **페이지네이션**: Pagination 컴포넌트 구현. 다른 컴포넌트와의 리렌더링 분리를 위해 Pagination 컴포넌트를 활용한 ListPagination 구현.


### 3. 서비스 게시판

- **게시글 목록**: 
  - 파일 위치 : ce-fe-homework-master/homework/src/app/service-board/page.tsx
  - 페이지네이션 작동시 리스트만 리렌더링 되도록 컴포넌트 분리
  - 리스트/카드 보기 변경시 리스트만 리렌더링 되도록 컴포넌트 분리
  - PrefetchBoundary hoc로 서버 컴포넌트 prefetchQuery 로직을 추상화한 컴포넌트를 만들어 적용
  - suspense로 fallback 설정
- **게시글 상세**: 
  - 파일 위치: ce-fe-homework-master/homework/src/app/service-board/[issueId]/page.tsx
  - PrefetchBoundary hoc로 서버 컴포넌트 prefetchQuery 로직을 추상화한 컴포넌트를 만들어 적용
  - suspense로 fallback 설정
  - 만약 없는 페이지로 이동시 (ex - http://localhost:3000/service-board/111111) 에러 화면을 보여주고 목록으로 돌아갈 수 있게 만들었습니다(QueryErrorSuspenseBoundary)
- **게시글 등록**: 
  - 파일 위치: ce-fe-homework-master/homework/src/app/service-board/create/page.tsx
  - react-hook-form 적용. 게시글 수정과 공통 컴포넌트 사용(PostForm.tsx)
  - 작성중 다른 메뉴, 목록으로 갈 시 확인 모달로 방지. 
- **게시글 수정**: 
  - 파일 위치: ce-fe-homework-master/homework/src/app/service-board/[issueId]/edit/page.tsx
  - react-hook-form 적용. 게시글 작성과 공통 컴포넌트 사용(PostForm.tsx)
  - 작성중 다른 메뉴, 목록으로 갈 시 확인 모달로 방지(DirtyAwareLink 컴포넌트)

### 4. 추가 요구사항

---

## ⚠️ 개발 과정에서 겪은 이슈와 해결 방법

> 개발 중 발생한 문제들과 해결 과정을 기록해주세요.

| 문제 상황 | 원인 분석 | 해결 방법 | 학습 내용 |
| --------- | --------- | --------- | --------- |
| 글 등록 시 버튼 연속 클릭 가능 | 글 등록 api요청 후 완료 시 페이지 이동. 대기 시간동안 다시 등록 버튼 클릭 가능 | 글 등록 요청시 버튼 disabled 처리 및 debounce 처리 |  |
| 홈 페이지 리스트 페이지에서 카드 보기 필터 일때  새로고침시 리스트 보기가 처음 렌더링 되는 현상 | 첫 렌더링이 된 이후 리스트 순서가 바뀜 | useIsMounted 커스텀 훅으로 랜더링이 된 이후 역순 리스트가 렌더링 되게 함 |  |
| 보기 타입(리스트, 카드) 변경시 검색 페이지네이션 부분 불필요한 리렌더링 | BoardView 컴포넌트 내에서 데이터 패치시 해당 부분들 리렌더링 | issue 목록을 가져오는 부분을 커스텀 훅으로 만듦. 페이지네이션, 검색창 부분들을 별도 컴포넌트로 만듦 | 렌더링 단위에 따라 컴포넌트를 분리하는게 필요함 |
| 리스트 클릭시 버블링때문에 ...(더보기) 클릭시 글 상세 페이지로 이동 | 클릭 이벤트의 버블링 | Dropdown 컴포넌트에 preventClickBubbling 옵션으로 클릭 이벤트 버블링 차단 | 부모의 클릭 이벤트가 있을 경우 자식의 클릭 이벤트가 버블링 되는 것을 관리해야 함 |


---

## ▶ 실행 방법

> 프로젝트 실행을 위한 명령어를 작성해주세요.
```shell
yarn
yarn dev
```
**접속 URL**: http://localhost:3000/


---

## 📝 추가 설명

> 구현 과정에서 특별히 고민했던 부분이나 추가로 구현하고 싶었던 기능이 있다면 여기에 작성해주세요.

- 서비스게시판에서 검색 or 페이지 이동 후 홈 화면으로 갔다가 돌아온 경우 조작한 것을 그대로 유지해서 사용자 경험을 높이려고 했습니다. 구현 하진 않았지만 더 개선할 수 있는 방향은 url query params로 페이징, 검색을 같이 관리하면 브라우저 history로 관리할 수 있어 더 좋을 것 같습니다.
- ErrorBoundary와 React query 에러, suspense를 통합해서 관리할 수 있는 QueryErrorSuspenseBoundary 를 만들었습니다.

---

## 🤖 AI 활용 내역

> 과제 진행 시 AI 도구를 활용했다면, 어떤 AI를 사용했는지와 어떻게 활용했는지 작성해주세요.

- **활용한 AI**: Cursor, ChatGPT 4o
- **활용 방법**: 코드 자동완성, 라이브러리 활용 예시 검색, 코드 리뷰

---

## 🔗 참고 자료

> 구현 과정에서 참고한 자료가 있다면 여기에 작성해주세요.

- [react-hook-form 문서](https://react-hook-form.com/docs)
- [@tanstack/react-query 문서](https://tanstack.com/query/latest)
- [Next.js 문서](https://nextjs.org/docs)
