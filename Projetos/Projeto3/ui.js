'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const {Text, Color} = require('ink');
const cmd_soap_msg = require('./cmd_soap_msg')

const App = ({user, pin}) => (
	<div>
		<Text>Teste 1 - GetCertificate, <Color green>{cmd_soap_msg.getCertificateMockUp(user)}</Color></Text>
		<Text>Teste 2 - CCMovelSign, <Color green>{cmd_soap_msg.CCMovelSignMockUp(user)}</Color></Text>
		<Text>Teste 3 - CCMovelMultipleSign, <Color green>{cmd_soap_msg.CCMovelMultipleSignMockUp(user)}</Color></Text>
		<Text>Teste 4 - ValidateOtp, <Color green>{cmd_soap_msg.ValidateOtpMockUp(user)}</Color></Text>
	</div>
);	

App.propTypes = {
	user: PropTypes.string,
	pin: PropTypes.string	
};

App.defaultProps = {
	user: '918133837',
	pin: '0000'
};

module.exports = App;
