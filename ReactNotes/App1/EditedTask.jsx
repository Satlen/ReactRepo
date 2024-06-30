
import { useTodoApp1Context } from "./TodoApp1Provider"
import { useState } from "react";
/**
 * 
 * @param {Object} tasks - reçu chez TodoApp1List
 * Ce composant, permettra d' éditer les tasks et aussi de les sauvegarder.
 * D' après mes recherches, le plus souvent, il y a 2 méthodes:
 * Soit, je crée un état spécifique pour ça avec le useState, soit je crée un etat toujours useState ou useReducer mais contenant maintenant un objet avec la propriété isEditing.
 * Pour éditer, j' aurai besoin de l' id mais pour sauvegarder, j' aurai besoin de l' id et de du text.
 * Au final, j' utilise le rendu conditionnel pour afficher l' un avec le input type text et l' autre juste avec de simple balise ou de texte. 
 */
const EditedTask = ({task}) => {

    const [isEditing, setIsEditing] = useState(false);
const {app1Tasks, setApp1Tasks} = useTodoApp1Context()
    
    const isEditingTrue = (
        <label>
            <input
            value={task.title}
            onChange={ (e)=> {
                setApp1Tasks(app1Tasks.map(t => t.id === task.id ? {...t, title: e.target.value} : t
                ))
            }}
             />
            <button onClick={() => setIsEditing(false)}>Save</button>
        </label>
    ) 

    const isEditingFalse = (
        <label>
            <span style={{textDecoration: task.done ? 'line-through' : 'none'}} >{task.title} </span> {' '}
            <button onClick={() =>setIsEditing(true)}>Edit</button>
        </label>
    )
    

    return (
        <>
        {
            (isEditing) ? isEditingTrue : isEditingFalse
            
        }
        
        </>
    )

}


export default EditedTask