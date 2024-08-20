// 새로운 TODO 항목 추가 시 유효성 검사 함수
function validateAddInputs(title, memo, category) {
    let valid = true;
    if (title.trim() === "") {
        document.getElementById("todo-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("todo-error").style.display = "none";
    }
    if (memo.trim() === "") {
        document.getElementById("memo-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("memo-error").style.display = "none";
    }
    if (category.trim() === "") {
        document.getElementById("category-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("category-error").style.display = "none";
    }
    return valid;
}

// 편집 팝업에서 유효성 검사 함수
function validateEditInputs(title, memo, category) {
    let valid = true;
    if (title.trim() === "") {
        document.getElementById("edit-title-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("edit-title-error").style.display = "none";
    }
    if (memo.trim() === "") {
        document.getElementById("edit-content-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("edit-content-error").style.display = "none";
    }
    if (category.trim() === "") {
        document.getElementById("edit-category-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("edit-category-error").style.display = "none";
    }
    return valid;
}

// TODO 항목을 생성하는 함수
function createTodoItem(title, category, date, content, checked = false) {
  const todoItem = document.createElement("li");
  todoItem.className = "todo-item";
  todoItem.dataset.date = date;
  todoItem.dataset.memo = content;
  todoItem.dataset.id = Date.now();
  todoItem.dataset.fullTitle = title;
  todoItem.dataset.originalIndex =
    document.querySelectorAll(".todo-item").length;
  todoItem.draggable = true;

  // 제목과 카테고리의 길이 제한
  const truncatedTitle =
    title.length > 50 ? title.substring(0, 50) + "..." : title;

  todoItem.innerHTML = `
      <div class="drag-handle">≡</div>
      <input type="checkbox" class="todo-checkbox" ${checked ? "checked" : ""}>
      <span class="todo-text ${
        checked ? "completed" : ""
      }">${truncatedTitle}</span>
      <span class="todo-category" style="display: none;">${category}</span>
      <button class="edit-btn"><img src="./img/edit.png" alt="Edit" /></button>
      <button class="delete-btn"><img src="./img/delete.png" alt="Delete" /></button>
    `;

  // 세부 사항 팝업을 표시하기 위한 클릭 이벤트 리스너
  todoItem.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("todo-checkbox") &&
      !e.target.classList.contains("edit-btn") &&
      !e.target.classList.contains("delete-btn")
    ) {
      document.getElementById("details-popup-title").textContent =
        todoItem.dataset.fullTitle;
      document.getElementById(
        "details-popup-date"
      ).textContent = `Date: ${todoItem.dataset.date}`;
      document.getElementById(
        "details-popup-category"
      ).textContent = `Category: ${
        todoItem.querySelector(".todo-category").textContent
      }`;
      document.getElementById(
        "details-popup-content"
      ).textContent = `Memo: ${todoItem.dataset.memo}`;
      document.getElementById("details-popup-overlay").style.display = "flex";
    }
  });

  todoItem.querySelector(".edit-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    document
      .querySelectorAll(".todo-item")
      .forEach((item) => item.classList.remove("editing"));
    todoItem.classList.add("editing");

    // 편집 팝업에 TODO 항목의 현재 내용 설정
    document.getElementById("edit-popup-title").value =
      todoItem.dataset.fullTitle;
    document.getElementById("edit-popup-category").value =
      todoItem.querySelector(".todo-category").textContent;
    document.getElementById("edit-popup-content").value = todoItem.dataset.memo;

    // 오류 메시지 숨기기
    document.getElementById("edit-title-error").style.display = "none";
    document.getElementById("edit-category-error").style.display = "none";
    document.getElementById("edit-content-error").style.display = "none";

    document.getElementById("edit-popup-overlay").style.display = "flex";
  });

  todoItem.querySelector(".delete-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm("이 TODO를 삭제하시겠습니까?")) {
      todoItem.remove();
      updateCategoryFilter();
      saveToLocalStorage();
      checkEmptyState(); // 빈 상태 체크
    }
  });

  todoItem
    .querySelector(".todo-checkbox")
    .addEventListener("change", function () {
      const todoText = todoItem.querySelector(".todo-text");
      const todoCategory = todoItem.querySelector(".todo-category");

      if (this.checked) {
        todoText.classList.add("completed");
        todoCategory.classList.add("completed");
        moveItem(todoItem, "bottom");
      } else {
        todoText.classList.remove("completed");
        todoCategory.classList.remove("completed");
        moveItem(todoItem, "original");
      }
      saveToLocalStorage();
    });

  function moveItem(item, position) {
    const todoList = document.getElementById("todo-list");
    const originalIndex = parseInt(item.dataset.originalIndex, 10);

    if (position === "bottom") {
      todoList.appendChild(item);
    } else {
      const items = Array.from(todoList.children).filter(
        (child) => !child.querySelector(".todo-checkbox").checked
      );
      if (items.length > originalIndex) {
        todoList.insertBefore(item, items[originalIndex]);
      } else {
        todoList.insertBefore(item, todoList.children[originalIndex]);
      }
    }
  }

  moveItem(todoItem, checked ? "bottom" : "original");

  return todoItem;
}

// TODO 항목을 로컬 스토리지에 저장하는 함수
function saveToLocalStorage() {
  const todos = Array.from(document.querySelectorAll(".todo-item")).map(
    (item) => ({
      id: item.dataset.id,
      text: item.querySelector(".todo-text").textContent,
      category: item.querySelector(".todo-category").textContent,
      date: item.dataset.date,
      memo: item.dataset.memo,
      checked: item.querySelector(".todo-checkbox").checked,
    })
  );
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 카테고리 필터 드롭다운을 업데이트하는 함수
function updateCategoryFilter() {
  const categoryFilter = document.getElementById("category-filter");
  const todos = Array.from(document.querySelectorAll(".todo-item"));
  const categories = new Set(
    todos
      .map((todo) => todo.querySelector(".todo-category").textContent)
      .filter((category) => category.trim() !== "")
  );

  categoryFilter.innerHTML =
    `<option value="">ALL</option>` +
    Array.from(categories)
      .map((category) => `<option value="${category}">${category}</option>`)
      .join("");

  // 필터링 이벤트 리스너 추가
  categoryFilter.removeEventListener("change", filterTodos);
  categoryFilter.addEventListener("change", filterTodos);
}

// TODO 목록을 필터링하는 함수
function filterTodos() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const categoryFilter = document.getElementById("category-filter").value;
  const todoItems = document.querySelectorAll(".todo-item");

  let hasVisibleItems = false;

  todoItems.forEach((item) => {
    const title = item.querySelector(".todo-text").textContent.toLowerCase();
    const memo = item.dataset.memo.toLowerCase();
    const category = item.querySelector(".todo-category").textContent;

    const matchesSearch =
      title.includes(searchInput) || memo.includes(searchInput);
    const matchesCategory =
      categoryFilter === "" || category === categoryFilter;

    if (matchesSearch && matchesCategory) {
      item.style.display = "";
      hasVisibleItems = true;
    } else {
      item.style.display = "none";
    }
  });

  checkEmptyState(!hasVisibleItems);
}

// TODO 목록이 비어 있는지 확인하는 함수
function checkEmptyState(isEmpty = null) {
  const todoList = document.getElementById("todo-list");
  const emptyState = document.getElementById("empty-state");

  if (isEmpty === null) {
    isEmpty = todoList.children.length === 0;
  }

  emptyState.style.display = isEmpty ? "block" : "none";
}

// 유효성 검사 함수
function validateTodoInputs(title, memo, category) {
  let valid = true;
  if (title.trim() === "") {
    document.getElementById("todo-error").style.display = "block";
    valid = false;
  } else {
    document.getElementById("todo-error").style.display = "none";
  }
  if (memo.trim() === "") {
    document.getElementById("memo-error").style.display = "block";
    valid = false;
  } else {
    document.getElementById("memo-error").style.display = "none";
  }
  if (category.trim() === "") {
    document.getElementById("category-error").style.display = "block";
    valid = false;
  } else {
    document.getElementById("category-error").style.display = "none";
  }
  return valid;
}

// 새로운 TODO 항목 추가 이벤트 리스너
document.getElementById("add-todo-btn").addEventListener("click", () => {
    const titleInput = document.getElementById("todo-input");
    const memoInput = document.getElementById("memo-input");
    const categoryInput = document.getElementById("category-input");

    if (validateAddInputs(titleInput.value, memoInput.value, categoryInput.value)) {
        const todoItem = createTodoItem(
            titleInput.value,
            categoryInput.value,
            new Date().toLocaleDateString(),
            memoInput.value
        );
        document.getElementById("todo-list").appendChild(todoItem);

        updateCategoryFilter();
        saveToLocalStorage();
        checkEmptyState(); // 빈 상태 체크
        titleInput.value = "";
        memoInput.value = "";
        categoryInput.value = "";
    }
});

// 세부 사항 팝업 닫기 이벤트 리스너
document
  .getElementById("details-popup-close-btn")
  .addEventListener("click", () => {
    document.getElementById("details-popup-overlay").style.display = "none";
  });

// 편집 팝업 닫기 이벤트 리스너
document
  .getElementById("edit-popup-cancel-btn")
  .addEventListener("click", () => {
    document.getElementById("edit-popup-overlay").style.display = "none";
  });

// 편집 내용을 저장하는 이벤트 리스너
document.getElementById("edit-popup-save-btn").addEventListener("click", () => {
  const title = document.getElementById("edit-popup-title").value;
  const category = document.getElementById("edit-popup-category").value;
  const content = document.getElementById("edit-popup-content").value;

  // 입력 필드의 유효성 검사
  const isValid = validateEditInputs(title, content, category);
  if (isValid) {
    const todoItem = document.querySelector(".todo-item.editing");
    todoItem.querySelector(".todo-text").textContent = title;
    todoItem.querySelector(".todo-category").textContent = category;
    todoItem.dataset.memo = content;
    todoItem.dataset.fullTitle = title; // 수정된 제목도 데이터에 반영

    document.getElementById("edit-popup-overlay").style.display = "none";
    saveToLocalStorage();
  }
});

// 검색 버튼 클릭 시 검색 기능 실행
document.getElementById("search-btn").addEventListener("click", filterTodos);

// 드래그 앤 드롭 기능
const todoList = document.getElementById("todo-list");

todoList.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("todo-item")) {
    e.target.classList.add("dragging");
  }
});

todoList.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("todo-item")) {
    e.target.classList.remove("dragging");
    saveToLocalStorage(); // 드래그 종료 후 상태 저장
  }
});

todoList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(todoList, e.clientY);
  if (afterElement == null) {
    todoList.appendChild(draggingItem);
  } else {
    todoList.insertBefore(draggingItem, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".todo-item:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// 페이지 로드 시 로컬 스토리지에서 저장된 TODO 로드
document.addEventListener("DOMContentLoaded", () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todo) => {
    const todoItem = createTodoItem(
      todo.text,
      todo.category,
      todo.date,
      todo.memo,
      todo.checked
    );
    document.getElementById("todo-list").appendChild(todoItem);
  });

  const isNightMode = localStorage.getItem("night-mode") === "true";
  if (isNightMode) {
    document.body.classList.add("night-mode");
    document.querySelector(".change-btn img").src = "./img/change_day.png";
  } else {
    document.body.classList.remove("night-mode");
    document.querySelector(".change-btn img").src = "./img/change_night.png";
  }

  updateCategoryFilter();
  checkEmptyState(); // 페이지 로드 시 빈 상태 체크
});

// 이미지 및 야간 모드 전환을 위한 JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const changeButton = document.querySelector(".change-btn img");

  if (changeButton) {
    changeButton.addEventListener("click", function () {
      const body = document.body;
      const isNightMode = body.classList.toggle("night-mode");
      localStorage.setItem("night-mode", isNightMode);

      if (isNightMode) {
        changeButton.src = "./img/change_day.png";
      } else {
        changeButton.src = "./img/change_night.png";
      }
    });
  }
});
