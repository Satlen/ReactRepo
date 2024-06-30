import { useState } from "react"
import { useTodoApp1Context } from "./TodoApp1Provider.jsx"





function AddTaskApp1(){

const [entryTasks, setEntryTasks] = useState('')
const {app1Tasks, setApp1Tasks} = useTodoApp1Context()

const handleAddTasks = (newTask) => {
    if (entryTasks.trim() !== '') {
setApp1Tasks( [...app1Tasks, { id: Date.now(), title: newTask, done: false}]);
setEntryTasks('')

    }
}



    return (
        <>
            <input 
            type = "text"
            placeholder = "Entrez une tâche"
            value = {entryTasks}
            onChange={ (e) => setEntryTasks(e.target.value)}
            /> {' '}
            <button onClick={ () => handleAddTasks(entryTasks) }> 
            Ajouter 
            </button>
        
        
        </>
    )
}

export default AddTaskApp1