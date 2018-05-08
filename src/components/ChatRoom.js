import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class ChatRoom extends Component {
	
	constructor(props, context){
		super(props, context);
		this.updateMessage = this.updateMessage.bind(this);
		this.submitMessage = this.submitMessage.bind(this);
		this.state = {
			message: '',
			messages: [
			]
		}
	}

	componentDidMount(){
		firebase.database().ref('messages/').on('value', (snapshot) => {
			const currentMessages = snapshot.val();
			if(currentMessages != null){
				this.setState({
					messages: currentMessages
				})
			}
		})
	}

	updateMessage(event){
		this.setState({
			message: event.target.value
		})
	}

	submitMessage(event){
		const nextMessage = {
			id: this.state.messages.length,
			text: this.state.message
		}
		
		firebase.database().ref('messages/' + nextMessage.id).set(nextMessage)
	}

	render(){

		const currentMessage = this.state.messages.map((message, i) => {
			return (
				<li key={message.id}>{message.text}</li>				
			)
		})
		return (
			<div>
				<ol>
					{currentMessage}
				</ol>
				<input onChange={this.updateMessage} type="text" placeholder="Message" />
				<br />
				<button onClick={this.submitMessage}>Submit Message</button>
			</div>
		)
	}
}

export default ChatRoom