'use strict';
const React = require('react');
const { Component } = require('react');
const PropTypes = require('prop-types');
const {Text, Color} = require('ink');
const new_cmd_soap_msg = require('./new_cmd_soap_msg')


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			pin: props.pin,
			docName: props.docName,
			operation: props.operation,
			applicationId: props.applicationId, 
			data: [] };
	}

	async componentDidMount() {
		if(this.state.operation == 'GetCertificate' || this.state.operation == 'gc') {
			const result = await new_cmd_soap_msg.getcertificate(this.state.user, this.state.applicationId)
			this.setState({ 
				operation: 'GetCertificate',
				data: result });	
		}
		if(this.state.operation == 'CCMovelSign' || this.state.operation == 'ms') {
			const result = await new_cmd_soap_msg.ccmovelsign(this.state.user, this.state.applicationId, this.state.docName, undefined, this.state.pin)
			this.setState({ 
				operation: 'CCMovelSign',
				data: result });	
		}
	}
	
	
	render() {
		return (
			<div>
				<Text>{this.state.operation}: <Color green>{this.state.data.statusCode}</Color></Text>
			</div>
		);
	  }
}


App.propTypes = {
	user: PropTypes.string,
	pin: PropTypes.string,
	applicationId: PropTypes.string,
	operation: PropTypes.string,
	docName: PropTypes.string
};

App.defaultProps = {
	user: '+351 918133837',
	pin: '0000',
	applicationId: 'YjgyNjM1OWMtMDZmOC00MjVlLThlYzMtNTBhOTdhNDE4OTE2',
	operation: 'GetCertificate',
	docName: './CMD-SOAP/LICENSE'
};

module.exports = App;
