import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import OverTopBar from '../../Navigation/OverTopBar';
import MessageInput from './MessageInput';
import ScrollRef from '../../Basics/ScrollRef'
import Message from './Message';

const useStyles = makeStyles({
    messageList: {
        marginBottom: "100px",
        margin: ".5em",
        display: "flex",
        flexDirection: "column",
    },

});

const Channel = observer((props) => {
    const classes = useStyles();
    const { messagingStore } = useStores();

    let messages = [];
    if (messagingStore.channelInfoReturned && messagingStore.selectedChannelMessages) {
        messages = messagingStore.selectedChannelMessages.map(message => {
            const isUser = props.userID === message.user_id;

            return <Message message={message} isUser={isUser} />
        })

        messages.push(<ScrollRef />)
    }

    console.log(messagingStore.lastMessageFetched)

    return (
        <>
            <OverTopBar handleBack={messagingStore.clearSelection} title={messagingStore.selectedChannelTitle} />
            <div className={classes.messageList}>
                {messages}
            </div>
            <MessageInput value={messagingStore.newMessage}
                setValue={(value) => { messagingStore.newMessage = value }}
                disabled={messagingStore.newMessage == ""}
                handleSend={messagingStore.sendMessage}
            />
        </>
    )
});

export default Channel;