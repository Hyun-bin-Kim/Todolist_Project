# TODOLIST_FRONTEND_PROJECT
TODOLIST 할일 목록을 작성하는 사이트입니다.
<br /><br />

## 🖥️ 프로젝트 소개
사용자들이 할 일을 효율적으로 관리할 수 있는 Todo List 웹 애플리케이션입니다.
기본적인 할 일 관리 기능뿐만 아니라, 카테고리 분류, 검색 등 다양한 기능을 제공하여 사용자가 직관적으로 할 일을 관리할 수 있도록 만들었습니다.
<br /><br />

## 🕰️ 개발 기간
* 24.08.19 - 24.08.20
<br /><br />

## ⚙️ 기술 스택
- **프론트엔드**:
    - **`HTML`**: 웹 페이지 구조 정의
    - **`CSS`**: 스타일과 레이아웃 설계
    - **`JavaScript`**: 동적 기능 구현
<br /><br />
# 🎨 디자인 시안

<a href="https://www.figma.com/file/Q81vKDRIoXpMcIZTYHqrQl/%EC%B4%88%EB%A1%9D%EC%A7%91%EC%82%AC-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=0%3A1"><img src="https://user-images.githubusercontent.com/79133602/178581705-9e7f8451-41b4-40a1-8f98-e2676faf55a9.png" width="100%"/></a>

## 📌 주요 기능
#### 할 일 입력 공간
- 입력 필드 (text)
- 추가 버튼 (클릭 시 할 일이 목록에 추가됨)
####  할 일 추가, 삭제, 수정 기능
- 할 일 항목마다 수정 버튼, 삭제 버튼 제공
- **수정 기능**:
    - 수정 팝업 또는 수정 페이지에서 수정 가능
    - 보너스 기능으로 리스트 내에서 직접 수정 가능하도록 구현 가능
- **삭제 기능**: 삭제 버튼 클릭 시 해당 할 일을 삭제
#### 할 일 목록 리스트
- 할 일 목록 리스트는 사용자가 쉽게 확인할 수 있는 형태로 표시
- **드래그앤드롭 순서 변경 기능**: 사용자가 할 일의 우선순위를 쉽게 조정할 수 있도록, 할 일을 드래그앤드롭하여 목록 순서를 변경할 수 있는 기능 구현
#### 할 일 목록 데이터 저장
- 할 일 목록의 데이터를 Local Storage에 저장하여 새로고침 후에도 데이터가 유지
#### 할 일 title 검색 기능
- 검색 입력 필드 및 검색 버튼
#### 완료된 할 일 및 미완료 할 일 분류
- 할 일 목록 리스트 내에서 상태 구분
#### 카테고리 분류 기능
- 할 일 입력 시 카테고리 선택 가능하도록 select 요소 제공
- 카테고리 선택 시 해당 카테고리에 해당하는 할 일만 목록에 표시
#### 카테고리 선택 후 검색 필터링 기능
- 카테고리 선택 필드 (select)
- 검색 필드 (text) 및 검색 버튼
#### 야간모드
- 야간 모드 선택 버튼
<br /><br />

## 📺 화면 구성

| 메인 화면 | 수정 팝업 | 
| :-------------------------------------------: | :------------: |
| ![todolist_main](https://github.com/user-attachments/assets/3dd726d4-9162-4681-82e4-82727bf9dc74) | ![todolist_edit_popup](https://github.com/user-attachments/assets/93092cba-1d0f-494c-86c3-5e4a5d7642e0) |
| 카테고리 필터 | 검색 |
| ![todolist_category_filter](https://github.com/user-attachments/assets/83c65473-b61e-4252-b892-025a8857309e) | ![todolist_search](https://github.com/user-attachments/assets/c1a0224b-7b16-4529-b319-2d4f111023d5) |
| 삭제 | 야간 모드 | 
| ![todolist_delete](https://github.com/user-attachments/assets/e6b7b25f-70fd-4b9f-a2b5-f5474d76ea56) | ![todolist_nightmode](https://github.com/user-attachments/assets/dd47e2b1-af7e-485c-86b0-a3a7e7a9845b) | 
| 할일 추가_유효성 검사 | 수정 팝업_유효성 검사  |
| ![todolist_validation_2](https://github.com/user-attachments/assets/b31ef075-f5d3-46e9-be21-327bd89c29e0) | ![todolist_validation_1](https://github.com/user-attachments/assets/666cccc5-899c-40b2-9398-e7323cad71d4) |
