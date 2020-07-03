const axios = require('axios-https-proxy-fix');

/**
 * @param {object} opts easy-soap-request options
 * @param {string} opts.url endpoint URL
 * @param {object} opts.headers  HTTP headers, can be string or object
 * @param {string} opts.xml SOAP envelope, can be read from file or passed as string
 * @param {int} opts.timeout Milliseconds before timing out request
 * @param {object} opts.proxy Object with proxy configuration
 * @promise response
 * @reject {error}
 * @fulfill {body,statusCode}
 * @returns {Promise.response{body,statusCode}}

*/
function soapRequest(opts = {
  url: '',
  headers: {},
  xml: '',
  timeout: 10000,
  proxy: false,
}) {
  const {
    url,
    headers,
    xml,
    timeout,
    proxy,
  } = opts;
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      headers,
      data: xml,
      timeout,
      proxy,
    }).then((response) => {
      resolve({
        response: {
          headers: response.headers,
          body: response.data,
          statusCode: response.status,
        },
      });
    }).catch((error) => {
      if (error.response) {
        console.error(`SOAP FAIL: ${error}`);
        reject(error.response.data);
      } else {
        console.error(`SOAP FAIL: ${error}`);
        reject(error);
      }
    });
  });
};


// *------------------------------------------------ getCertificate ------------------------------------------------* //
/** 
* @param {String} user_id número de telemóvel do utilizador
* @param {String} application_id id da aplicação
* @returns {String} xml com o pedido  
*/
function getCertificateXML(user_id, application_id) {
    xml = '<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/">' + 
    '<soap-env:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">' +
       '<wsa:Action>http://Ama.Authentication.Service/CCMovelSignature/GetCertificate</wsa:Action>' +
       '<wsa:MessageID>urn:uuid:66edc9ce-8b57-432c-8b32-37454755566a</wsa:MessageID>' + 
       '<wsa:To>https://preprod.cmd.autenticacao.gov.pt/Ama.Authentication.Frontend/CCMovelDigitalSignature.svc</wsa:To>' +
    '</soap-env:Header>' +
    '<soap-env:Body>' + 
       '<ns0:GetCertificate xmlns:ns0="http://Ama.Authentication.Service/">' + 
          '<ns0:applicationId>' + String(application_id) + '</ns0:applicationId>' + 
          '<ns0:userId>' + String(user_id) + '</ns0:userId>'+
       '</ns0:GetCertificate>' + 
    '</soap-env:Body>' + 
 '</soap-env:Envelope>';
    console.log(xml)
    return xml;
};

/** 
* @param {String} user_id número de telemóvel do utilizador
* @param {String} application_id id da aplicação
* @returns {Object} response com a resposta ao pedido  
*/
async function getCertificateRequest(user_id, application_id) {
    const xml = getCertificateXML(user_id, application_id);
    const url = 'https://preprod.cmd.autenticacao.gov.pt/Ama.Authentication.Frontend/CCMovelDigitalSignature.svc';
    const sampleHeaders = {
        'Content-Type': 'text/xml;charset=UTF-8',
        SOAPAction: 'http://Ama.Authentication.Service/CCMovelSignature/GetCertificate',
    };

    const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 });
    const { headers, body, statusCode } = response;
    //console.log(statusCode);
    //console.log(headers);
    console.log(body);
    
    return response;
};
// *------------------------------------------------ getCertificate ------------------------------------------------* //

// *------------------------------------------------ CCMovelSignature ----------------------------------------------* //
/** 
* @param {String} user_id número de telemóvel do utilizador
* @param {String} application_id id da aplicação
* @param {String} docname nome do documento a ser assinado
* @param {String} hash tipo de hash
* @param {String} cmd_pin pin da chave móvel digital
* @returns {String} xml com o pedido  
*/
function getCCMovelSignXML(user_id,application_id, docname, hash,cmd_pin) {
    xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ama="http://Ama.Authentication.Service/" xmlns:ama1="http://schemas.datacontract.org/2004/07/Ama.Structures.CCMovelSignature">' + 
    '<soapenv:Header/>' + 
    '<soapenv:Body>' + 
       '<ama:CCMovelSign>' + 
          '<!--Optional:-->' + 
          '<ama:request>' + 
             '<ama1:ApplicationId>' + String(application_id) + '</ama1:ApplicationId>' + 
             '<!--Optional:-->'
             '<ama1:DocName>' + String(docname) + '</ama1:DocName>' + 
             '<ama1:Hash>' + String(hash) + '</ama1:Hash>' + 
             '<ama1:Pin>' + String(cmd_pin) + '</ama1:Pin>' + 
             '<ama1:UserId>' + String(user_id) + '</ama1:UserId>' +
          '</ama:request>' + 
       '</ama:CCMovelSign>' + 
    '</soapenv:Body>' + 
 '</soapenv:Envelope>';
    return xml;
}

/** 
* @param {String} user_id número de telemóvel do utilizador
* @param {String} application_id id da aplicação
* @param {String} docname nome do documento a ser assinado
* @param {String} hash tipo de hash
* @param {String} cmd_pin pin da chave móvel digital
* @returns {String} response com o documento assinado   
*/
async function CCMovelSignRequest(user_id,application_id, docname, hash,cmd_pin) {
    const xml = getCCMovelSignXML(user_id,application_id, docname, hash,cmd_pin);
    
    const url = 'https://preprod.cmd.autenticacao.gov.pt/Ama.Authentication.Frontend/CCMovelDigitalSignature.svc';
    
    //const sampleHeaders = {
    //    'Content-Type': 'text/xml;charset=UTF-8',
    //    SOAPAction: 'http://Ama.Authentication.Service/CCMovelSignature/GetCertificate',
    //};

    const sampleHeaders = {
        'Content-Type': 'text/xml;charset=UTF-8',
        SOAPAction: null,
    };

    const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 });
    const { headers, body, statusCode } = response;
    //console.log(headers);
    console.log(body);
    //console.log(statusCode);
    return response;
};
// *------------------------------------------------ CCMovelSignature -----------------------------------------------* //

// *------------------------------------------------ CCMovelMultSignature -------------------------------------------* //
/** 
* @param {String} hash hash 
* @param {String} name id da aplicação
* @param {String} id nome do documento a ser assinado
* @returns {String} xml com o pedido  
*/
function getMultSignHashStructures(hash,name,id) {
    xml = '<ama1:HashStructure>' + 
            '<ama1:Hash>' + String(hash) + '</ama1:Hash>' + 
            '<ama1:Name>' + String(name) + '</ama1:Name>' + 
            '<ama1:id>' + String(id) + '</ama1:id>' +
        '</ama1:HashStructure>'
    
        return xml
}

/** 
* @param {String} user_id número de telemóvel do utilizador
* @param {String} application_id id da aplicação
* @param {String} docname nome do documento a ser assinado
* @param {String} hash tipo de hash
* @param {String} cmd_pin pin da chave móvel digital
* @param {Array} pre_struct array com objetos compostos por hash, name e id
* @returns {String} xml com o pedido  
*/
function getCCMovelMultSignXML(user_id,application_id, docname, hash,cmd_pin, pre_struct) {
    let hash_struct = ''
    pre_struct.forEach(element => {
        hash_struct += getMultSignHashStructures(element.hash, element.name, element.id)
    });
    
    xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ama="http://Ama.Authentication.Service/" xmlns:ama1="http://schemas.datacontract.org/2004/07/Ama.Structures.CCMovelSignature">' + 
    '<soapenv:Header/>' + 
    '<soapenv:Body>' + 
       '<ama:CCMovelMultipleSign>' + 
          '<!--Optional:-->' +
          '<ama:request>' + 
             '<ama1:ApplicationId>' + String(application_id) + '</ama1:ApplicationId>' + 
             '<ama1:Pin>' + String(cmd_pin) + '</ama1:Pin>' + 
             '<ama1:UserId>' + String(user_id) + '</ama1:UserId>' +
          '</ama:request>' + 
          '<!--Optional:-->' + 
          '<ama:documents>' + 
             '<!--Zero or more repetitions:-->' + 
                hash_struct + 
          '</ama:documents>' + 
       '</ama:CCMovelMultipleSign>' + 
    '</soapenv:Body>' + 
 '</soapenv:Envelope>'
    return xml;
}

/** 
* @param {String} user_id número de telemóvel do utilizador
* @param {String} application_id id da aplicação
* @param {String} docname nome do documento a ser assinado
* @param {String} hash tipo de hash
* @param {String} cmd_pin pin da chave móvel digital
* @returns {String} response com o documento assinado   
*/
async function CCMovelMultSignRequest(user_id,application_id, docname, hash,cmd_pin) {
    const xml = getCCMovelMultSignXML(user_id,application_id, docname, hash,cmd_pin);
    
    const url = 'https://preprod.cmd.autenticacao.gov.pt/Ama.Authentication.Frontend/CCMovelDigitalSignature.svc';
    
    //const sampleHeaders = {
    //    'Content-Type': 'text/xml;charset=UTF-8',
    //    SOAPAction: 'http://Ama.Authentication.Service/CCMovelSignature/GetCertificate',
    //};

    const sampleHeaders = {
        'Content-Type': 'text/xml;charset=UTF-8',
        SOAPAction: null,
    };

    const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 });
    const { headers, body, statusCode } = response;
    //console.log(headers);
    console.log(body);
    //console.log(statusCode);
    return response;
};

// *------------------------------------------------ CCMovelMultSignature -------------------------------------------* //

// *------------------------------------------------ ValidateOTP ----------------------------------------------------* //
/** 
* @param {String} ama_code código do ama
* @param {String} process_id id do processo
* @param {String} application_id id da aplicação
* @returns {String} xml com o pedido  
*/
function getValidateOTPXML(ama_code,process_id, application_id) {
    xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ama="http://Ama.Authentication.Service/">' + 
    '<soapenv:Header/>' + 
    '<soapenv:Body>' + 
       '<ama:ValidateOtp>' + 
          '<!--Optional:-->' + 
          '<ama:code>' + String(ama_code) + '</ama:code>' + 
          '<!--Optional:-->' + 
          '<ama:processId>' + String(process_id) + '</ama:processId>'
          '<!--Optional:-->'
          '<ama:applicationId>' + String(application_id) + '</ama:applicationId>' + 
       '</ama:ValidateOtp>' + 
    '</soapenv:Body>' +
 '</soapenv:Envelope>';
    return xml;
}

/** 
* @param {String} ama_code código do ama
* @param {String} process_id id do processo
* @param {String} application_id id da aplicação
* @returns {String} response com o documento assinado   
*/

async function validateOTPRequest(ama_code, process_id, application_id) {
    const xml = getValidateOTPXML(ama_code, process_id, application_id);
    
    const url = 'https://preprod.cmd.autenticacao.gov.pt/Ama.Authentication.Frontend/CCMovelDigitalSignature.svc';
    
    //const sampleHeaders = {
    //    'Content-Type': 'text/xml;charset=UTF-8',
    //    SOAPAction: 'http://Ama.Authentication.Service/CCMovelSignature/GetCertificate',
    //};

    const sampleHeaders = {
        'Content-Type': 'text/xml;charset=UTF-8',
        SOAPAction: null,
    };

    const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 });
    const { headers, body, statusCode } = response;
    //console.log(headers);
    console.log(body);
    //console.log(statusCode);
    return response;
};
// *------------------------------------------------ ValidateOTP ----------------------------------------------------* //

module.exports.getCertificateRequest= getCertificateRequest
module.exports.CCMovelSignRequest= CCMovelSignRequest
module.exports.CCMovelMultSignRequest = CCMovelMultSignRequest
module.exports.validateOTPRequest = validateOTPRequest

