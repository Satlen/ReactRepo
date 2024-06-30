
import { useTodoApp1Context } from "./TodoApp1Provider.jsx"
import TaskDone from "./TaskDone.jsx"
import EditedTask from "./EditedTask.jsx"

function TodoApp1List() {

const {app1Tasks, setApp1Tasks} = useTodoApp1Context()

function handleListDeleted(taskDeletedId){
setApp1Tasks(
    app1Tasks.filter( t => 
    t.id !== taskDeletedId 
))}

    return(

        <>
        <h2>Liste de tâche</h2>
        
            {
            app1Tasks.map(task => 
                (<div key = {task.id}>

                    <TaskDone task = {task} />


                    <EditedTask task ={task} />

                    <button onClick={() => handleListDeleted(task.id)}>Supprimer</button> 

                </div>)
            )
            }
        </>
    )
}


export default TodoApp1List