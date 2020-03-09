### P2.1

#### 1. Resultados da análise de www.nos.pt e www.edp.com

[edp](./edp.pdf)
[nos](./nos.pdf)

#### 2. 

O pior servidor é o da empresa NOS obtendo uma classificação B. 
Como é possível analisar nos ficheiros em anexo, o site não usa a versão mais recente do TLS 1.3 e permite o uso da sua versão mais antiga 1.1 e 1.0 sendo esta a principal razão da atribuição da classificação B.

Em relação ao certificado do site podemos ver que este possui um certificado transparente e de confiança e que não possui DNS CAA.

De seguida podemos ver que no caso das Cipher Suites para TLS 1.2 temos 4 opções fortes de cifras e 16 fracas. Este número elevado de Cipher Suites deve-se a vários motivos: 
 - uso do modo CBC em vez do modo GCM;
 - uso de SHA em vez de SHA256 ou SHA384;
 - uso de RSA em vez de ECDHE.  

#### 3: OpenSSL CCS vuln. (CVE-2014-0224) na secção de detalhe do protocolo

OpenSSL é uma implementação do protocolo de criptografia SSL / TLS usado para
proteger a privacidade da comunicação na Internet.

OpenSSL CCS vuln. (CVE-2014-0224) é uma vulnerabilidade que afeta o OpenSSL
cryptographic software library, mais concretamente as seguintes versões:

 - Versions before 0.9.8za;
 - 1.0.0 before 1.0.0m;
 - 1.0.1 before 1.0.1h


Estas versões são afetadas uma vez que não restringe adequadamente o processamento
de mensagens ChangeCipherSpec, o que permite que ataques man-in-the-middle
acionem o uso de zero-length master key e, consequentemente, sequestrem sessões ou
obtenham informações confidenciais por meio de crafted TLS handshake, também
conhecido como vulnerabilidade "Injeção CCS".
