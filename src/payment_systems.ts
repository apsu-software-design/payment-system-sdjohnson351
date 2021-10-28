/* Stephen Johnson
 * CSCI 4602-12
 * 10/27/2021
 * Refactoring of a payment system
 */


import readlineSync = require('readline-sync');

/**
 * Used to call the correct type of payment system
 */
export class PaymentSystemContext{
    setPaymentType(paySys: string): PaymentSystemExecutor|undefined{
        switch(paySys){
            case "creditCard":
                return new CreditCardExecutor();
                break;
            case "bankDraft":
                return new BankDraftExecutor();
                break;
            case "online":
                return new OnlineExecutor();
                break;
            case "offline":
                return new OfflineExecutor();
                break;
            default:
                return undefined;
        }
    }
}

/**
 * Represents a generic Executor for a payment system
 */
abstract class PaymentSystemExecutor {
    abstract payment: Payment;

    setPayment(payment: Payment): void{
        this.payment = payment;
    }

    /**
     * Executes a payment system
     */
    execute(): void{
        this.payment.setInput();
        this.isValid(this.payment.validate());
    }

    /**
     * Checks if the input for a payment system is valid
     * @param valid 
     */
    isValid(valid: boolean): void{
        if (valid) {
            console.log("Your payment information is being encrypted.");
            console.log("The payment is being processed.")
        }
        else {
            console.log('The payment is invalid.');
        }
    }
}

class CreditCardExecutor extends PaymentSystemExecutor{
    payment = new CreditCardPayment();
}

class BankDraftExecutor extends PaymentSystemExecutor{
    payment = new BankDraftPayment();
}

class OnlineExecutor extends PaymentSystemExecutor{
    payment = new OnlinePayment();
}

class OfflineExecutor extends PaymentSystemExecutor{
    payment = new OfflinePayment();
}

/**
 * Represents a generic payment type with an unknown number of input values and a particular type of validator
 */
class Payment{
    protected input: string[];
    protected validator: Validator;

    constructor(numOfInput: number, validator: Validator){
        this.input = new Array<string>(numOfInput);
        this.validator = validator;
    }

    /**
     * Obtains user input to determine the information for this payment
     */
    setInput(){}

    /**
     * Checks if the input is valid
     * @returns 
     */
    validate(): boolean{
        return this.validator.validate(this.input);
    }
}

/**
 * Represents a credit card payment
 */
class CreditCardPayment extends Payment{
    constructor(){
        super(3, new CreditCardValidator);
    }

    setInput(){
        console.log('Enter Credit Card Payment Details.');
        this.input[0] = readlineSync.question('  Name: ');
        this.input[1] = readlineSync.question('  Credit Card Number: ');
        this.input[2] = readlineSync.question('  Credit Card Expiration Date (MM/DD): ');
    }
}

/**
 * Represents a bank draft payment
 */
class BankDraftPayment extends Payment{
    constructor(){
        super(3, new BankDraftValidator);
    }
    setInput(){
        console.log('Enter Bank Account Details.');
        this.input[0] = readlineSync.question('  Name: ');
        this.input[1] = readlineSync.question('  Bank Routing Number: ');
        this.input[2] = readlineSync.question('  Bank Account Number: ');
    }
}

/**
 * Represents an online payment
 */
class OnlinePayment extends Payment{
    constructor(){
        super(2, new OnlinePayValidator);
    }
    setInput(){
        console.log('Enter Online Payment Details.');
        this.input[0] = readlineSync.question('  Enter Your Email Address: ');
        this.input[1] = readlineSync.question('  Enter Your Payment Password: ');
    }
}

/**
 * Represents an offline payment
 */
class OfflinePayment extends Payment{
    constructor(){
        super(2, new OfflinePayValidator);
    }
    setInput(){
        console.log('Enter Offline Payment Details.');
        this.input[0] = readlineSync.question('  Name: ');
        this.input[1] = readlineSync.question('  Enter Your Billing Address: ');
    }
}

/**
 * Represents a generic validator for a payment's input
 */
interface Validator{
    /**
     * Checks if the input is valid
     * @param inputs 
     * @returns
     */
    validate(inputs: string[]): boolean;    
}

/**
 * Validator for CreditCardPayments
 */
class CreditCardValidator implements Validator{
    validate(inputs: string[]): boolean{
        if(validateName(inputs[0]) && validateCreditCardNum(inputs[1]) && validateCreditCardExp(inputs[2])){
            return true;
        }
        return false;
    }
}

/**
 * Validator for BankDraftPayments
 */
class BankDraftValidator implements Validator{
    validate(inputs: string[]): boolean{
        if(validateName(inputs[0]) && validateRoutingNum(inputs[1]) && validateAccountNum(inputs[2])){
            return true;
        }
        return false;
    }
}

/**
 * Validator for OnlinePayments
 */
class OnlinePayValidator implements Validator{
    validate(inputs: string[]): boolean{
        if(validateEmail(inputs[0]) && validatePassword(inputs[1])){
            return true;
        }
        return false;
    }
}

/**
 * Validator for OfflinePayments
 */
class OfflinePayValidator implements Validator{
    validate(inputs: string[]): boolean{
        if(validateName(inputs[0]) && validateName(inputs[1])){
            return true;
        }
        return false;
    }
}

/**
 * Checks for a word
 * @param name 
 * @returns 
 */
function validateName(name: string): boolean{
    return /^[\w.' ]+$/.test(name);
}

/**
 * Checks for 15 or 16 digits
 * @param creditCardNumber 
 * @returns 
 */
function validateCreditCardNum(creditCardNumber: string): boolean{
    return /\d{15,16}/.test(creditCardNumber);
}

/**
 * Checks for two digits followed by a / followed by two more digits
 * @param creditCardExp 
 * @returns 
 */
function validateCreditCardExp(creditCardExp: string): boolean{
    return /\d\d\/\d\d/.test(creditCardExp);
}

/**
 * Checks for 9 digits
 * @param routingNum 
 * @returns 
 */
function validateRoutingNum(routingNum: string): boolean{
    return /\d{9}/.test(routingNum);
}

/**
 * Checks for 6 or 12 digits
 * @param accountNum 
 * @returns 
 */
function validateAccountNum(accountNum: string): boolean{
    return /\d{6,12}/.test(accountNum);
}

/**
 * Checks if there is a word followed by an @ followed by another word
 * @param email 
 * @returns 
 */
function validateEmail(email: string): boolean{
    return /^[\w]+@[\w]/.test(email);
    //  /^[\w@.]+$/
}

/**
 * Checks for at least one word
 * @param pword 
 * @returns 
 */
function validatePassword(pword: string): boolean{
    return /\w+/.test(pword);
}