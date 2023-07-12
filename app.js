window.addEventListener('load', renderTodos);


const task = document.getElementById('todo-task');
const addTaskBtn = document.getElementById('todo-addTask-btn');
const listContainer = document.getElementById('list-container');
const modal = document.getElementById('modal');

const storedTodos = localStorage.getItem('task');
const todolisted = storedTodos ? JSON.parse(storedTodos) : [];

// For adding Task
addTaskBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    if(task.value == '') {
        alert('Please Enter The Name of Task');
        task.focus();
    } else {
        let li = document.createElement('li');
        li.innerHTML = task.value;
        listContainer.appendChild(li);
        todolisted.push({task: li.innerHTML, done: false})
        saveData();
        renderTodos();
        task.value='';
    }
});

// Function for saving todo
function saveData() {
    localStorage.setItem('task', JSON.stringify(todolisted));
}


// Function for Diplaying todos
function renderTodos() {
    
    listContainer.innerHTML = '';
    todolisted.map((todo, index) => {
        const li = document.createElement('li');
        const doneBtn = document.createElement('i');
        const taskInput = document.createElement('input');
        const buttonSpan = document.createElement('span'); 
        const editBtn = document.createElement('i');
        const editedBtn = document.createElement('i');
        const deleteBtn = document.createElement('i');
        const taskGroup = document.createElement('span');
        taskGroup.classList.add('list__task');
    
    // This will check if the task is done or not
        if(todolisted[index].done == true) {
            doneBtn.classList.remove('fa-circle');
            doneBtn.classList.add('fa-circle-check');
            doneBtn.classList.add('fa-solid');
            li.classList.add('task__done');
        } else {
            doneBtn.classList.add('fa-regular');
            doneBtn.classList.add('fa-circle');
            li.classList.remove('task__done');
        }

        
        editBtn.classList.add('fa-solid', 'fa-pen-to-square');
        editedBtn.classList.add('fa-solid', 'fa-circle-check', 'isDisabled');
        deleteBtn.classList.add('fa-solid', 'fa-trash');
        buttonSpan.appendChild(editBtn);
        buttonSpan.appendChild(editedBtn);
        buttonSpan.appendChild(deleteBtn);  
        buttonSpan.classList.add('list__button');
        taskInput.value = todo.task;
        taskInput.setAttribute('readonly', 'readonly');
        taskInput.classList.add('task__input');
        taskGroup.appendChild(doneBtn);
        taskGroup.appendChild(taskInput);
        li.appendChild(taskGroup);
        li.appendChild(buttonSpan);
        li.classList.add('todo__list');
        listContainer.appendChild(li);

        // Eventlistener for delete button
        deleteBtn.addEventListener('click', ()=>{deleteTodo(index)});
        
        //  Eventlistener for edit button
        editBtn.addEventListener('click', ()=>{
            editBtn.classList.toggle('isDisabled');
            editedBtn.classList.toggle('isDisabled');
            taskInput.toggleAttribute('readonly');  
            taskInput.focus();
        });

        //  Eventlistener for editedBtn, After changing the task name
        editedBtn.addEventListener('click', ()=>{
            if(taskInput.value == '') {
                renderTodos();
            } else {
                editTodo(index, taskInput.value);
            }     
        });

        //  Eventlistener for done button. it will call the isDone function to set the status of task to true
        doneBtn.addEventListener('click', ()=>{
            isDone(index);
        });
    });  
}

// Function for updating the task status
function isDone(index) {
    if(todolisted[index].done==false) {
        todolisted[index].done = true;
        saveData();
    } else {
        todolisted[index].done = false;
        saveData();    
    }
    renderTodos();
    
}

// Function for editing the todo task
function editTodo(index, newTask) {
    todolisted[index].task = newTask;
    saveData();
    renderTodos();
}

// Function for deleting todo
function deleteTodo(index) {
    todolisted.splice(index, 1);
    saveData();
    renderTodos();
}





