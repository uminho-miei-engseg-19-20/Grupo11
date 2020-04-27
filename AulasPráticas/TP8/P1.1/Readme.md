# Pergunta 1.1

#### 1)

A vulnerabilidade da função está relacionada com o overflow de inteiros.
Na função `vulneravel` não verifica se o tamanho dos dados do tipo size_t: `x` e `y`, que são utilizados para alocar o espaço referente à matriz. Isto pode permitir ao programa escrever em locais de memória que não foram alocados para a matriz e forçar o programa a parar.

#### 2)

Para verificar esta vulnerabilidade foi alterada a função *main* de modo a que o valor de `x*y` seja superior ao valor máximo de um `size_t`:
``` 
int main()
{
	char *matrix;
	vulneravel(matrix,100000000,100000000,'a');
}```
```
#### 3)

Ao executar a função _vulneravel_ com as alterações feitas no main(), obtemos o erro _Segmentation fault_

![](../imagens/1_1.png)
