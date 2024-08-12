let clickedFlag=true;
localStorage.setItem("clickedFlag",JSON.stringify(clickedFlag));

let todoListStack=JSON.parse(localStorage.getItem('todoListStack'));
if(todoListStack===null) {
    todoListStack = [
        {
            id:"",
            name: "homework",
            date: "10/6/2004",
            stat: ""
        }
    ];
    localStorage.setItem('todoListStack',JSON.stringify(todoListStack));
}


export function addToStack(task,date){
    todoListStack=JSON.parse(localStorage.getItem("todoListStack"));
    let todo={
        id: Date.now(),
        name: task,
        date: date,
        stat: "upcoming"
    }
    todoListStack.push(todo);
    localStorage.setItem("todoListStack",JSON.stringify(todoListStack));
}

export function addCompleted(taskId){
    todoListStack=JSON.parse(localStorage.getItem("todoListStack"));
    for (let i=0;i<todoListStack.length;i++){
        if(todoListStack[i].id===taskId){
            todoListStack[i].stat="completed";
            break;
        }
    }
    localStorage.setItem("todoListStack",JSON.stringify(todoListStack));
}

export function deleteTodo(taskId){
    todoListStack=JSON.parse(localStorage.getItem("todoListStack"));
    for (let i=0;i<todoListStack.length;i++){
        if(todoListStack[i].id===taskId){
            todoListStack.splice(i,1);
            break;
        }
    }
    localStorage.setItem("todoListStack",JSON.stringify(todoListStack));
}

export function giveStoredList(){
    return JSON.parse(localStorage.getItem("todoListStack"));
}
