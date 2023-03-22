setup(tasks, "tasks");

let addTask = document.getElementById("add-task");
let addTaskInput = document.getElementById("add-task-input");

addTask.addEventListener("click", (event) => {
  event.preventDefault();
  tasks.unshift({
    name: addTaskInput.value,
    active: true,
  });
  setup(tasks, "tasks");
});
