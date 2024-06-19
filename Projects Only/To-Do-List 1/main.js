document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('addButton').addEventListener('click', addTask);
    document.getElementById('taskForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addTask();
    });
});

function addTask() {
    const newTask = document.getElementById('newTask');
    const inHere = document.getElementById('inHere');
    
    if (newTask.value.trim() !== "") {
        const li = document.createElement('li');
        li.innerHTML = `
            ${newTask.value}
                <button class="checkButton">✓</button>
            <div>
                <button class="deleteButton">Done</button>
            </div>
        `;
        
        li.querySelector('.checkButton').addEventListener('click', function() {
            li.classList.toggle('completed');
        });

        li.querySelector('.deleteButton').addEventListener('click', function() {
            li.remove();
        });
        
        inHere.appendChild(li);
        newTask.value = "";
    }
}
