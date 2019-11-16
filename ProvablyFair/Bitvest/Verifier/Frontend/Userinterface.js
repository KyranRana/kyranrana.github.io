import 'core-js/stable';
import 'regenerator-runtime/runtime';

import BitspinUserInterface from './UserInterface/BitspinUserInterface';
import DiceUserInterface from './UserInterface/DiceUserInterface';
import KenoUserInterface from './UserInterface/KenoUserInterface';
import PlinkoUserInterface from './UserInterface/PlinkoUserInterface';
import RouletteUserInterface from './UserInterface/RouletteUserInterface';
import SlotsUserInterface from './UserInterface/SlotsUserInterface';
import VerifierForm from './VerifierForm';
import VerifierResult from './VerifierResult';
import VerifierFormValidator from './VerifierFormValidator';

let verifyHandler = null;

const FORM_INPUT_CACHE = {};

/**
 * Handles user interface.
 * @class
 */
class UserInterface {
  /**
   * Changes game in user interface.
   *
   * @param {String} GAME - The game.
   */
  static changeGame(GAME) {
    const FORM = new VerifierForm(document.getElementById('BitvestForm'));

    // Clear all dynamically added form elements.
    FORM.clearFields();

    switch (GAME) {
      case 'bitspin':
        BitspinUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = BitspinUserInterface.verify;
        break;
      case 'dice':
        DiceUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = DiceUserInterface.verify;
        break;
      case 'keno':
        KenoUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = KenoUserInterface.verify;
        break;
      case 'plinko':
        PlinkoUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = PlinkoUserInterface.verify;
        break;
      case 'roulette':
        RouletteUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = RouletteUserInterface.verify;
        break;
      case 'slots':
        SlotsUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = SlotsUserInterface.verify;
        break;
      default:
        console.log('Game not found', GAME);
    }
  }
}

(function() {
  const FORM_ELEMENT = document.getElementById('BitvestForm');

  FORM_ELEMENT.classList.remove('hidden');

  UserInterface.changeGame('bitspin');

  FORM_ELEMENT.addEventListener('change', (EVENT) =>
    EVENT.target.id === 'games' &&
      UserInterface.changeGame(EVENT.target.value));

  FORM_ELEMENT.addEventListener('keyup',
      createDelegate('input[type=text]')(handleAutoSubmit));

  FORM_ELEMENT.addEventListener('keyup',
      createDelegate('input[type=number]')(handleAutoSubmit));

  FORM_ELEMENT.addEventListener('change',
      createDelegate('input[type=number]')(handleAutoSubmit));

  FORM_ELEMENT.addEventListener('change',
      createDelegate('select')(handleAutoSubmit));

  /**
   * Creates delegate for selector.
   *
   * @param {String} SELECTOR - The selector.
   * @return {Closure} Delegate callback.
   */
  function createDelegate(SELECTOR) {
    return (cb) => (EVENT) => EVENT.target.matches(SELECTOR) && cb(EVENT);
  }

  /**
   * Auto submit wrapper.
   *
   * @param {Object} EVENT - The event.
   */
  function handleAutoSubmit(EVENT) {
    const FORM_VALIDATOR = new VerifierFormValidator(FORM_ELEMENT);

    const FORM = new VerifierForm(document.getElementById('BitvestForm'));
    const RESULT = new VerifierResult(document.getElementById('BitvestResult'));

    FORM_INPUT_CACHE[EVENT.target.id] = EVENT.target.value;

    try {
      FORM_VALIDATOR.validateInputFieldsNotEmpty();
      FORM_VALIDATOR.validateNumericInputFields();

      RESULT.removeAllContent();

      verifyHandler(FORM, RESULT);
    } catch (e) {
      console.log(e.stack);

      RESULT.removeAllContent();
      RESULT.addText(e.message);
    }
  }
})();
