## TP6 - Vulnerabilidades de codificação

## P1.1 - Common Weakness Enumeration (CWE)
Este exercício tem por base o **The CWE Top 25 de 2019** https://cwe.mitre.org/top25/ . No primeiro ponto deste exercício iremos
explicar as características das **três** primeiras *Weaknesses*, assim como explicitar em que linguagens e tecnologias são mais
prevalentes e quais as consequências mais comuns. Já o segundo ponto vai ser sobre a *Weakness* na posição 14 (11+3) do top 
onde vamos ter a mesma abordagem do ponto anterior e além disso exemplificar código e CVE que incluam esta *Weakness*.



### 1) Três primeiras *Weakness*
Ao acedermos ao link acima referido vemos que as três primeiras *Weakness* são: **CWE-119**, **CWE-79** e **CWE-20**.





#### CWE-119 : Improper Restriction of Operations within the Bounds of a Memory Buffer
Esta *weakness* **caracteríza-se** por

As **linguagens** mais afetadas por esta fraqueza são: C e C++. Estas pertencem à classe *Assembley*.

As **consequências** podem ser divididas em três grupos diferentes: **CIA** , **CA** , **C** .
* **CIA** - Afeta a *Confidencialidade*, *Integridade* e *Disponibilidade*. Isto acontece quando o atacante consegue de facto
controlar a memória a que acede. Com isto ele poderá executar código arbitrário ou mudar apontadores para uma função maliciosa.
* **CA** - Afeta a *Confidencialidade* e a *Disponibilidade*. Quando se tenta aceder a memória que não diz respeito ao programa
(out-of-bounds) é comum resultar em corrupção de memória resultante ou até crashes do sistema. 
* **C** - Afeta a *Confidencialidade*. Se o atacante conseguir aceder e ler dados da memória extra ao software (também um caso
de out-of-bounds) este poderá obter dados confidenciais.





#### CWE-79 : Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')
Esta *weakness* **caracteríza-se** por não existir, ou ser feita incorretamente, uma validação dos inputs user-controllable antes
de ser posto no output que será usada como página web veiculada a outros utilizadores.

As **linguagens** mais afetadas são as pertencentes à classe de **Linguagens-Independentes** - Linguagens com uma semântica e interface definida por e para um grupo de pessoas restrito.

As **tecnologias** mais afetadas são todas aquelas que pertencem à classe *Web Based*.

As **consequências** podem ser divididas em três grupos diferentes: **CAc** , **CIA** , **CIACa** .
* **CCa** - Afeta a *Confidencialidade* e o *Controlo de Acessos*. Acontece quando um utilizador constroi um script do lado do cliente
que realiza uma ação (como por exemplo enviar os cookies do site para um dado email). Este script irá ser carregado e corrido em
todos os clientes que visitam o site. Desde que o pedido da página ao servidor tenha acesso às cookies, o script também terá.
* **CIA** - Afeta a *Confidencialidade*, *Integridade* e a *Disponibilidade*. Acontece quando um utilizador consegue correr código
arbitrário no computador de uma vítima quando o Cross-site Scripting é combinado com algumas falhas.
* **CIACa** - Afeta a *Confidencialidade*, *Integridade*, *Disponibilidade* e o *Controlo de acessos*. Este tipo de ataques baseia-se
nos dois anteriores, diferenciando apenas o *payload* que chega ao servidor.





#### CWE-20 : Improper Input Validation
Esta *weakness* **caracteriza-se** por não existir, ou ser feita incorretamente, a validação de *inputs* que afetam o fluxo de controlo ou de dados do programa.

As **linguagens** mais afetadas são as pertencentes à classe de **Linguagens-Independentes** - Linguagens com uma semântica e interface definida por e para um grupo de pessoas restrito.

As **consequências** podem ser divididas em grupos diferentes: **A** , **C** , **CIA** .
* **A** - Afeta a *Disponibilidade*. Quando um atacante introduz valores não esperados que causam *crashes* ao sistema ou consumo
excessivo de recursos computacionais, quer de memória quer de CPU.
* **C** - Afeta a *Confidencialidade*. Quando um atacante consegue ler dados confidenciais, quando estes conseguem controlar
os recursos.
* **CIA** - Afeta a *Confidencialidade*, *Integridade*, *Disponibilidade* e o *Controlo de acessos*. Um atacante pode usar *inputs*
maliciosos para alteração de dados ou alteração do fluxo de controlo, incluindo execução de comandos arbitrários.







### 2) *Weakness* [14]
Na posição 14 do **The CWE Top 25 de 2019** temos a *Weakness*: **CWE-476**. 
#### CWE-476 : NULL Pointer Dereference
Esta *weakness* **caracteríza-se** por existir uma desreferenciação de um apontador que se espera ser válido, mas é NULL.
Este tipo de falhas leva a *crashes* ou saídas do programa e podem ser causadas por falhas como *race conditions* ou omissões
na programação.

As **linguagens** mais afetadas por esta fraqueza são: C , C++ , C# , Java .

As **consequências** podem ser divididas em grupos diferentes: **A** , **CIA** .
* **A** - Afeta a *Disponibilidade*. Acontece quando houve uma desreferenciação de um apontador o que resulta na falha do 
processo. Mesmo que exista uma *handle* da exceção pode ser díficil levar o Software para um estado seguro.
* **CIA** - Afeta a *Confidencialidade*, *Integridade*, *Disponibilidade* e o *Controlo de acessos*. Em circunstâncias e ambiente
muito raros, pode ser possível a execução de código arbitrário.

Um exemplo prático deste problema pode ser visto em:
```
void host_lookup(char *user_supplied_addr){
  struct hostent *hp;
  in_addr_t *addr;
  char hostname[64];
  in_addr_t inet_addr(const char *cp);

  /*routine that ensures user_supplied_addr is in the right format for conversion */

  validate_addr_form(user_supplied_addr);
  addr = inet_addr(user_supplied_addr);
  hp = gethostbyaddr( addr, sizeof(struct in_addr), AF_INET);
  strcpy(hostname, hp->h_name);
}
```
No pedaço de código apresentado em cima vemos que o utilizador tem de providenciar um endereço. Esta função começa por validar
a estrutura do endereço recebido do utilizador (`validate_addr_form(user_supplied_addr)`). Se este estiver bem formado a função
prossegue, porém este endereço poderá não ter nenhum *hostname* associado, por isso quando a função `gethostbyaddr()` for chamada
esta vai retornar NULL. A partir daí o `strcpy()` do *hostname* vai copiar apenas o NULL. Antes desta cópia deveria existir uma
verificação do valor do *hostname*.

A esta falha estão associados várias vulnerabilidades. Vamos analisar a vulnerabilidade **CVE-2005-3274**.

##### CVE-2005-3274
Esta vulnerabilidade caracteriza-se por existir uma *race conditions* no `ip_vs_conn_flush` em Linux 2.6 (versões antes da 2.6.13)
e Linux 2.4 (versões antes 2.4.32-pre2), quando são corridos sistemas SMP que permitem ao utilizadores locais causar *denial of services*,
devido à dereferenciação dos apontadores para NULL, que faz com que o tempo da conexão expire.
