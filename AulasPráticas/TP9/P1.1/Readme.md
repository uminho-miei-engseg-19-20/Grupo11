### 1
Os dois tipos de vulnerabilidades presentes neste código são as seguintes:

* Utilização da função **system** que permite a execução do programa passado como argumento, com as variáveis de ambiente do processo-pai. 
O utilizador vai passar ao programa uma string como argumento, que não é verificada, sendo assim, um atacante poderia utilizar esta função para correr comandos não autorizados.

* Não controlar os tipos de metacaracteres que podem ser aceites. Um atacante pode recorrer à injeção de separadores pelo metacarater ';' ou à injeção de separadores de pastas, conhecido como path traversal attack e então, com a ajuda do autocomplete, ficar a conhecer toda a estrutura de diretorias.

### 2

Para explorar a vulnerabilidade referente à função `system`, poderíamos recorrer ao código:

`./filetype "/etc/passwd"`

Onde o atacante iria ter acesso às passwords do sistema.

Já para explorar a vulnerabilidade referente à não validação dos metacaracteres inseridos, o atacante poderia recorrer ao metacarater ';' que permite correr vários comandos de uma vez. Neste exemplo corremos o comando ls, mas podíamos encadear mais comandos : 

`./filetype filename;ls`


Ou poderia ainda utilizar o *autocomplete* (através da tecla TAB) e ter acesso aos nomes dos ficheiros e diretórios de toda a estrutura.

### 3

Se o programa tivesse permissões `setuid root` passaria a ter permissões de root quando o programa fosse executado. O sistema ficaria
comprometido uma vez que permitiria a um utilizador com poucas permissões executar comandos como root para ter acesso à informações sensíveis.