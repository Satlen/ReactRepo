
import {createContext, useState, useContext, } from "react"


const todoApp1InitialTasks = [
    {id:1, title: 'Faire du Python', done: false},
    {id:2, title: 'Faire du JavaScript', done: false},
    {id:3, title: 'Faire du CSS', done: true},
]



const TodoApp1Context = createContext(null)

export function TodoApp1Provider({children}){


    
   const [app1Tasks, setApp1Tasks] = useState(todoApp1InitialTasks)




    return (
        <>
            <TodoApp1Context.Provider value={ {app1Tasks, setApp1Tasks} }>
                {children}
            </TodoApp1Context.Provider>
        
        </>
    )
}

/**
 * 
 * @returns 
 * @component c'est un hook personnalisé qui permet d' utiliser le contexte
 * Il vérifie d' abord si le contexte est non nul ie on utilise dans le Provider sinon, il envoie unee erreur. 
 */
export const useTodoApp1Context = () => {

    const context = useContext(TodoApp1Context)

    if (!context){ //Pour dire si context est false
        throw new Error("You should use TodoApp1Context inside the Provider")
    }

    return context
}
