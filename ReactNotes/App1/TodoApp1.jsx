import { TodoApp1Provider } from "./TodoApp1Provider.jsx"
import AddTaskApp1 from "./AddTasksApp1.jsx"
import TodoApp1List from "./TodoApp1List.jsx"
import SlideImage from "./SlideImage.jsx"

function TodoApp1() {


    return (
<div className="todoContainer">
<h1>Gestionnaire de tâche</h1>
    <TodoApp1Provider>
        <AddTaskApp1/>
        <TodoApp1List/>
    </TodoApp1Provider>
    <SlideImage/>

</div>
    )
}

export default TodoApp1