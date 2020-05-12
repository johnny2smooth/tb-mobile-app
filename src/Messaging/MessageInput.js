import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton'
import Colors from '../Basics/Colors'

const useStyles = makeStyles({
    container: {
        backgroundColor: "white",
        display: "flex",
        width: "100%",
        minHeight: "62px",
        boxShadow: "5px 0px 5px 0px rgba(0, 0, 0, 0.2)",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center",
        padding: ".5em 1em .5em 1em" 
    },

    input: {
        flex: 1,
        overflow: "scroll",
        marginRight: "auto"
      },
    send:{
        marginRight: "1em",
        color: Colors.lightBlue,
        backgroundColor: Colors.lightgray
    }
})

const MessageInput = (props) => {

    const classes = useStyles();
    const handleChange = (event) => {
        props.setValue(event.target.value)
    }

    return (<div className={classes.container}>
        <InputBase
            value={props.value}
            className={classes.input}
            placeholder="Type message here"
            inputProps={{ 'aria-label': 'message input' }}
            multiline
            onChange={handleChange} 
        />
        <IconButton disabled={props.disableSend} onClick={props.handleSend} className={classes.send}><SendIcon /></IconButton>
    </div>)

}

export default MessageInput;
