const tasks = [];

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

chrome.storage.sync.get(["tasks"], (res) => {
    tasks = res.tasks ? res.tasks : [];
    renderTask();
})

function saveTasks() {
    chrome.storage.sync.set({
        tasks,
    })
}

function renderTask(taskNum) {
    const taskflow = document.createElement("div");

    const text = document.createElement("input")
    text.type = "text";
    text.placeholder = "Enter a task";
    text.value = tasks[taskNum]
    text.addEventListener("change", () => {
        tasks[tasksNum] = text.value
        saveTasks();
    })

    const deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.value = "X";
    deleteBtn.addEventListener("click", () => {
        deleteTask(taskNum);
    })

    taskflow.appendChild(text);
    taskflow.appendChild(deleteBtn);

    const taskContainer = document.getElementById("task-container");
    taskContainer.appendChild(taskflow);
}

function addTask() {
    const tasksNum = tasks.length
    tasks.push("");
    renderTask(tasksNum)
}

function deleteTask(taskNum) {
    tasks.splice(taskNum, 1)
    renderTasks()
}

function renderTasks() {
    const taskContaner = document.getElementById("task-container");
    taskContaner.textContent = "";
    tasks.forEach((taskText, taskNum) => {
        renderTask(taskNum)
    })
}