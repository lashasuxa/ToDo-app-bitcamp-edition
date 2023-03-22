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
        <button id="delete-task">Delete</button>
        <button id="edit-task">Edit</button>
    </li>

    `;
  }

  document.getElementById(rootElementId).innerHTML = taskListHTML;
  const taskListElement = document.getElementById("tasks");
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
};
