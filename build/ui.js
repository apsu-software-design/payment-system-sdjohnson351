"use strict";
//User Interface for The Payment System
//@author Stephen Johnson
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var readlineSync = require("readline-sync"); //for easier repeated prompts
var payment_systems_1 = require("./payment_systems");
/**
 * Function to run the UI
 */
function start() {
    showMainMenu(new payment_systems_1.PaymentSystemContext());
}
exports.start = start;
/**
 * The main menu. Will show until the user exits
 */
function showMainMenu(psc) {
    var _a, _b, _c, _d;
    while (true) { //run until we exit
        console.log("Welcome to the Payment System! You wish to purchase an item for $5. Pick an option:\n  1. Use a credit card.\n  2. Use a bank draft.\n  3. Use an online payment system.\n  4. Use an offline payment system.\n  5. Quit.");
        var response = readlineSync.question('> ');
        if (response === '5' || response.slice(0, 2).toLowerCase() === ':q') {
            break; //stop looping, thus leaving method
        }
        switch (response) { //handle each response
            case '1':
                (_a = psc.setPaymentType("creditCard")) === null || _a === void 0 ? void 0 : _a.execute();
                break;
            case '2':
                (_b = psc.setPaymentType("bankDraft")) === null || _b === void 0 ? void 0 : _b.execute();
                break;
            case '3':
                (_c = psc.setPaymentType("online")) === null || _c === void 0 ? void 0 : _c.execute();
                break;
            case '4':
                (_d = psc.setPaymentType("offline")) === null || _d === void 0 ? void 0 : _d.execute();
                break;
            default: console.log('Invalid option!');
        }
        console.log(''); //extra empty line for revisiting
    }
}
