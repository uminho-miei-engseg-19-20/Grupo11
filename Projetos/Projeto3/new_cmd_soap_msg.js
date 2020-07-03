var SOAPRequest = require('./soap_request')

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


//Função que devolve o cliente de ligação (preprod ou prod) ao servidor SOAP da CMD
function getclient(env=0) {
    /*Devolve o cliente de ligação ao servidor SOAP da CMD.
    Parameters
    ----------
    env : int
        WSDL a devolver: 0 para preprod, 1 para prod.
    Returns
    -------
    Zeep.Client
        Devolve o cliente de ligação ao servidor SOAP da CMD. Por defeito devolve o
        servidor de preprod.
    */
    return Client(get_wsdl(env))
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
        'SHA256': bytes(bytearray([0x30, 0x31, 0x30, 0x0d, 0x06, 0x09, 0x60, 0x86, 0x48, 0x01,
                                   0x65, 0x03, 0x04, 0x02, 0x01, 0x05, 0x00, 0x04, 0x20]))
    }
    return prefix[hashtype] + hash
}

//GetCertificate(applicationId: xsd:base64Binary, userId: xsd:string)
//                                      -> GetCertificateResult: xsd:string
function getcertificate(userId,applicationId){
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
    request_data = {
        'applicationId': args.applicationId.encode('UTF-8'),
        'userId': args.user
    }
    return client.service.GetCertificate(request_data.applicationId, request_data.userId)
    */

    //const xml = '<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/"> <soap-env:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"><wsa:Action>http://Ama.Authentication.Service/CCMovelSignature/GetCertificate</wsa:Action><wsa:MessageID>urn:uuid:66edc9ce-8b57-432c-8b32-37454755566a</wsa:MessageID><wsa:To>https://preprod.cmd.autenticacao.gov.pt/Ama.Authentication.Frontend/CCMovelDigitalSignature.svc</wsa:To></soap-env:Header><soap-env:Body><ns0:GetCertificate xmlns:ns0="http://Ama.Authentication.Service/"><ns0:applicationId>Q2hhbmdlIHRvIHlvdXIgQXBwbGljYXRpb25JZA==</ns0:applicationId><ns0:userId>932115032</ns0:userId></ns0:GetCertificate></soap-env:Body></soap-env:Envelope>';
    SOAPRequest.getCertificateRequest(userId,applicationId)

}

function ccmovelsign(user_id,application_id, docname, hash,cmd_pin){
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
    request_data = {
        'applicationId': args.applicationId.encode('UTF-8'),
        'userId': args.user
    }
    return client.service.GetCertificate(request_data.applicationId, request_data.userId)
    */

    //const xml = '<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/"> <soap-env:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"><wsa:Action>http://Ama.Authentication.Service/CCMovelSignature/GetCertificate</wsa:Action><wsa:MessageID>urn:uuid:66edc9ce-8b57-432c-8b32-37454755566a</wsa:MessageID><wsa:To>https://preprod.cmd.autenticacao.gov.pt/Ama.Authentication.Frontend/CCMovelDigitalSignature.svc</wsa:To></soap-env:Header><soap-env:Body><ns0:GetCertificate xmlns:ns0="http://Ama.Authentication.Service/"><ns0:applicationId>Q2hhbmdlIHRvIHlvdXIgQXBwbGljYXRpb25JZA==</ns0:applicationId><ns0:userId>932115032</ns0:userId></ns0:GetCertificate></soap-env:Body></soap-env:Envelope>';
    SOAPRequest.CCMovelSignRequest(user_id,application_id, docname, hash,cmd_pin)

}

const userId = 932115032
const applicationId = 'Q2hhbmdlIHRvIHlvdXIgQXBwbGljYXRpb25JZA=='
let certificate = getcertificate(userId,applicationId)

const docname='test.js';
const hash= 'SHA256';
const cmd_pin = '021090';
let signature = ccmovelsign(userId, applicationId, docname, hash, cmd_pin)