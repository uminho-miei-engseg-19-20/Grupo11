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

//Devolve a hash acrescentada do prefixo do tipo de hash utilizada
function hashPrefix(hashtype, hash){
    /*Devolve a hash, à qual acrescenta o prefixo adequado ao hashtype utilizada.
    Parameters
    ----------
    hashtype : string ('SHA256')
        tipo de hash efetuada, do qual hash é o resultado.
    hash : byte
        hash digest
    Returns
    -------
    byte
        Devolve hash adicionada de prefixo adequado ao hashtype de hash utilizada.
    */
    prefix = {
        'SHA256': '010\r\x06\t`\x86H\x01e\x03\x04\x02\x01\x05\x00\x04'
    }
    return prefix[hashtype] + hash
}

//GetCertificate(applicationId: xsd:base64Binary, userId: xsd:string)
//                                      -> GetCertificateResult: xsd:string
async function getcertificate(userId,applicationId){
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

    return await SOAPRequest.getCertificateRequest(userId, applicationId)

}

function ccmovelsign(user_id, application_id, docname, hash, cmd_pin){
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

    return SOAPRequest.CCMovelSignRequest(user_id, application_id, docname, hash, cmd_pin)
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