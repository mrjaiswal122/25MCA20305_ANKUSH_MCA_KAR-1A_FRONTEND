let total=document.getElementById("total");
let done=document.getElementById("done");
let pending=document.getElementById("pending");
let createToDo = document.getElementById("createToDo");

function updateCounts() {
    total.innerText = array.length;
    done.innerText = array.filter(task => task.completed).length;
    pending.innerText = array.filter(task => !task.completed).length;
}
let toDoList =document.getElementById("toDoList");
let array=[];
createToDo.addEventListener("click",function(e){
    e.preventDefault();
    let timeOut=setTimeout(function(){
        
 
    let taskName = document.getElementById("taskName").value;
    let taskPriority = document.getElementById("priority").value;
    let taskDate = document.getElementById("date").value;
// console.log(taskDate,taskName,taskPriority)
    let taskElement = document.createElement("div");
    taskElement.id = `task${array.length}`;
    taskElement.classList.add("border", "border-secondary", "p-2", "m-2");
    array.push({taskName,taskPriority,taskDate,completed:false})
    console.log(array);
    // apply some styling to the checkbox and the remove button
    taskElement.innerHTML = `
        <div class="controls d-flex">
        <input class="form-check-input me-2" type="checkbox" onchange="toggleCompleted(this.parentElement.parentElement)"/>
        <button class="bg-danger rounded-2" id="${array.length}" onclick="removeTask(this.parentElement.parentElement)">X</button>
        </div>
        <h5>${taskName}</h5>
        <p>Priority: ${taskPriority}</p>
        <p>Deadline: ${taskDate}</p>
        
    `;

    toDoList.appendChild(taskElement);
    updateCounts();
       },300);
       
});
function toggleCompleted(taskElement) {
    let index = array.findIndex(task => task.taskName === taskElement.querySelector("h5").textContent);
    //also change the bg color of the task element based on completion status
    taskElement.classList.toggle("bg-success");
    if (index !== -1) {
        array[index].completed = !array[index].completed;
        if (array[index].completed) {
            taskElement.classList.add("bg-success");
        } else {
            taskElement.classList.remove("bg-success");
        }
    }
    updateCounts();
}
// write the logic for sorting the task based on the 'sorting' dropdown value. The sorting should be done based on the task name, priority, or deadline.
let sorting = document.getElementById("sorting");
sorting.addEventListener("change", function() {
    let sortedArray = [...array];
    if (sorting.value === "nearest") {
        sortedArray.sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));
    } else if (sorting.value === "low-high") {
        const priorityOrder = { "low": 1, "medium": 2, "high": 3 };
        sortedArray.sort((a, b) => priorityOrder[a.taskPriority] - priorityOrder[b.taskPriority]);
    } else if (sorting.value === "high-low") {
        const priorityOrder = { "low": 1, "medium": 2, "high": 3 };
        sortedArray.sort((a, b) => priorityOrder[b.taskPriority] - priorityOrder[a.taskPriority]);
    }
    // Clear the existing task elements
    toDoList.innerHTML = "";
    // Re-render the sorted tasks
    sortedArray.forEach(task => {
        let taskElement = document.createElement("div");        
        taskElement.id = `task${array.indexOf(task)}`;
        taskElement.classList.add("border", "border-secondary", "p-2", "m-2");
        if (task.completed) {
            taskElement.classList.add("bg-success");
        }
        taskElement.innerHTML = `
            <div class="controls d-flex">
            <input class="form-check-input me-2" type="checkbox" onchange="toggleCompleted(this.parentElement.parentElement)" ${task.completed ? "checked" : ""}/>
            <button class="bg-danger rounded-2" id="${array.indexOf(task)}" onclick="removeTask(this.parentElement.parentElement)">X</button>
            </div>  
            <h5>${task.taskName}</h5>
            <p>Priority: ${task.taskPriority}</p>
            <p>Deadline: ${task.taskDate}</p>
        `;
        toDoList.appendChild(taskElement);
    });
});

function removeTask(taskElement) {
    toDoList.removeChild(taskElement);
    // Find the task in the array and remove it
    let index = array.findIndex(task => task.taskName === taskElement.querySelector("h5").textContent);
    if (index !== -1) {
        array.splice(index, 1);
    }
    updateCounts();
}
