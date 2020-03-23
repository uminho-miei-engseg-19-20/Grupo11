# Pergunta 1 - Construindo uma blockchain
Este exercício é composto por duas questões mais pequenas. 

* [Pergunta 1.1](#pergunta-11)
    
    Alterar o método `Genesis Block` de modo a que o timestamp seja a data e dia de hoje e o dado incluído nesse Bloco seja "Bloco inicial da koreCoin"

* [Pergunta 1.2](#pergunta-12)
    
    Adicionar blocos simulando várias transações em cada um deles.

Em ambas as perguntas tivemos como base o ficheiro construído na Experiência 1.1 e consequentemente no artigo lá apresentado.

## Pergunta 1.1
Para isto teríamos de aceder à classe **Blockchain**. 

Após isso o método será alterado de modo a dar o dia e a hora da criação do bloco:

```js
createGenesisBlock(){
    return new Block(0,this.creatingNewTimestamp(),
        "Bloco inicial da koreCoin", "0");
}
```

sendo que: 

```js
creatingNewTimestamp(){
    var today = new Date();
        
    var date = today.getFullYear() + '-' +
        (today.getMonth() + 1) + '-'
        + today.getDate();
        
    var time = today.getHours() + ":" + 
        today.getMinutes() + ":" + 
        today.getSeconds();
        
    var dateTime = date + ' ' + time;
    return dateTime;
} 
```

Com isto, quando vamos ver o bloco inicial da Blockchain:
```json
Block {
    "index": 0,
    "timestamp": "2020-3-20 13:23:58",
    "data": "Bloco inicial da koreCoin",
    "previousHash": "0",
    "hash": "35d48461db193c1ac3c3f44722be169d05bf2e76159146a980734c8835e00f92" }
```
Vemos que tanto os dados como o timestamp foram alterados.

## Pergunta 1.2
Na segunda pergunta tínhamos de criar alguns blocos simulando transações entre eles:

```js
koreCoin.addBlock(new Block(4,koreCoin.creatingNewTimestamp(),{amount: 150}));
koreCoin.addBlock(new Block(5,koreCoin.creatingNewTimestamp(),{amount: 40, Block1: 10}));
koreCoin.addBlock(new Block(6,koreCoin.creatingNewTimestamp(),{amount: 10, Block2: 23}));
koreCoin.addBlock(new Block(7,koreCoin.creatingNewTimestamp(),{amount: 90, Block3: 60}));
```
