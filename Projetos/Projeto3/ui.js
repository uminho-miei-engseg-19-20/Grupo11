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
			prod: props.prod,
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

	it_belongs_elem(elem, valid_elems){
		for(let j = 0; j < valid_elems.length; j++){
			if(elem == valid_elems[j])
				return true;
		}
		return false;
	}

	it_belongs_elems(inputs,valid_elems){
		for (let index = 0; index < inputs.length; index++){
			if(!this.it_belongs_elem(inputs[index],valid_elems))
				return false;
		}
		return true;
	}

	validate_user_input(user_input,valid_elems) {
		if (user_input.length != 13){
			console.log('len')
			return false;
		}
		else{
			const inputs = user_input.split(' ')

			if(inputs[0].length !=3){
				console.log('inputs[0]')
				return false
			}
			if(inputs[1].length !=9){
				console.log('inputs[1]')
				return false
			}
			if(!this.it_belongs_elems(inputs[0],valid_elems)){
				console.log('inputs[0] - not valid')
				return false
			}
			if(!this.it_belongs_elems(inputs[1],valid_elems)){
				console.log('inputs[1] - not valid')
				return false	
			}
			return true;
		}
	}
	
	validate_other_inputs(inputs,prob_elems){
		if(this.it_belongs_elems(inputs,prob_elems))
			return false;
		else
			return true;
	}	

	componentDidMount() {
		let invalid_elems =  ['§','±','!','"','@','€','#','%','&','/','(',')','?','*','+','|','<','>'];
		let number_elems = ['0','1','2','3','4','5','6','7','8','9'];
		if(this.state.operation == 'GetCertificate' || this.state.operation == 'gc') {
			if(this.state.user){
				if(!this.validate_user_input(this.state.user,number_elems)){
					this.setState({
						error: ['\'user\' input is not valid!']
					});
				}
				else{
					new_cmd_soap_msg.getcertificate(this.state.user, this.state.applicationId, this.state.prod).then((result) => {
					this.setState({ 
						operation: 'GetCertificate',
						data: result });
				})
				}
				
			}else {
				this.setState({
					error: ['No user passed, use --user="XXX 000000000"']
				})
			}		
		}


		if(this.state.operation == 'CCMovelSign' || this.state.operation == 'ms') {
			if(this.state.user &&  this.state.docName && this.state.pin){
				if(!this.validate_user_input(this.state.user,number_elems)){
					this.setState({
						error: ['\'user\' input is not valid!']
					})
				}
				else if(!this.validate_other_inputs(this.state.docName,invalid_elems)){
					this.setState({
						error: ['\'docname\' input is not valid!']
					})
				}
				
				else{	
					new_cmd_soap_msg.ccmovelsign(this.state.user, this.state.applicationId, this.state.docName, undefined, this.state.pin, this.state.prod)
						.then((result) => {
							this.setState({ 
								operation: 'CCMovelSign',
								data: result });
						})
				}
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
				let flag = false;
				if(!this.validate_user_input(this.state.user,number_elems)){
					this.setState({
						error: ['\'user\' input is not valid!']
					});
				}

				else if (flag == false){
					this.state.docNames.forEach(docName=>{
						if(!this.validate_other_inputs(docName,invalid_elems)){
							this.setState({
								error: ['\'docname\' input is not valid!']
							})
						}
					});
				}
				
				else{
					new_cmd_soap_msg.ccmovelmultiplesign(this.state.user, this.state.applicationId, this.state.docNames, this.state.pin, this.state.prod)
						.then((result) => {
							this.setState({ 
								operation: 'CCMovelMultSignRequest',
								data: result });
						})
				}
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
				if(!this.validate_other_inputs(this.state.code,invalid_elems)){
					this.setState({
						error: ['\'code\' input is not valid!']
					})
				}
				else if(!this.validate_other_inputs(this.state.processId,invalid_elems)){
					this.setState({
						error: ['\'processId\' input is not valid!']
					})
				}
				else{
					new_cmd_soap_msg.validate_otp(this.state.code, this.state.processId, this.state.applicationId, this.state.prod).then((result) => {
						this.setState({ 
							operation: 'ValidateOTP',
							data: result });
					})	
				}
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
	processId: PropTypes.number,
	prod: PropTypes.bool
};

App.defaultProps = {
	applicationId: 'YjgyNjM1OWMtMDZmOC00MjVlLThlYzMtNTBhOTdhNDE4OTE2',
	prod: false
};

module.exports = App;
