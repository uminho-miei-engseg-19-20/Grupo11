#include<stdio.h>
#include<stdlib.h>

int main(int argc, char **argv){
    int control;
    char buffer[64];
    printf("PROGRAM: You win this game if you can change variable control'\n");

    printf("Let's do this\n");
    printf("Atacker: variável control: %p\n",&control);
    printf("Atacker: variável buffer: %p\n", buffer);

    control = 0;
    gets(buffer);

    if(control != 0) {
        printf("PROGRAM: YOU WIN!!!\n");
    } else {
        printf("PROGRAM: Try again...\n");
    }
}
