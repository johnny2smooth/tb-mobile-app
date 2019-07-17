import React from "react"
import styled from "styled-components"
import { Button } from "reakit"
import { green, red} from "../colors"
import theme from "reakit-theme-default";
import { DateTime } from "luxon"
import { observable, runInAction, action } from "mobx";
import { observer } from "mobx-react"

import Icon from "@mdi/react"
import {
    mdiPlus,
    mdiMinus
} from "@mdi/js"



class DiscussStore {

    //Overview info
    @observable onSpecificChannel = false;
    @observable specificChannel = 0;
    @observable userID = "";
    @observable userName = "";

    //Channel Info
    @observable channels = [];
    @observable newChannelName = ""
    @observable newChannelDescription = ""
    @observable isAddingNewChannel = false;

    //Specific Discussion
    @observable specificChannelMessages = [];
    @observable newMessageBody = "";


    constructor(){
        this.url = process.env.REACT_APP_MESSAGE_API;
    }
   

    @action
    getChannels = () => {

        fetch(`${this.url}/v1/channels`, {
            method: "GET",
            headers: {
                "X-User": this.userID
            },
        }).then(resolve => resolve.json())
            .then(json =>
                    this.channels = json
            )
    }

    postChannel = () => {
        let channelJSON = { description: this.newChannelDescription, name: this.newChannelName };
        fetch(`${this.url}/v1/channels`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User": this.userID
            },
            body: JSON.stringify(channelJSON),
        }).then(resolve => resolve.json())
            .then(json => { this.getChannels() });
    }

    @action
    getDiscussion = () => {

        console.log("thisran " + this.specificChannel)
        fetch(`${this.url}/v1/channels/${this.specificChannel}`, {
            method: "GET",
            headers: {
                "X-User": this.userID
            },
        }).then(resolve => {
                return resolve.json()})
        .then(json =>{
                    this.specificChannelMessages = json
            }
        ).catch( err => console.log(err))

    }

    postMessage = () => {
        let messageJSON = { body: this.newMessageBody, userName: this.userName };
        fetch(`${this.url}/v1/channels/${this.specificChannel}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User": this.userID
            },
            body: JSON.stringify(messageJSON),
        }).then(resolve => resolve.json())
        .then(json => { this.getDiscussion() });
    }


}


function getUserNumber(assembly) {
    return assembly.fetch("menu.phone_number").replace("-", "").trim();
}

function getUserName(assembly) {
    return assembly.fetch("menu.name");
}

const store = new DiscussStore();


@observer
class Discuss extends React.Component {

    componentDidMount(){
        store.userID = getUserNumber(this.props.assembly);
        store.userName = getUserName(this.props.assembly);
    }

    render() {

        if (store.onSpecificChannel) {
            return <Channel assembly={this.props.assembly} ></Channel>
        }
        return <DiscussTest assembly={this.props.assembly} ></DiscussTest>
    }

}

@observer
class DiscussTest extends React.Component {


    updateChannels = (userID) => {
        store.getChannels(userID);
    }

    componentDidMount() {
        this.updateChannels();
    }

    handleChannelClick = (event) => {
        store.onSpecificChannel = true;
        store.specificChannel = event.target.getAttribute('data-key');
    }

    render() {
        let channelList = store.channels.slice().sort((a, b) => {
            return DateTime.fromISO(a.createdAt) - DateTime.fromISO(b.createdAt)
        }).map(item => {
            return <ChannelCard key={item.id} data-key={item.id} onClick={this.handleChannelClick}>
                <h1 data-key={item.id} onClick={this.handleChannelClick}>{item.name}</h1>
                <p data-key={item.id} onClick={this.handleChannelClick}>{item.description}</p>
            </ChannelCard>
        })

        return (
            <Layout>
                <h1>{this.props.assembly.translate("discussion_board.title")}</h1>
                {channelList}
                <NewChannel assembly={this.props.assembly} />
            </Layout>
        )
    }
}

@observer
class Channel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    updateMessages = () => {
        store.getDiscussion()
    }

    handleBack = () => {
        store.onSpecificChannel = false;
        store.specificChannelMessages = []
    }

    componentDidMount() {
        this.updateMessages();
    }

    render() {

        let messageList = store
        .specificChannelMessages.slice()
        .sort((a, b) => {
            return DateTime.fromISO(a.createdAt) - DateTime.fromISO(b.createdAt)
        }).map(item => {
            return <Message>
                <MessageBody>{item.body}</MessageBody>
                <MessageCreator>{item.creatorName} at {DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED)} </MessageCreator>
            </Message>
        })

        let userID = getUserNumber(this.props.assembly);
        let userName = getUserName(this.props.assembly);

        return (
            <Layout>
                <Button onClick={this.handleBack} theme={theme} backgroundColor={red}>Back</Button>
                <h1>{this.props.assembly.translate("discussion_board.title")}</h1>
                {messageList}
                <NewMessage user={{ name: userName, id: userID }} updateMessages={this.updateMessages} />
            </Layout>
        )
    }
}

class NewMessage extends React.Component {


    messageChange = (event) => {
        store.newMessageBody = event.target.value;
    }

    sendMessage = () => {
        store.postMessage();

    }

    render() {
        return <MessageForm>
            <label htmlFor="msg"><b>Message</b></label>
            <textarea placeholder="Type message.." name="msg" onChange={this.messageChange}></textarea>

            <Button onClick={this.sendMessage} theme={theme} backgroundColor={green}>Submit
          </Button>
        </MessageForm>
    }
}

@observer
class NewChannel extends React.Component {

    handlePlus = () => {
        store.isAddingNewChannel = true;
    }

    handleMinus = () => {
        store.isAddingNewChannel = false;
    }

    nameChange = (event) => {
        store.newChannelName = event.target.value;
    }

    descriptionChange = (event) => {
        store.newChannelDescription = event.target.value;
    }

    sendNewChannel = () => {
        store.postChannel()
    }

    render() {

        let plusIcon = <Icon onClick={this.handlePlus} path={mdiPlus} color={"white"} size="1.5em" />
        let minusIcon = <Icon onClick={this.handleMinus} path={mdiMinus} color={"white"} size="1.5em" />

        let controls = (<div className="input-group">
        <label htmlFor="msg">Title</label>
        <br></br>
        <input placeholder="Type name.." name="msg" onChange={this.nameChange}></input>
        <br></br>
        <label htmlFor="msg">Description</label>
        <br></br>
        <textarea placeholder="Type description.." name="msg" onChange={this.descriptionChange}></textarea>
        <br></br>
        </div>)


        return <ChannelForm>
 
            <h1>{this.props.assembly.translate("discussion_board.new_channel")} 
            {store.isAddingNewChannel ? minusIcon : plusIcon} 
            </h1>
            {store.isAddingNewChannel ? controls : ""}
            {store.isAddingNewChannel ? <Button onClick={this.sendNewChannel} theme={theme}>Create</Button> : ""}
        </ChannelForm>
    }
}

const Layout = styled.div`
padding: 1em;
`

const MessageBody = styled.div`
    padding: .5em;

`

const MessageCreator = styled.div`
    color: gray;
    padding-left: .5em;
    font-size: .5em;

`

const MessageForm = styled.div`

    width: 80%;

    textarea{
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        border: none;
        background: #f1f1f1;
        resize: none;
        min-height: 50px;
        font-size: 1.25em;
    }

`

const ChannelCard = styled.div`
background-color: darkgrey;
border: soild 5px;
padding: 1em;
margin: .5em .25em .5em .25em;

h1{
    font-size: 2em;
}
`

const ChannelForm = styled(ChannelCard)`

position: relative;

button{
    background-color: white;
    color: green;
    position: absolute;
    bottom: 1em;
    right: 1em;
}

input{
    padding: 1em;
}

.input-group{

    label{
    font-size: 1.5em;
    font-weight: bold;
    display: inline-block;
    margin-top: 1em;
    margin-bottom: 1em;
    }

    textarea{
        width: 80%;
    }
}


h1{
    display: inline-block;
    position: relative;
    width: 100%;
}

h1 svg{
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    right: 1em;
}

background-color: ${green}

`


const Message = styled.div`
color: black;
padding: .5em;
margin: 1em;
background-color: white;
border-radius: 5px;

`

export default Discuss;
