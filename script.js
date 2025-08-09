// wait until html is loaded
document.addEventListener("DOMContentLoaded", () => {
  // get all buttons
  const addButtons = document.querySelectorAll(".add-task");

  addButtons.forEach((btn) => {
    // react to click event
    btn.addEventListener("click", () => {
      // find column in the document object model
      const column = btn.closest(".column");
      // get list of this column
      const list = column.querySelector(".task-list");

      // new task element
      const task = document.createElement("article");
      task.className = "task";
      task.textContent = "Neue Aufgabe";

      // append task to list
      list.appendChild(task);
    });
  });
});
