import { useMessengerContext } from "./MessengerContextApp"


function MessengerList(){

    const {contacts, dispatch, state} = useMessengerContext()


    return(

        <div className="messageList">
            {contacts.map( c => (
                <label key = {c.id}>
                    <button 
                    onClick = { ()=> {
                        dispatch({
                            type:'changed_selection',
                            contactId: c.id,
                        })
                    }}
                    >
                        { c.id === state.selectedId ? <b>{c.person}</b> 
                        : c.person }
                    </button>
                    <br/>
                </label>
            ))}
        </div>  
    )
}

export default MessengerList