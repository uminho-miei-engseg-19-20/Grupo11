# Exercício 2 - XSS

## Pergunta 2.1
Lição (A7) Cross-site Scripting. 

Passos da resolução

### Passo 1
Não é necessário nehuma ação.

### Passo 2
Na página do segundo passo abrir Consola Web (nas ferramentas de programação do browser).
Nessa consola vamos ver as cookies da sessão com `alert(document.cookie)`.

Depois abrir um novo separador com a mesma página, abrir outra vez a consola e aceder às cookies da mesma maneira. 

Por último temos de comparar os dados obtidos das duas páginas. 

(São os mesmos) 

### Passo 3
Não é necessário nenhuma ação, é apenas exposição de matéria:

#### Most common locations of XSS
* **Search fields** that echo a search string back to the user

* **Input fields** that echo user data
* **Error messages** that return user supplied text
* **Hidden fields** that contain user supplied data
* **Any page that displays user supplied data**
    * Message boards
    * Free form comments
* **HTTP Headers**

### Passo 4
Não é necessário nehuma ação.

#### Why should we care?
XSS attacks may result in: 
* Stealing session cookies
* Creating false requests
* Creating false fields on a page to collect credentials
* Redirecting your page to a "non-friendly" site
* Creating requests that masquerade as a valid user
* Stealing of confidential information
* Execution of malicious code on an end-user system (active scripting)
* Insertion of hostile and inappropriate content

XSS attacks add validity to phishing attacks:
* A valid domain is used in the URL

### Passo 5
Não é necessário nehuma ação.

#### Types of XSS
**Reflected**:
* Malicious content from a user request is displayed to the user in a web browser
* Malicious content is written into the page after from server response
* Social engineering is required
* Runs with browser privileges inherited from user in browser

**DOM-based** (also technically reflected):
* Malicious content from a user request is used by client-side scripts to write HTML to it own page
* Similar to reflected XSS
* Runs with browser privileges inherited from user in browser

**Stored or persistent**:
* Malicious content is stored on the server ( in a database, file system, or other object ) and later displayed to users in a web browser
* Social engineering is not required

### Passo 6
Não é necessário nehuma ação.

#### Reflected XSS scenario
Attacker sends a malicious URL to victim
* Victim clicks on the link that loads malicious web page
* The malicious script embedded in the URL executes in the victim’s browser
* The script steals sensitive information, like the session id, and releases it to the attacker

**Victim does not realize attack occurred**

### Passo 7
Na caixa de input 'Enter your credit card number:' injetamos o script: `<script>alert('Credit Card...')</script>` e clicamos
no *Purchase*. Vemos que uma alerta foi criado, podendo concluir assim que este é vulnerável a um ataque.


No caso de tentarmos fazer o mesmo na caixa de input `Enter your three digit access code:` vemos que esta está protegida:



### Passo 8

### Passo 9

### Passo 10

### Passo 11

### Passo 12
