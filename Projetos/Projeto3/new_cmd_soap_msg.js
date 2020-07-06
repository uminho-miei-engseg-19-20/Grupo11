var SOAPRequest = require('./soap_request')
var sha256 = require('js-sha256');


//Função que devolve o URL do WSDL do SCMD (preprod ou prod)
function get_wsdl(env) {
    /*Devolve URL do WSDL do SCMD.
    Parameters
    ----------
    env : int
        WSDL a devolver: 0 para preprod, 1 para prod.
    Returns
    -------
    string
        URL do WSDL do SCMD.
    */    
    const wsdl = [
        'https://preprod.cmd.autenticacao.gov.pt/Ama.Authentication.Frontend/CCMovelDigitalSignature.svc?wsdl',
        'https://cmd.autenticacao.gov.pt/Ama.Authentication.Frontend/CCMovelDigitalSignature.svc?wsdl'
    ]
    //Get the function from switcher dictionary
    return wsdl[env]
}


//GetCertificate(applicationId: xsd:base64Binary, userId: xsd:string)
//                                      -> GetCertificateResult: xsd:string
async function getcertificate(userId,applicationId, prod=false){
    /*
    /*Prepara e executa o comando SCMD GetCertificate.
    Parameters
    ----------
    client : Client (zeep)
        Client inicializado com o WSDL.
    args : argparse.Namespace
        argumentos a serem utilizados na mensagem SOAP.
    Returns
    -------
    str
        Devolve o certificado do cidadão e a hierarquia de certificação.
    */
    let url = ''
    prod?url=get_wsdl(1):url=get_wsdl(0)
    return await SOAPRequest.getCertificateRequest(userId, applicationId, url)

}

function ccmovelsign(user_id, application_id, docname, hash, cmd_pin, prod=false){
    /*
    /*Prepara e executa o comando SCMD GetCertificate.
    Parameters
    ----------
    client : Client (zeep)
        Client inicializado com o WSDL.
    args : argparse.Namespace
        argumentos a serem utilizados na mensagem SOAP.
    Returns
    -------
    str
        Devolve o certificado do cidadão e a hierarquia de certificação.
    */
    if(!hash){
        hash = sha256('Nobody inspects the spammish repetition')
    }
    
    let url = ''
    prod?url=get_wsdl(1):url=get_wsdl(0)
    return SOAPRequest.CCMovelSignRequest(user_id, application_id, docname, hash, cmd_pin, url)
}


/* CCMovelMultipleSign(request: ns2:MultipleSignRequest,
                                  documents: ns2:ArrayOfHashStructure)
                                      -> CCMovelMultipleSignResult: ns2:SignStatus
     ns2:MultipleSignRequest(ApplicationId: xsd:base64Binary, Pin: xsd:string,
                                                               UserId: xsd:string)
     ns2:ArrayOfHashStructure(HashStructure: ns2:HashStructure[])
     ns2:HashStructure(Hash: xsd:base64Binary, Name: xsd:string, id: xsd:string)
     ns2:SignStatus(Code: xsd:string, Field: xsd:string, FieldValue: xsd:string,
                       Message: xsd:string, ProcessId: xsd:string)*/
function ccmovelmultiplesign(userid, application_id, docnames, pin, prod=false){
    /*Prepara e executa o comando SCMD CCMovelMultipleSign.

    Parameters
    ----------
    client : Client (zeep)
        Client inicializado com o WSDL.
    args : argparse.Namespace
        argumentos a serem utilizados na mensagem SOAP.

    Returns
    -------
    SignStatus
        Devolve uma estrutura SignStatus com a resposta do CCMovelMultipleSign.

    */

    let url = ''
    prod?url=get_wsdl(1):url=get_wsdl(0)
    return SOAPRequest.CCMovelMultSignRequest(userid, application_id, docnames, pin, url)
}


/* ValidateOtp(code: xsd:string, processId: xsd:string, applicationId:
    #                      xsd:base64Binary) -> ValidateOtpResult: ns2:SignResponse
    # ns2:SignResponse(ArrayOfHashStructure: ns2:ArrayOfHashStructure,
    #                          Signature: xsd:base64Binary, Status: ns2:SignStatus)
    # ns2:ArrayOfHashStructure(HashStructure: ns2:HashStructure[])
    # ns2:HashStructure(Hash: xsd:base64Binary, Name: xsd:string, id: xsd:string)
    # ns2:SignStatus(Code: xsd:string, Field: xsd:string, FieldValue: xsd:string,
    #                                   Message: xsd:string, ProcessId: xsd:string)*/
function validate_otp(code, p_id, application_id, prod=false){
        /*Prepara e executa o comando SCMD ValidateOtp.
    
        Parameters
        ----------
        client : Client (zeep)
            Client inicializado com o WSDL.
        args : argparse.Namespace
            argumentos a serem utilizados na mensagem SOAP.
    
        Returns
        -------
        SignResponse
            Devolve uma estrutura SignResponse com a resposta do CCMovelMultipleSign.
    
        */

       let url = ''
       prod?url=get_wsdl(1):url=get_wsdl(0)
       return SOAPRequest.validateOTPRequest(code, p_id, application_id, url)
}   

/*
const userId = 932115032
const applicationId = 'Q2hhbmdlIHRvIHlvdXIgQXBwbGljYXRpb25JZA=='
let certificate = getcertificate(userId,applicationId)

const docname='test.js';
const hash= 'SHA256';
const cmd_pin = '021090';
let signature = ccmovelsign(userId, applicationId, docname, hash, cmd_pin)*/

module.exports.getcertificate = getcertificate
module.exports.ccmovelsign = ccmovelsign
module.exports.ccmovelmultiplesign = ccmovelmultiplesign
module.exports.validate_otp = validate_otp