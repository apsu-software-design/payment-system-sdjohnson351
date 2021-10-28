//User Interface for The Payment System
//@author Stephen Johnson

import readlineSync = require('readline-sync'); //for easier repeated prompts
import {PaymentSystemContext} from './payment_systems';

/**
 * Function to run the UI
 */
export function start() {
  showMainMenu(new PaymentSystemContext());
}

/**
 * The main menu. Will show until the user exits
 */
function showMainMenu(psc:PaymentSystemContext) {
  while(true){ //run until we exit
    console.log(`Welcome to the Payment System! You wish to purchase an item for $5. Pick an option:
  1. Use a credit card.
  2. Use a bank draft.
  3. Use an online payment system.
  4. Use an offline payment system.
  5. Quit.`);

    let response = readlineSync.question('> ')
    if(response === '5' || response.slice(0,2).toLowerCase() === ':q'){
      break; //stop looping, thus leaving method
    }

    switch(response) { //handle each response
      case '1': psc.setPaymentType("creditCard")?.execute(); break;
      case '2': psc.setPaymentType("bankDraft")?.execute(); break;
      case '3': psc.setPaymentType("online")?.execute(); break;
      case '4': psc.setPaymentType("offline")?.execute(); break;
      default: console.log('Invalid option!');
    }
    console.log(''); //extra empty line for revisiting
  }
}
