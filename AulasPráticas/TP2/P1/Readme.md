# Exercício P1.1

## Como utilizar
Para podermos testar o resultado das alterações efectuadas temos de compilar os programas por ordem das operações do Blind Signing:
* Inicialização (`init-app.py`)
* Ofuscar (`ofusca-app.py`)
* Assinatura (`blindSignature-app.py`)
* Desofuscar (`desofusca-app.py`)
* Verificar (`verify-app.py`)

## Inicialização
O processo de inicialização é executado com `python init-app.py -init`. Este processo gera os parâmetros iniciais e a componente **pRDash**.
Ambos os parâmetros serão imprimidos no terminal e serão guardados no ficheiro 'assinante.json'.

## Ofuscar
Este processo é executado por `python ofusca-app.py -msg <Mensagem> -RDash <pRDashComponents>`, onde:
* **Mensagem** correponde ao caminho para um ficheiro de texto com a mensagem a ser ofuscada.
* **pRDashComponents** corresponde aos parâmetros gerados no processo anterior. Podemos ir buscar esse valor ao terminal (visto que foi imprimido) ou ao ficheiro Assinante.json

Este vai imprimir a mensagem ofuscada e irá guarda-la no ficheiro 'requerente.json'. Além deste valor , iremos guardar a componente de ofuscar (BlindComponents) e a componete pR (pRComponents).

## Assinatura
Este processo é executado por `python blindSignatue-app.py -key <Key> -bmsg <blindMsg>`, onde:
* **Key** corresponde ao caminho para a o ficheiro.pem que contém a chave.
* **blindMsg**  corresponde à mensagem ofuscada obtido pelo processo anterior.

Irá imprimir a assinatura da mensagem ofuscada e irá guardar no ficheiro Assinante.json

## Desofuscar
`python desofusca.py -s <blindSig> -RDash <pRDashComps>`, onde:
* **blindSig** corresponde à assinatura da mensagem ofuscada, obtido no processo anterior.
* **pRDashComps** corresponde às componetes pRDash , obtidas no primeiro processo e guardados no ficheiro assinante.json

Irá imprimir a assinatura da mensagem sem o efeito de ofuscar e irá guarda-la no ficheiro 'requerente.json'.
## Verificar
Este último processo é executado com `python verify-app.python -cert <Cert> -msg <MensagemOriginal> -SDash <Signature> -f <ficheiroRequerente>`
* **Cert** é o caminho para o certificado da entidade que assinou a mensagem com a sua chave privada 
* **MensagemOriginal** é o caminho para o ficheiro com o texto original
* **Signature** é a assinatura do texto "limpo" obtido no processo anterior
* **ficheiroRequerente** é o caminho para o ficheiro 'requerente.json' onde terá valores de componentes necessárias. 
