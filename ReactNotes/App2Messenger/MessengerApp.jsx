import MessengerList from "./MessengerList"
import MessengerWritting from "./Messengerwritting"
import MessengerContextApp from "./MessengerContextApp"
import MessengerSending from "./MessengerSending"



function MessengerApp(){

    return(
        <>
            <MessengerContextApp>
                <MessengerList />
                <MessengerWritting />
                <MessengerSending/>
            </MessengerContextApp>
        </>
    )
}

export default MessengerApp


