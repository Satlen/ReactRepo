

export const initialState = {
    selectedId: 0,
    messages: {
        0: 'Hello, Horeb',
        1: 'Hello, Sandi',
        2: 'Hello, Olivia'
    }
}


export default function messengerReducer(state, action){

    
    switch (action.type) {
        case "changed_selection":{
            return {
                ...state,
                selectedId: action.contactId
            }
        }
        case "write_message":{
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [state.selectedId]: action.text,
                }
            }
        }
        case "send_message":{
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [state.selectedId]: '',
                }
            }
        }

        default:
            throw Error("Unknown action " + action.type )

    }


}