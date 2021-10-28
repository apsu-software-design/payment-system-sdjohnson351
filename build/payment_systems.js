"use strict";
/* Stephen Johnson
 * CSCI 4602-12
 * 10/27/2021
 * Refactoring of a payment system
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSystemContext = void 0;
var readlineSync = require("readline-sync");
/**
 * Used to call the correct type of payment system
 */
var PaymentSystemContext = /** @class */ (function () {
    function PaymentSystemContext() {
    }
    PaymentSystemContext.prototype.setPaymentType = function (paySys) {
        switch (paySys) {
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
    };
    return PaymentSystemContext;
}());
exports.PaymentSystemContext = PaymentSystemContext;
/**
 * Represents a generic Executor for a payment system
 */
var PaymentSystemExecutor = /** @class */ (function () {
    function PaymentSystemExecutor() {
    }
    PaymentSystemExecutor.prototype.setPayment = function (payment) {
        this.payment = payment;
    };
    /**
     * Executes a payment system
     */
    PaymentSystemExecutor.prototype.execute = function () {
        this.payment.setInput();
        this.isValid(this.payment.validate());
    };
    /**
     * Checks if the input for a payment system is valid
     * @param valid
     */
    PaymentSystemExecutor.prototype.isValid = function (valid) {
        if (valid) {
            console.log("Your payment information is being encrypted.");
            console.log("The payment is being processed.");
        }
        else {
            console.log('The payment is invalid.');
        }
    };
    return PaymentSystemExecutor;
}());
var CreditCardExecutor = /** @class */ (function (_super) {
    __extends(CreditCardExecutor, _super);
    function CreditCardExecutor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.payment = new CreditCardPayment();
        return _this;
    }
    return CreditCardExecutor;
}(PaymentSystemExecutor));
var BankDraftExecutor = /** @class */ (function (_super) {
    __extends(BankDraftExecutor, _super);
    function BankDraftExecutor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.payment = new BankDraftPayment();
        return _this;
    }
    return BankDraftExecutor;
}(PaymentSystemExecutor));
var OnlineExecutor = /** @class */ (function (_super) {
    __extends(OnlineExecutor, _super);
    function OnlineExecutor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.payment = new OnlinePayment();
        return _this;
    }
    return OnlineExecutor;
}(PaymentSystemExecutor));
var OfflineExecutor = /** @class */ (function (_super) {
    __extends(OfflineExecutor, _super);
    function OfflineExecutor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.payment = new OfflinePayment();
        return _this;
    }
    return OfflineExecutor;
}(PaymentSystemExecutor));
/**
 * Represents a generic payment type with an unknown number of input values and a particular type of validator
 */
var Payment = /** @class */ (function () {
    function Payment(numOfInput, validator) {
        this.input = new Array(numOfInput);
        this.validator = validator;
    }
    /**
     * Obtains user input to determine the information for this payment
     */
    Payment.prototype.setInput = function () { };
    /**
     * Checks if the input is valid
     * @returns
     */
    Payment.prototype.validate = function () {
        return this.validator.validate(this.input);
    };
    return Payment;
}());
/**
 * Represents a credit card payment
 */
var CreditCardPayment = /** @class */ (function (_super) {
    __extends(CreditCardPayment, _super);
    function CreditCardPayment() {
        return _super.call(this, 3, new CreditCardValidator) || this;
    }
    CreditCardPayment.prototype.setInput = function () {
        console.log('Enter Credit Card Payment Details.');
        this.input[0] = readlineSync.question('  Name: ');
        this.input[1] = readlineSync.question('  Credit Card Number: ');
        this.input[2] = readlineSync.question('  Credit Card Expiration Date (MM/DD): ');
    };
    return CreditCardPayment;
}(Payment));
/**
 * Represents a bank draft payment
 */
var BankDraftPayment = /** @class */ (function (_super) {
    __extends(BankDraftPayment, _super);
    function BankDraftPayment() {
        return _super.call(this, 3, new BankDraftValidator) || this;
    }
    BankDraftPayment.prototype.setInput = function () {
        console.log('Enter Bank Account Details.');
        this.input[0] = readlineSync.question('  Name: ');
        this.input[1] = readlineSync.question('  Bank Routing Number: ');
        this.input[2] = readlineSync.question('  Bank Account Number: ');
    };
    return BankDraftPayment;
}(Payment));
/**
 * Represents an online payment
 */
var OnlinePayment = /** @class */ (function (_super) {
    __extends(OnlinePayment, _super);
    function OnlinePayment() {
        return _super.call(this, 2, new OnlinePayValidator) || this;
    }
    OnlinePayment.prototype.setInput = function () {
        console.log('Enter Online Payment Details.');
        this.input[0] = readlineSync.question('  Enter Your Email Address: ');
        this.input[1] = readlineSync.question('  Enter Your Payment Password: ');
    };
    return OnlinePayment;
}(Payment));
/**
 * Represents an offline payment
 */
var OfflinePayment = /** @class */ (function (_super) {
    __extends(OfflinePayment, _super);
    function OfflinePayment() {
        return _super.call(this, 2, new OfflinePayValidator) || this;
    }
    OfflinePayment.prototype.setInput = function () {
        console.log('Enter Offline Payment Details.');
        this.input[0] = readlineSync.question('  Name: ');
        this.input[1] = readlineSync.question('  Enter Your Billing Address: ');
    };
    return OfflinePayment;
}(Payment));
/**
 * Validator for CreditCardPayments
 */
var CreditCardValidator = /** @class */ (function () {
    function CreditCardValidator() {
    }
    CreditCardValidator.prototype.validate = function (inputs) {
        if (validateName(inputs[0]) && validateCreditCardNum(inputs[1]) && validateCreditCardExp(inputs[2])) {
            return true;
        }
        return false;
    };
    return CreditCardValidator;
}());
/**
 * Validator for BankDraftPayments
 */
var BankDraftValidator = /** @class */ (function () {
    function BankDraftValidator() {
    }
    BankDraftValidator.prototype.validate = function (inputs) {
        if (validateName(inputs[0]) && validateRoutingNum(inputs[1]) && validateAccountNum(inputs[2])) {
            return true;
        }
        return false;
    };
    return BankDraftValidator;
}());
/**
 * Validator for OnlinePayments
 */
var OnlinePayValidator = /** @class */ (function () {
    function OnlinePayValidator() {
    }
    OnlinePayValidator.prototype.validate = function (inputs) {
        if (validateEmail(inputs[0]) && validatePassword(inputs[1])) {
            return true;
        }
        return false;
    };
    return OnlinePayValidator;
}());
/**
 * Validator for OfflinePayments
 */
var OfflinePayValidator = /** @class */ (function () {
    function OfflinePayValidator() {
    }
    OfflinePayValidator.prototype.validate = function (inputs) {
        if (validateName(inputs[0]) && validateName(inputs[1])) {
            return true;
        }
        return false;
    };
    return OfflinePayValidator;
}());
/**
 * Checks for a word
 * @param name
 * @returns
 */
function validateName(name) {
    return /^[\w.' ]+$/.test(name);
}
/**
 * Checks for 15 or 16 digits
 * @param creditCardNumber
 * @returns
 */
function validateCreditCardNum(creditCardNumber) {
    return /\d{15,16}/.test(creditCardNumber);
}
/**
 * Checks for two digits followed by a / followed by two more digits
 * @param creditCardExp
 * @returns
 */
function validateCreditCardExp(creditCardExp) {
    return /\d\d\/\d\d/.test(creditCardExp);
}
/**
 * Checks for 9 digits
 * @param routingNum
 * @returns
 */
function validateRoutingNum(routingNum) {
    return /\d{9}/.test(routingNum);
}
/**
 * Checks for 6 or 12 digits
 * @param accountNum
 * @returns
 */
function validateAccountNum(accountNum) {
    return /\d{6,12}/.test(accountNum);
}
/**
 * Checks if there is a word followed by an @ followed by another word
 * @param email
 * @returns
 */
function validateEmail(email) {
    return /^[\w]+@[\w]/.test(email);
    //  /^[\w@.]+$/
}
/**
 * Checks for at least one word
 * @param pword
 * @returns
 */
function validatePassword(pword) {
    return /\w+/.test(pword);
}
