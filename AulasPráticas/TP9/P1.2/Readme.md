# P1.2
## Enunciado
Desenvolva um programa (na linguagem em que tiver mais experiência) que pede:

*    valor a pagar,
*    data de nascimento,
*    nome,
*    número de identificação fiscal (NIF),
*    número de identificação de cidadão (NIC),
*    numero de cartão de crédito, validade e CVC/CVV.

Valide esse input de acordo com as regras de validação "responsável", apresentadas na aula teórica.

## Solução
Para responder ao enunciado apresentado foi implementado um ficheiro em Python.

### Valor a pagar
Neste método pedimos um valor ao utilizador. De forma a validar o input dele nós tentamos converter a string vinda do input em um float.

Este método tem o nome de `askValue()`.

### Data de nascimento
Para solucionar este problema e de modo a facilitar a validação do input, são pedidos ao cliente três inputs diferentes: primeiro o ano, depois o mês e depois o dia.
Após a introdução de cada input é executada uma validação do input:
* **ano** - Converter para inteiro
* **mes** - Converter para inteiro e no intervalo ]0,13[
* **dia** - Converter para inteiro e verificar se esse dia existe mesmo (por exemplo, não aceitar 31 de Abril ou não aceitar 29 de Fevereiro em anos não bissextos).

Este método tem o nome de `askBirthday()` e lá são chamados os métodos auxiliares.

### Nome
Para validarmos o nome de um cliente, declaramos uma lista que continha todos os caracteres não permitidos num nome para evitar corrupção de dados:
```
['§','±','!','"','@','€','#','%','&','/','(',')','=','?','*','+','|','<','>','_','1','2','3','4','5','6','7','8','9','0']
```
Assim vamos ao input dado pelo utilizador e vamos ver se algum caractér do seu nome tem um caracter não permitido. Além disso o tamanho máximo de input é de 65 char. 

O método é o `askName()`.

### Número de identificação fiscal (NIF)
Para o NIF verificamos se o input tem 9 caracteres e se este é convertível para inteiro.

O método é o `askNIF()`.

### Número de identificação de cidadão (NIC)
Para o NIC existe uma validação um pouco mais robusta devido ao formato que este tem - 9 números, 1 espaço, 1 número, 2 letras, 1 número:
```
123456789 1XX1
```
Assim começamos por tentar converter os 9 primeiros número em um inteiro. Depois verificamos se existe o espaço. Após isso convertemos o primeiro caracter seguinte em inteiro, e verificamos as 2 letras com o auxílio da lista de caractéres inválidos. Por fim convertemos o último caracter em número.

O método é o `askNIC()`.

### Número de cartão de crédito, validade e CVC/CVV
Neste último exercício assumos que os cartões de crédito têm o seguinte formato:
* **número do cartão de crédito** : `1234 5678 9012 3456` ou `1234567890123456`
* **validade** : `11-11` ou `11/11`
* **CVV** : `111`

Tal como no aniversário cada componente é pedida num input diferente (para facilitar as validações). 

O método é o `askCreditCard()`. 
