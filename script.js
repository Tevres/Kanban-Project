// get all columns
const columnsContainer = document.querySelector(".columns");

// function if button is clicked
function handleAdd(event) {
  // html element that is clicked, search for button data-add
  const button = event.target.closest("button[data-add]");
  if (!button) return;

  // search for column div, to which the button belongs to
  const column = button.closest(".column");
  const tasksContainer = column.querySelector(".tasks");

  // create a new task element
  const task = document.createElement("div");
  task.className = "task";
  task.textContent = "Neue Aufgabe";

  tasksContainer.appendChild(task);
}

// edit tasks
function handleEdit(event) {
  const task = event.target.closest(".task");
  if (!task) return;

  const input = document.createElement("div");
  input.className = "task-input";
  input.contentEditable = true;
  input.innerText = task.innerText;

  // if click away save task
  input.addEventListener("blur", () => {
    const newText = input.innerText.trim();
    if (newText !== "") {
      task.textContent = newText;
      input.replaceWith(task);
    } else {
      input.replaceWith(task); // leere Eingabe = abbrechen
    }
  });

  task.replaceWith(input);
  input.focus();
}

// every time button is clicked, run function
columnsContainer.addEventListener("click", handleAdd);
columnsContainer.addEventListener("dblclick", handleEdit);
