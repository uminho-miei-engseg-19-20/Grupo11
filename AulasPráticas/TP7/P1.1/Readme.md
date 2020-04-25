## P1.1
Verifique o que ocorre no mesmo programa escrito em Java (LOverflow2.java), Python (LOverflow2.py) e C++ (LOverflow2.cpp), executando-os.

Explique o comportamento dos programas.

### Java - LOverflow2.java
```java
import java.util.Scanner;
public class LOverflow2
{
  public static void main(String[] args)
  {
    int[] tests = new int[10];
    int test;
    int count;
    Scanner scan = new Scanner(System.in);

    System.out.print("Quantos números? ");
    count = scan.nextInt();
    for (int i =0 ; i < count; i++)
    {
    	System.out.print("Introduza número: ");
   	test  = scan.nextInt();
    	tests[i]= test;
    }
  }
}
```
Neste programa o primeiro input pedido, que corresponde à quantidade de número que queremos inserir, representa um potencial problema. Visto que o buffer (variável `tests`) apenas suporta 10 inteiros se o input for maior que 10 vai causar um **Buffer Overflow** pois o tamanho nunca é verificado.

A partir do momento que esse input é maior que 10, quando o utilizador introduz o 11º número vai lançar a exceção:
```java
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 10
	at LOverflow2.main(LOverflow2.java:17)
```
Quando tentamos introduzir um número demasiado elevado para a quantidade de números a inserir lança uma exceção:
```
Exception in thread "main" java.util.InputMismatchException: For input string: "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
	at java.base/java.util.Scanner.nextInt(Scanner.java:2264)
	at java.base/java.util.Scanner.nextInt(Scanner.java:2212)
	at LOverflow2.main(LOverflow2.java:12)
```

### Python - LOverflow2.py
```python
tests=[None]*10
count = input("Quantos numeros? ")
for i in range (0,count-1):
    test = input ("Insira numero: ")
    tests[i]=test
```
No programa acima, começamos por alocar um buffer até 10 objetos. Depois, mais uma vez, pedimos um input que corresponde à quantidade de números que queremos inserir. Mais um vez, este input não é verificado.

Tal como no programa em Java, ao introduzirmos o 11º número obtemos:
```
Traceback (most recent call last):
  File "LOverflow2.python", line 5, in <module>
    tests[i]=test
IndexError: list assignment index out of range
```

Quando tentamos introduzir um número demasiado elevado para a quantidade de números a inserir lança uma exceção:
```
Traceback (most recent call last):
  File "LOverflow2.python", line 3, in <module>
    for i in range (0,count-1):
OverflowError: range() result has too many items
```
### C++ - LOverflow2.cpp
```
#include <iostream>

using namespace std;

int main(void) {
    int test = 1;
    int  tests[10];
    int num_elems;

   cout << "Quantos números? ";
   cin >> num_elems;
   
    for (int i = 0; i < num_elems; i++) {  
      cout << "Insira número: ";
      cin >> test;
      tests[i] = test;
    }

    return 0;
}
```
No programa em cima vemos o mesmo problema explicitado nas outras duas linguagens.

Quando introduzimos o 11º elemento obtemos:

```
[1]    32079 abort      ./a.out
```

Se introduzirmos um número demasiado elevado para a quantidade de números o programa entra num loop infinito onde apenas imprime a mensagem "Insira número: ", sem nos deixar introduzir nenhum valor.
