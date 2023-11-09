import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from "react-chat-engine-advanced";

const ChatsPage = (props) => {
    const chatProps = useMultiChatLogic(
        'f95afd36-2ece-4414-b9d5-a374f576d4fb',
        props.user.username,
        props.user.secret
    );
    return (
        <div style = {{ height: '100vh'}}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow {...chatProps} style = {{ height: '100%'}} />
        </div>
    )
}

export default ChatsPage;