# Exercício 4 - Vulnerable Components

## Pergunta 4.1

### Passo 5
Neste passo temos de testar 2 componentes diferentes e verificar as suas diferenças.

#### jquery-ui:1.10.4
Introduzimos na caixa de texto o script: `<script>alert('XSS')</script>`

Depois vemos que o script é de facto executado.

#### jquery-ui:1.12.0 (Not Vulnerable)
Introduzimos na caixa de texto o script: `<script>alert('XSS')</script>`

Depois vemos que o script não é executado.

### Passo 12
Para este passo teríamos de introduzir:

```xml
<contact>
    <java.lang.Integer>1</java.lang.Integer>
    <firstName>Bruce</firstName>
    <lastName>Mayhew</lastName>
    <email>webgoat@owasp.org</email>  
</contact>
```
