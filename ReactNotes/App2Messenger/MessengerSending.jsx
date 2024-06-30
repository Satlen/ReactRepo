import { useMessengerContext } from "./MessengerContextApp";


function MessengerSending(){
    const {contact, dispatch, state} = useMessengerContext()


    return(

        <div className="messageSending">
            <button
                onClick = {()=> {
                    alert(`Sending   "${state.messages[state.selectedId]}"  to ${contact.person} `);
                    dispatch({
                        type:'send_message',
                    })
                }}
                >
                    {`send to ${contact.person}${contact.email}`}
                </button>


        </div>
    )
}

export default MessengerSending