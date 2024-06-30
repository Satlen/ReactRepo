import { useTodoApp1Context } from "./TodoApp1Provider.jsx"




export default function TaskDone({task}){

    const {app1Tasks, setApp1Tasks} = useTodoApp1Context()

    /**
     * Cette fonction map, itère sur chaque objet de l' état et retourne un booléan selon que l' id fourni correspond à un id d' un objet de l' état. Avec le ternaire, si true, on fait une nouvelle copie des objets de l' état et on change la propriété "done" mais si false, on retourne tout simplement le même objet sans modification.  
     * @function
     * @param {number} taskId - id fourni lors du chech
     *  
     */
function handleTaskCheched(taskId){
    setApp1Tasks(
        app1Tasks.map(t => t.id === taskId ? {...t, done : !t.done} : t )
    )
}



    return (

        <>
        <input
        type = 'checkbox'
        checked = {task.done}
        onChange={ ()=> handleTaskCheched(task.id)}
        />
        
        </>
    )
}