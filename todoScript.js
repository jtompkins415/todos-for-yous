const form = document.querySelector('#todo-form');
const taskContainer = document.querySelector('#task-container');

document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log(savedTasks);
    savedTasks.forEach((task) => {
      createTask(task.title, task.description, task.completed);
    });
  });

//Task array to store tasks in local storage
const tasks = [];

/** createTask:
 *  takes a title and description as parameters;
 *  creates To-Do Task including button for removal & completion;
 *  handles storage of task in local storage;
 */

function createTask(title, description){
   
    const newTask = document.createElement('div');
    newTask.classList.add('new-task');

    //Create task object to store all task related information
    const task = {
        id: Math.floor(Math.random() * 100),
        title: title,
        description: description,
        completed: false
    };

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));


    const newTaskTitleContainer = document.createElement('div');
    newTaskTitleContainer.classList.add('task-title-container');
    const newTaskTitle = document.createElement('div');
    newTaskTitle.classList.add('task-title');
    newTaskTitleContainer.appendChild(newTaskTitle);
    
    const newTaskDescriptionContainer = document.createElement('div');
    newTaskDescriptionContainer.classList.add('task-description-container')
    const newTaskDescription = document.createElement('div');
    newTaskDescription.classList.add('task-description');
    newTaskDescriptionContainer.appendChild(newTaskDescription);

    const removeButtonContainer = document.createElement('div');
    removeButtonContainer.classList.add('remove-button-container');
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button')
    removeButtonContainer.appendChild(removeButton);

    const completedButtonContainer = document.createElement('div');
    completedButtonContainer.classList.add('complete-button-container');
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-button');
    completedButtonContainer.appendChild(completedButton);

    newTaskTitle.innerText = `${title}:`;
    newTaskDescription.innerText = description;
    newTask.appendChild(newTaskTitleContainer);
    newTask.appendChild(newTaskDescriptionContainer);
    newTask.appendChild(completedButtonContainer);
    newTask.appendChild(removeButtonContainer);

    if(task.completed){
        newTaskTitle.style.textDecorationLine = 'line-through';
        newTaskDescription.style.textDecorationLine = 'line-through';
    }

    completedButton.innerText = 'Complete Task';
    completedButton.addEventListener('click', () => {
        task.completed = !task.completed;
        if(task.completed){
            newTaskTitle.style.textDecorationLine = 'line-through';
            newTaskDescription.style.textDecorationLine = 'line-through';
        } else {
            newTaskTitle.style.textDecorationLine = 'none';
            newTaskDescription.style.textDecorationLine = 'none';
        }
    });

    removeButton.innerText = 'Remove Task';
    removeButton.addEventListener('click', () => {
        newTask.remove();
        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        if(taskIndex !== -1){
            tasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    })


    taskContainer.appendChild(newTask);
}

form.addEventListener('submit', (evnt) => {
    evnt.preventDefault();

    const formData = new FormData(form);

    const taskTitle = formData.get('taskTitle');
    const taskDescription = formData.get('taskDescription');

    if(taskTitle === '' || taskDescription === ''){
        alert('Title & Description of To-Do Required');
        return;
    }

    createTask(taskTitle, taskDescription);

    evnt.target[0].value = '';
    evnt.target[1].value = '';
})


