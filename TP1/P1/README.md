. Números aleatórios/pseudoaleatórios
Experiência 1.1

Execute o seguinte comando, que gera 1024 bytes pseudoaleatórios: openssl rand -base64 1024
Pergunta P1.1

Teste os seguintes comandos, que vão obter 1024 bytes pseudoaleatórios do sistema e os apresentam em base64:

    head -c 32 /dev/random | openssl enc -base64
    head -c 64 /dev/random | openssl enc -base64
    head -c 1024 /dev/random | openssl enc -base64
    head -c 1024 /dev/urandom | openssl enc -base64

Que conclusões pode tirar? Em que se baseia para essas conclusões ?
Pergunta P1.2

O haveged - http://www.issihosts.com/haveged/index.html - é um daemon de entropia adaptado do algoritmo HAVEGE (HArdware Volatile Entropy Gathering and Expansion) - http://www.irisa.fr/caps/projects/hipsor/ -.

Instale a package haveged na máquina virtual com o seguinte comando: sudo apt-get install haveged.

Teste novamente os seguintes comandos, que vão obter 1024 bytes pseudoaleatórios do sistema e os apresentam em base64:

    head -c 1024 /dev/random | openssl enc -base64
    head -c 1024 /dev/urandom | openssl enc -base64

Que conclusões pode tirar? Em que se baseia para essas conclusões ?
Experiência 1.2

O exemplo utilizando o java.security.SecureRandom visto na aula, encontra-se na diretoria das aulas (Aula2/PseudoAleatorio), no ficheiro RandomBytes.java.

Analise, compile e execute este exemplo.

Nota: Se tiver problemas com a versão do java ou javac execute os seguintes comandos:

    sudo update-alternatives --config java
    sudo update-alternatives --config javac

e escolha a versão 9/Oracle.
Experiência 1.3

Na diretoria das aulas (Aula2/PseudoAleatorio) encontra o ficheiro generateSecret-app.py baseado no módulo eVotUM.Cripto (https://gitlab.com/eVotUM/Cripto-py), já instalado na máquina virtual em /home/user/API/Cripto-py/eVotUM/Cripto.

    Analise e execute esse programa de geração de segredo aleatório e indique o motivo do output apenas conter letras e dígitos (não contendo por exemplo caracteres de pontuação ou outros).
    O que teria de fazer para não limitar o output a letras e dígitos?
