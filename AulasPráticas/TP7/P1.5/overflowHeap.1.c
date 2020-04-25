#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(int argc, char **argv) {
    char *dummy = (char *) malloc (sizeof(char) * 10);
    char *readonly = (char *) malloc (sizeof(char) * 10);
    
    strcpy(readonly, "laranjas");
    //Se a string for maior que o tamanho do buffer, truncamos a string apresentando os x primeiros caracters,
    //onde x é o tamanho do buffer. Fazemos isto colocando o caracter que representa o fim de uma string na posição
    // x do array
    if(sizeof(argv[1]) > 10 ) {
      argv[1][10] = '\0'
    }
    strcpy(dummy, argv[1]);
    printf("%s\n", readonly);
}
