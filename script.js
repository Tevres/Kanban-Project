const modal = document.querySelector("dialog");
const columnsContainer = document.querySelector(".columns");
const columns = document.querySelectorAll(".column");

let currentTask = null;

const handleDragover = (event) => {
  event.preventDefault(); // notwendig, um Drop zu ermöglichen
};

const handleDrop = (event) => {
  event.preventDefault();
  const column = event.currentTarget.querySelector(".tasks");
  if (currentTask && column) {
    column.appendChild(currentTask);
    updateTaskCount(column.closest(".column"));
  }
};

const handleDragend = (event) => {
  currentTask = null;
};

const handleDragstart = (event) => {
  currentTask = event.currentTarget;
};

const handleDelete = (event) => {
  const task = event.currentTarget.closest(".task");
  const parentColumn = task.closest(".column");
  task.remove();
  updateTaskCount(parentColumn);
};


const handleEdit = (event) => {
  const task = event.currentTarget.closest(".task");
  const textarea = task.querySelector("textarea");
  textarea.removeAttribute("readonly");
  textarea.focus();
};

const handleBlur = (event) => {
  event.target.setAttribute("readonly", true);
};

const handleAdd = (event) => {
  const column = event.currentTarget.closest(".column");
  const tasks = column.querySelector(".tasks");
  const input = createTaskInput();
  tasks.appendChild(input);
  input.querySelector("textarea").focus();
};

const updateTaskCount = (column) => {
  const count = column.querySelectorAll(".task").length;
  const header = column.querySelector("h3");
  header.dataset.tasks = count;
};

const observeTaskChanges = () => {
  const config = { childList: true, subtree: false };
  columns.forEach((column) => {
    const tasks = column.querySelector(".tasks");
    const observer = new MutationObserver(() => updateTaskCount(column));
    observer.observe(tasks, config);
  });
};

observeTaskChanges();

const createTask = (content) => {
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.addEventListener("dragstart", handleDragstart);
  task.addEventListener("dragend", handleDragend);

  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.setAttribute("readonly", true);
  textarea.addEventListener("blur", handleBlur);

  const controls = document.createElement("div");
  controls.className = "controls";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.addEventListener("click", handleEdit);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.addEventListener("click", handleDelete);

  controls.append(editBtn, deleteBtn);
  task.append(textarea, controls);
  return task;
};

const createTaskInput = (text = "") => {
  const container = document.createElement("div");
  container.className = "task";

  const textarea = document.createElement("textarea");
  textarea.value = text;

  textarea.addEventListener("blur", () => {
    const value = textarea.value.trim();
    if (value) {
      const task = createTask(value);
      container.replaceWith(task);
    } else {
      container.remove();
    }
  });

  container.appendChild(textarea);
  return container;
};

// Buttons zum Hinzufügen initialisieren
document.querySelectorAll("[data-add]").forEach((btn) =>
  btn.addEventListener("click", handleAdd)
);

// Drag-and-drop initialisieren
columns.forEach((column) => {
  column.addEventListener("dragover", handleDragover);
  column.addEventListener("drop", handleDrop);
});

modal.querySelector("#cancel").addEventListener("click", () => modal.close());

modal.addEventListener("close", () => (currentTask = null));
