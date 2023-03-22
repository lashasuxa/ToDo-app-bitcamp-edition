const setup = (tasks, rootElementId) => {
  let taskListHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    taskListHTML += `
    <li 
    class="task ${task.active ? "" : "task--completed"}"
    data-id="${i}">
        <input id="task-${i}" class="task-checkbox" type="checkbox" name="" id=""  ${
      task.active ? "" : "checked"
    }/>
        <label for="task-${i}" class="task-text">${task.name}</label>
        <button class="delete-task">Delete</button>
        <button class="edit-task">Edit</button>
    </li>

    `;
  }

  document.getElementById(rootElementId).innerHTML = taskListHTML;
  const taskListElement = document.getElementById("tasks");

  let addTaskButton = document.getElementById("add-task");
  let addTaskInput = document.getElementById("add-task-input");

  let addTask = (event) => {
    event.preventDefault();
    tasks.unshift({
      name: addTaskInput.value,
      active: true,
    });
    event.target.removeEventListener("click", addTask); //needs to be debuged
    setup(tasks, "tasks");
  };

  addTaskButton.addEventListener("click", addTask);

  const taskCheckItems = Array.from(
    taskListElement.querySelectorAll(".task-checkbox, .task-text")
  );

  taskCheckItems.map((taskCheckItem) => {
    taskCheckItem.addEventListener("click", (event) => {
      let id = Number(event.target.parentNode.getAttribute("data-id"));
      tasks[id].active = !tasks[id].active;
      setup(tasks, "tasks");
    });
  });

  const deleteButtons = Array.from(
    taskListElement.querySelectorAll(".delete-task")
  );
  deleteButtons.map((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      let id = Number(event.target.parentNode.getAttribute("data-id"));
      tasks.splice(id, 1);
      setup(tasks, "tasks");
    });
  });

  const editButtons = Array.from(
    taskListElement.querySelectorAll(".edit-task")
  );
  editButtons.map((editButton) => {
    editButton.addEventListener("click", (event) => {
      let taskItem = event.target.parentNode;
      let id = Number(taskItem.getAttribute("data-id"));
      let editInput = document.createElement("input");
      editInput.placeholder = tasks[id].name;
      taskItem.replaceChild(editInput, taskItem.querySelector("label"));
      editInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          tasks[id].name = editInput.value;
          setup(tasks, "tasks");
        }
      });
    });
  });
};
