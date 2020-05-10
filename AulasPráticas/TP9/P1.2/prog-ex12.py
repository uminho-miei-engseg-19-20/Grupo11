#usr/bin/python3
from datetime import datetime

#------------------------------------------ MÉTODOS E VARIÁVEIS ÚTEIS ------------------------------------------#
probElems = ['§','±','!','"','@','€','#','%','&','/','(',')','=','?','*','+','|','<','>','_','1','2','3','4','5','6','7','8','9','0']

def validateCharInputs(inputs):
    for letter in inputs:
        if(letter in probElems):
            print('Invalid Char!')
            return False
    return True
#------------------------------------------ MÉTODOS E VARIÁVEIS ÚTEIS ------------------------------------------#

#------------------------------------------ Valor a pagar ------------------------------------------#
'''
Método que pede um valor de pagamento. Este será do tipo float.
'''
def askValue():
    while(True):
        value = input('Please insert value: ')
        try:
            nvalue = float(value)
            return nvalue
        except:
            print('Wrong format! Please insert a number!')
#------------------------------------------ Valor a pagar ------------------------------------------#

#------------------------------------------ Aniversário ------------------------------------------#
def askYear():
    while(True):
        year = input('Please insert the year of your birth: ')
        try:
            nyear = int(year)
            return nyear
        except:
            print('Error in your year input! Please insert a number!')

def checkLeapYear(year):
    if (year % 4) == 0:
        if (year % 100) == 0:
            if (year % 400) == 0:
                return True
            else:
                return False
        else:
            return True
    else:
        return False
        

def askMonth():
    while(True):
        while(True):
            month = input('Please insert the month of your birth: ')
            try:
                nmonth = int(month)
                break
            except:
                print('Error in your month input! Please insert a number!')
        
        if(nmonth > 0 and nmonth < 13):
            return nmonth
        else:
            print('Error in your input! Please insert a number between 1 and 12!')


def askDay(month,year):
    m1 = [1,3,5,7,8,10,12]
    m2 = [4,6,9,11]
    if(checkLeapYear(year)):
        febday = 29
    else:
        febday = 28
    while(True):
        while(True):
            day = input('Please insert the day of your birth: ')
            try:
                nday = int(day)
                break
            except:
                print('Error in your day input! Please insert a number!')     
        if(month == 2):
            if(nday > 0 and nday < febday+1):
                return nday
            else:
                print('Your day value does not exist!')
        elif(month in m1):
            if(nday > 0 and nday < 32):
                return nday
            else:
                print('Your day value does not exist!')
        elif(month in m2):
            if(nday > 0 and nday < 31):
                return nday
            else:
                print('Your day value does not exist!')

def askBirthday():
    year = askYear()
    month = askMonth()
    day = askDay(month,year)
    
    date = str(day)+'-'+str(month)+'-'+str(year)
    return datetime.strptime(date,'%d-%m-%Y').date()
#------------------------------------------ Aniversário ------------------------------------------#

#------------------------------------------ Nome ------------------------------------------#
def askName():
    while(True):
        flag = 0
        name = input('Please insert your name: ')
        if(not(validateCharInputs(list(name)))):
            print('Error in name input! Please don\'t use invalid char!')
            flag = 1
        if(flag == 0 and len(name) > 0 and len(name) < 65):
            return name
#------------------------------------------ Nome ------------------------------------------#

#------------------------------------------ NIF ------------------------------------------#
def askNIF():
    while(True):
        nif = input('Please insert your NIF: ')
        if(len(nif) == 9):
            try:
                nnif = int(nif)
                return nnif
            except:
                print('Please insert a valid NIF! Error in characters')
        else:
            print('Please insert a valid NIF! Error in length.')
#------------------------------------------ NIF ------------------------------------------#

#------------------------------------------ NIC ------------------------------------------#        
def validateNIC(nic):
    '''
    123456789 1XX1
    '''
    try:
        partOne = int(nic[0:8])
        if(not(nic[9] == ' ')):
            return False
        partTwoOne = int(nic[10])
        if(not(validateCharInputs(nic[11:12]))):
           return False
        partTwoTwo = int(nic[13]) 
    except:
        return False
    return True

def askNIC():
    while(True):
        nic = input('Please insert your NIC (the correct format is 123456789 1XX1): ')
        if(validateNIC(nic)):
            return nic
        else:
            print('Error in input! The correct format is: 123456789 1XX1')
#------------------------------------------ NIC ------------------------------------------#

#------------------------------------------ CARTÃO DE CRÉDITO ------------------------------------------#
def validateCreditCardNumber(inputs):
    '''
    1234 5678 9012 3456
            or
    1234567890123456
    '''
    if(len(inputs) < 16 or len(inputs) > 19):
        print('Invalid length!')
        return False
    try:
        space = ' '
        if(space in inputs): # 1234 5678 91012 3456
            if(len(inputs) != 19):
                print('Invalid length!')
            nbOne = int(inputs[0:3])
            if(inputs[4] != space):
                return False
            nbTwo = int(inputs[5:8])
            if(inputs[9] != space):
                return False
            nbThree = int(inputs[10:13])
            if(inputs[14] != space):
                return False
            nbFour = int(inputs[15:18])
        else: #1234567890123456
            if(len(inputs) != 16):
                print('Invalid length!')
                return False
            nb = int(inputs)
    except:
        return False
    return True

def askNumberCreditCard():
    while(True):
        numbers = input('Please insert your Credit Card Number: ')
        if(validateCreditCardNumber(numbers)):
            return numbers
        else:
            print('Invalid Credit Card Number!')


def validateCreditCardValidThru(validThru):
    '''
        11-11
        11/11
    '''
    validSep = ['-','/']
    if(len(validThru)!= 5):
        print('Error in length!')
        return False
    try:
        partOne = int(validThru[0:1])
        if(not(validThru[2] in validSep)):
            return False
        partTwo = int(validThru[3:4])
        return True
    except:
        return False
    

def askCreditCardValidThru():
    while(True):
        cvt = input('Please insert your Credit Card Valid Thru: ')
        if(validateCreditCardValidThru(cvt)):
            return cvt
        else:
            print('Invalid Valid Thru!')

def validateCreditCardCVV(cvv):
    '''
        111
    '''
    if(len(cvv) != 3):
        print('Error in length')
        return False
    try:
        ncvv = int(cvv)
        return True
    except:
        return False

def askCreditCardCVV():
    while(True):
        cvv = input('Please insert your Credit Card CVV: ')
        if(validateCreditCardCVV(cvv)):
            return cvv
        else:
            print('Invalid CVV!')
            

def askCreditCard():
    numero = askNumberCreditCard()
    validade = askCreditCardValidThru()
    cvv = askCreditCardCVV()
    print('Credit Card Number: ',numero,'\nCredit Card Valid Thru: ',validade,'\nCredit Card CVV: ',cvv)
    return (numero + ' ' + validade + ' ' + cvv)
#------------------------------------------ CARTÃO DE CRÉDITO ------------------------------------------#

def main():
    askValue()
    askBirthday()
    askName()
    askNIF()
    askNIC()
    askCreditCard()

main()