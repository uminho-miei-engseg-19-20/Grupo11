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
    return prefix.hashtype + hash
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
    return client.service.GetCertificate(request_data.applicationId, request_data.userId)
}