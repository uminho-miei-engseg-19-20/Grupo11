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
		return <Text>{props.operation}: <Color green>{props.statusCode}</Color></Text>
	}
		
}



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			pin: props.pin,
			docName: props.docName,
			operation: props.operation,
			applicationId: props.applicationId,
			error: undefined,
			data: [] };
	}

	async componentDidMount() {
		if(this.state.operation == 'GetCertificate' || this.state.operation == 'gc') {
			if(this.state.user){
				const result = await new_cmd_soap_msg.getcertificate(this.state.user, this.state.applicationId)
				this.setState({ 
					operation: 'GetCertificate',
					data: result });
			}else {
				this.setState({
					error: ['No user passed, use --user="XXX 000000000"']
				})
			}		
		}
		if(this.state.operation == 'CCMovelSign' || this.state.operation == 'ms') {
			if(this.state.user &&  this.state.docName && this.state.pin){
				const result = await new_cmd_soap_msg.ccmovelsign(this.state.user, this.state.applicationId, this.state.docName, undefined, this.state.pin)
				this.setState({ 
					operation: 'CCMovelSign',
					data: result });
			} else {
				let err = []
				if(!this.state.user) {
					err.push('No user passed, use --user="XXX 000000000"')
				}
				if(!this.state.docName){
					err.push('No docName passed, use --docName="xxxx.pdf"')
				}
				if(!this.state.pin){
					err.push('No pin passed, use --pin="xxxx"')
				}
				this.setState({
					error: err
				})
			}
		}
	}

	render() {
		return (
			<DisplayAction error={this.state.error} operation={this.state.operation} statusCode={this.state.data.statusCode}/>
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
	applicationId: 'YjgyNjM1OWMtMDZmOC00MjVlLThlYzMtNTBhOTdhNDE4OTE2',
};

module.exports = App;
