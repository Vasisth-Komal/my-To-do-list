document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const darkModeToggle = document.getElementById('darkModeToggle');

  let tasks = [];
  let darkMode = false;

  darkModeToggle.addEventListener('click', function() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = darkMode ? '🌙' : '☀️';
  });

  addTaskBtn.addEventListener('click', addTask);

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const task = {
        text: taskText,
        completed: false
      };
      tasks.push(task);
      renderTaskList();
      taskInput.value = '';
    }
  }

  function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      const textSpan = document.createElement('span');
      const actionsDiv = document.createElement('div');
      const completeBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');

      textSpan.textContent = task.text;
      completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
      deleteBtn.textContent = 'Delete';
      actionsDiv.className = 'task-actions';
      completeBtn.className = 'complete-btn';
      deleteBtn.className = 'delete-btn';

      completeBtn.addEventListener('click', function() {
        tasks[index].completed = !tasks[index].completed;
        renderTaskList();
      });

      deleteBtn.addEventListener('click', function() {
        li.classList.add('fadeOut');
        setTimeout(() => {
          tasks.splice(index, 1);
          renderTaskList();
        }, 300);
      });

      actionsDiv.appendChild(completeBtn);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(textSpan);
      li.appendChild(actionsDiv);

      if (task.completed) {
        li.classList.add('completed');
      }

      taskList.appendChild(li);
    });
  }
});