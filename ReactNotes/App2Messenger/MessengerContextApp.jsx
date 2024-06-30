import { useReducer, createContext, useContext } from "react"
import messengerReducer, { initialState } from "./messengerReducer"


export const contacts = [
    {id:0, person: 'Horeb', email:'@gmail.com'},
    {id:1, person: 'Sandy', email:'@gmail.com'},
    {id:2, person: 'Olivia', email:'@gmail.com'},
]

const MessengerContext = createContext()


function MessengerContextApp({children}){

    const [state, dispatch] = useReducer(messengerReducer, initialState)
    const contact = contacts.find(c => c.id === state.selectedId)


    return(
        <div className="messageContainer">
            <MessengerContext.Provider 
            value={{state, dispatch, contact, contacts}}>
                {children}
            </MessengerContext.Provider>
        </div>
    )
}

export default MessengerContextApp


export function useMessengerContext(){
    return useContext(MessengerContext)
}