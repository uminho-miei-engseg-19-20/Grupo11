# Pergunta 4
## 4.1)
Após gravar o conteúdo do Base 64-encoded do certificado da medisign eIDAS Zertifikate (Alemanha) no ficheiro chamado *mesig-hba.pem*, 
executamos o comando `openssl x509 -in mesig-hba.pem -text -noout` para obter mais informações a respeito do certificado.
```
$ openssl x509 -in mesig-hba.pem -text -noout
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 2788297074907415469 (0x26b2056aa61e03ad)
    Signature Algorithm: sha512WithRSAEncryption
        Issuer: C=DE, O=medisign GmbH, CN=medisign Root 1:PN
        Validity
            Not Before: Jun 14 07:56:53 2017 GMT
            Not After : Mar 31 11:00:00 2037 GMT
        Subject: C=DE, O=medisign GmbH, CN=MESIG.HBA-qCA 1:PN
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:b8:59:47:42:68:c8:7e:ce:2f:e0:1d:22:f7:b9:
                    7b:f4:ce:5d:08:d8:e0:bb:87:dd:af:9f:c0:38:0f:
                    f4:e9:75:54:88:c0:70:f5:9d:74:82:7b:a4:f6:59:
                    e6:bc:74:6b:42:1d:89:93:57:c8:1f:bd:92:fa:da:
                    8b:8f:13:bd:da:bc:34:1a:2d:32:21:eb:3c:d9:2e:
                    12:6b:f0:db:3a:ef:d0:21:7f:b1:b6:0b:bf:04:36:
                    ee:61:91:f0:4a:72:bb:ff:15:cf:26:46:3e:46:96:
                    b3:0d:9b:93:12:ba:ac:0a:b2:52:02:b7:41:72:2b:
                    da:85:e5:e1:75:16:da:cf:dd:44:5e:b4:7f:28:e4:
                    52:05:f4:a7:2a:4f:f1:9f:f1:b9:0b:c8:42:6e:b0:
                    80:ca:72:fb:b4:4e:70:42:99:4e:30:52:84:55:9a:
                    0e:ba:a4:60:ca:cc:d0:47:2e:58:64:7d:0f:a7:78:
                    9b:a6:34:b2:27:06:ca:04:39:3b:4d:71:99:a1:c1:
                    40:9f:9d:8e:89:e8:f9:ce:2f:6d:d8:ad:bc:18:4f:
                    96:0c:59:34:ff:fc:72:7b:d2:14:45:60:15:df:70:
                    fb:af:41:05:da:5b:5e:c0:36:46:f8:26:64:1d:3c:
                    92:ee:b6:82:70:d6:62:a6:28:de:92:5c:79:da:64:
                    cb:bd
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Basic Constraints: critical
                CA:TRUE, pathlen:0
            X509v3 Authority Key Identifier:
                keyid:EB:6A:2E:2E:AE:70:90:3B:05:83:67:2C:FF:74:26:B2:81:01:5A:0F

            Authority Information Access:
                CA Issuers - URI:http://www.medisign.de/richtlinien
                OCSP - URI:http://rocsp-medisign.medisign.de:8080/ocsp

            X509v3 Certificate Policies:
                Policy: 1.3.6.1.4.1.15787.2.1.8.1
                  CPS: http://www.medisign.de/richtlinien
                Policy: 0.4.0.194112.1.2
                Policy: 1.2.276.0.76.4.145

            X509v3 Subject Key Identifier:
                15:99:8A:D8:13:28:6D:2B:47:11:40:34:B5:D3:80:56:FD:A7:4D:8D
            X509v3 Key Usage: critical
                Certificate Sign, CRL Sign
            qcStatements:
                0 0
..+.......0......F..0......F..
            1.3.6.1.4.1.8301.3.5:
                0..
+.....m...
    Signature Algorithm: sha512WithRSAEncryption
         1f:78:35:ca:12:5b:b3:6b:a9:d6:e9:bc:a5:13:fa:89:e6:7b:
         69:1d:17:20:ff:9b:e4:14:fc:cc:ae:23:70:68:b4:a8:1f:9e:
         7f:90:50:60:cb:8b:4a:4b:a1:67:28:0f:5f:a0:9e:10:06:20:
         db:8d:0d:14:8d:75:1f:08:d5:45:b4:eb:ab:33:18:a0:a7:81:
         63:0a:1f:81:a6:72:90:a0:e5:41:cd:a5:8a:22:92:fd:74:b3:
         e8:19:e7:4c:15:29:9b:90:9a:21:61:65:4b:d3:54:12:96:07:
         76:e4:67:01:73:89:f7:6a:95:a0:5e:2d:d2:cc:32:76:e7:f0:
         7f:ac:35:4b:e6:98:34:6c:d1:90:09:c8:d6:4a:cc:a7:17:6b:
         f7:4e:36:40:ad:3b:92:2c:2d:37:e1:86:da:39:90:f0:65:9e:
         9d:a4:49:00:34:db:bd:b5:78:2b:00:4b:31:1e:cc:69:ff:75:
         6c:92:89:03:57:74:ec:5e:35:bf:80:4b:e3:38:76:6f:7c:ba:
         3e:84:ad:f7:6c:49:fa:d2:e4:13:de:17:da:ba:9d:bd:9d:be:
         45:d7:85:d2:45:e6:27:d4:59:b9:72:64:12:fb:dd:e8:36:44:
         73:49:8d:11:c2:f3:d5:44:26:13:30:e6:96:d5:37:21:b8:a0:
         7d:69:bb:cd
```

Após uma breve análise ao output podemos ver os algoritmos e o tamanho das chaves utilizadas neste certificado sendo:
* **Signature Algorithm** - SHA512 com encriptação RSA (*sha512WithRSAEncryption*)
* **Public Key Algorithm** - encriptação RSA (*rsaEncryption*)
* **Tamanho das chaves** - *2048 bit*

### Conclusões
Começando pelo algoritmos de assinatura o NIST aconselha o uso de qualquer algoritmo da família SHA-2 (que inclui o algoritmo SHA512)
podendo assim afirmar que este é seguro.

Quanto ao algoritmo de chave pública este (neste momento) é seguro, visto que o NIST recomenda no mínimo uma chave de 2048 bit.
No entanto este certificado é válido até 2037, e o NIST diz que a partir de 2030 a chave deverá ter no mínimo 3072 bits. Assim sendo
daqui num período máximo de 10 anos este certficado terá de ser atualizado para ir de encontro às recomendações do NIST.
