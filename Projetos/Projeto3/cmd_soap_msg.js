var sha256 = require('js-sha256');
var soap = require('soap');


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
    Soap.Client
        Devolve o cliente de ligação ao servidor SOAP da CMD. Por defeito devolve o
        servidor de preprod.
    */

    client = soap.createClient(get_wsdl(env), function(err, client) {
        client.MyFunction(args, function(err, result) {
            console.log(result);
        });
    });
    return client
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
function getcertificate(client, args){
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
    request_data = {
        'applicationId': args.applicationId.encode('UTF-8'),
        'userId': args.user
    }

    
    return client.GetCertificate(request_data, function(err, result, rawResponse, soapHeader, rawRequest) {
                return result
           })
}


/* CCMovelSign(request: ns2:SignRequest) -> CCMovelSignResult: ns2:SignStatus
# ns2:SignRequest(ApplicationId: xsd:base64Binary, DocName: xsd:string,
#                  Hash: xsd:base64Binary, Pin: xsd:string, UserId: xsd:string)
# ns2:SignStatus(Code: xsd:string, Field: xsd:string, FieldValue: xsd:string,
#                   Message: xsd:string, ProcessId: xsd:string)*/
function ccmovelsign(client, args, hashtype='SHA256'){
    /*Prepara e executa o comando SCMD CCMovelSign.
    Parameters
    ----------
    client : Client (zeep)
        Client inicializado com o WSDL.
    args : argparse.Namespace
        argumentos a serem utilizados na mensagem SOAP.
    hashtype: Tipo de hash
        tipo de hash efetuada, do qual o digest args.hash é o resultado.
    Returns
    -------
    SignStatus(Code: xsd:string, Field: xsd:string, FieldValue: xsd:string, Message: xsd:string,
    ProcessId: xsd:string)
        Devolve uma estrutura SignStatus com a resposta do CCMovelSign.
    */
    if (!args.includes('docName'))
        args.docName = 'docname teste'
    if (!args.includes('hash'))
        args.hash = sha256('Nobody inspects the spammish repetition')
    args.hash = hashPrefix(hashtype, args.hash)
    request_data = {
        'request': {
            'ApplicationId': args.applicationId.encode('UTF-8'),
            'DocName': args.docName,
            'Hash': args.hash,
            'Pin': args.pin,
            'UserId': args.user
        }
    }
    
    return client.CCMovelSign(request_data.request, function(err, result, rawResponse, soapHeader, rawRequest) {
                return result
           })
}


/* CCMovelMultipleSign(request: ns2:MultipleSignRequest,
    #                              documents: ns2:ArrayOfHashStructure)
    #                                  -> CCMovelMultipleSignResult: ns2:SignStatus
    # ns2:MultipleSignRequest(ApplicationId: xsd:base64Binary, Pin: xsd:string,
    #                                                           UserId: xsd:string)
    # ns2:ArrayOfHashStructure(HashStructure: ns2:HashStructure[])
    # ns2:HashStructure(Hash: xsd:base64Binary, Name: xsd:string, id: xsd:string)
    # ns2:SignStatus(Code: xsd:string, Field: xsd:string, FieldValue: xsd:string,
    #                   Message: xsd:string, ProcessId: xsd:string)*/
    function ccmovelmultiplesign(client, args){
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
        request_data = {
            'request': {
                'ApplicationId': args.applicationId.encode('UTF-8'),
                'Pin': args.pin,
                'UserId': args.user
            },
            'documents': {
                'HashStructure': [
                    {'Hash': sha256('Nobody inspects the spammish repetition'),
                     'Name': 'docname teste1', 'id': '1234'},
                    {'Hash': sha256('Always inspect the spammish repetition'),
                     'Name': 'docname teste2', 'id': '1235'}
                    ]}
        }

        return client.CCMovelMultipleSign(request_data.request, function(err, result, rawResponse, soapHeader, rawRequest) {
                    return result
               })
    }

    /*# ValidateOtp(code: xsd:string, processId: xsd:string, applicationId:
        #                      xsd:base64Binary) -> ValidateOtpResult: ns2:SignResponse
        # ns2:SignResponse(ArrayOfHashStructure: ns2:ArrayOfHashStructure,
        #                          Signature: xsd:base64Binary, Status: ns2:SignStatus)
        # ns2:ArrayOfHashStructure(HashStructure: ns2:HashStructure[])
        # ns2:HashStructure(Hash: xsd:base64Binary, Name: xsd:string, id: xsd:string)
        # ns2:SignStatus(Code: xsd:string, Field: xsd:string, FieldValue: xsd:string,
        #                                   Message: xsd:string, ProcessId: xsd:string)*/
        function validate_otp(client, args){
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
            request_data = {
                'applicationId': args.applicationId.encode('UTF-8'),
                'processId': args.ProcessId,
                'code': args.OTP,
            }
            
            return client.ValidateOtp(request_data.request, function(err, result, rawResponse, soapHeader, rawRequest) {
                return result
            })
        }