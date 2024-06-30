import { useMessengerContext } from "./MessengerContextApp"


function MessengerWritting(){
const {contact, dispatch, state} = useMessengerContext()


    return(

        <div className="messageWritting">
                <textarea
                className="textArea"
                placeholder = {"write to " + contact.person}
                value={state.messages[state.selectedId]}
                onChange={(e)=>{
                    dispatch(
                        {
                            type:"write_message",
                            text:e.target.value
                        }
                    )
                }}
                />
        </div>
    )
}

export default MessengerWritting