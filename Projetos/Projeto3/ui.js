'use strict';
const React = require('react');
const { Component } = require('react');
const PropTypes = require('prop-types');
const {Text, Color} = require('ink');
const new_cmd_soap_msg = require('./new_cmd_soap_msg')

function DisplayAction(props){
	const error = props.error;
	if(error){
		return error.map((value, index) => {
			return <Text key={index}><Color red>{value}</Color></Text>
		})	
	}else{
		return <Text>{props.operation}: <Color green>{props.statusCode}</Color> {props.message}</Text>
	}
		
}



class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			user: props.user,
			pin: props.pin,
			docNames: props.docNames ? props.docNames.split(',') : props.docNames,
			docName: props.docName,
			operation: props.operation,
			applicationId: props.applicationId,
			error: undefined,
			code: props.code,
			processId: props.processId,
			data: [] };
	}

	componentDidMount() {
		if(this.state.operation == 'GetCertificate' || this.state.operation == 'gc') {
			if(this.state.user){
				new_cmd_soap_msg.getcertificate(this.state.user, this.state.applicationId).then((result) => {
					this.setState({ 
						operation: 'GetCertificate',
						data: result });
				})
				
			}else {
				this.setState({
					error: ['No user passed, use --user="XXX 000000000"']
				})
			}		
		}


		if(this.state.operation == 'CCMovelSign' || this.state.operation == 'ms') {
			if(this.state.user &&  this.state.docName && this.state.pin){
				new_cmd_soap_msg.ccmovelsign(this.state.user, this.state.applicationId, this.state.docName, undefined, this.state.pin)
					.then((result) => {
						this.setState({ 
							operation: 'CCMovelSign',
							data: result });
					})
			} else {
				let err = []
				if(!this.state.user) {
					err.push('No user passed, use --user="XXX 000000000"')
				}
				if(!this.state.docName){
					err.push('No docName passed, use --docName="xxxx.pdf"')
				}
				if(!this.state.pin){
					err.push('No pin passed, use --pin=xxxx')
				}
				this.setState({
					error: err
				})
			}
		}

		if(this.state.operation == 'CCMovelMultSignRequest' || this.state.operation == 'mms') {
			if(this.state.user &&  this.state.docNames && this.state.pin){
				new_cmd_soap_msg.ccmovelmultiplesign(this.state.user, this.state.applicationId, this.state.docNames, this.state.pin)
					.then((result) => {
						this.setState({ 
							operation: 'CCMovelMultSignRequest',
							data: result });
					})
			} else {
				let err = []
				if(!this.state.user) {
					err.push('No user passed, use --user="XXX 000000000"')
				}
				if(!this.state.docNames){
					err.push('No docNames passed, use --docNames="xxxx.pdf","yyyy.pdf"')
				}
				if(!this.state.pin){
					err.push('No pin passed, use --pin=xxxx')
				}
				this.setState({
					error: err
				})
			}
		}

		if(this.state.operation == 'ValidateOTP' || this.state.operation == 'otp') {
			if(this.state.code &&  this.state.processId){
				new_cmd_soap_msg.validate_otp(this.state.code, this.state.processId, this.state.applicationId).then((result) => {
					this.setState({ 
						operation: 'ValidateOTP',
						data: result });
				})	
			} else {
				let err = []
				if(!this.state.code) {
					err.push('No code passed, use --code=XXXX')
				}
				if(!this.state.processId){
					err.push('No process id passed, use --processId1=XXXX')
				}
				this.setState({
					error: err
				})
			}
		}

	}

	render() {
		return (
			<DisplayAction error={this.state.error} operation={this.state.operation} statusCode={this.state.data.statusCode} message={this.state.data.message}/>
		);
	  }
}


App.propTypes = {
	user: PropTypes.string,
	pin: PropTypes.number,
	applicationId: PropTypes.string,
	operation: PropTypes.string,
	docName: PropTypes.string,
	docNames: PropTypes.string,
	code: PropTypes.number,
	processId: PropTypes.number
};

App.defaultProps = {
	applicationId: 'YjgyNjM1OWMtMDZmOC00MjVlLThlYzMtNTBhOTdhNDE4OTE2',
};

module.exports = App;
