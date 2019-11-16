import 'core-js/stable';
import 'regenerator-runtime/runtime';

import BaccaratUserInterface from './UserInterface/BaccaratUserInterface';
import BlackjackUserInterface from './UserInterface/BlackjackUserInterface';
import CrashUserInterface from './UserInterface/CrashUserInterface';
import DiceUserInterface from './UserInterface/DiceUserInterface';
import HiloUserInterface from './UserInterface/HiloUserInterface';
import LimboUserInterface from './UserInterface/LimboUserInterface';
import PlinkoUserInterface from './UserInterface/PlinkoUserInterface';
import WheelUserInterface from './UserInterface/WheelUserInterface';
import VideoPokerUserInterface from './UserInterface/VideoPokerUserInterface';
import DiamondPokerUserInterface from
  './UserInterface/DiamondPokerUserInterface';
import RouletteUserInterface from './UserInterface/RouletteUserInterface';
import KenoUserInterface from './UserInterface/KenoUserInterface';
import MinesUserInterface from './UserInterface/MinesUserInterface';
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
    const FORM = new VerifierForm(document.getElementById('StakeForm'));

    // Clear all dynamically added form elements.
    FORM.clearFields();

    /*
     * If previous game was crash:
     *
     * 1. Enable client seed input.
     * 2. Empty client seed input.
     */
    const CLIENT_SEED_ELEMENT = document.getElementById('clientSeed');

    if (CLIENT_SEED_ELEMENT.disabled) {
      CLIENT_SEED_ELEMENT.disabled = false;
      CLIENT_SEED_ELEMENT.value = '';
    }

    switch (GAME) {
      case 'baccarat':
        BaccaratUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = BaccaratUserInterface.verify;
        break;
      case 'blackjack':
        BlackjackUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = BlackjackUserInterface.verify;
        break;
      case 'dice':
        DiceUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = DiceUserInterface.verify;
        break;
      case 'diamondpoker':
        DiamondPokerUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = DiamondPokerUserInterface.verify;
        break;
      case 'crash':
        CrashUserInterface.manipulateForm(FORM_INPUT_CACHE);
        verifyHandler = CrashUserInterface.verify;
        break;
      case 'hilo':
        HiloUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = HiloUserInterface.verify;
        break;
      case 'keno':
        KenoUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = KenoUserInterface.verify;
        break;
      case 'slots':
        SlotsUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = SlotsUserInterface.verify;
        break;
      case 'limbo':
        LimboUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = LimboUserInterface.verify;
        break;
      case 'plinko':
        PlinkoUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = PlinkoUserInterface.verify;
        break;
      case 'roulette':
        RouletteUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = RouletteUserInterface.verify;
        break;
      case 'mines':
        MinesUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = MinesUserInterface.verify;
        break;
      case 'wheel':
        WheelUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = WheelUserInterface.verify;
        break;
      case 'videopoker':
        VideoPokerUserInterface.manipulateForm(FORM, FORM_INPUT_CACHE);
        verifyHandler = VideoPokerUserInterface.verify;
        break;
      default:
        console.log('Game not found', GAME);
    }
  }
}

(function() {
  const FORM_ELEMENT = document.getElementById('StakeForm');

  UserInterface.changeGame('baccarat');

  FORM_ELEMENT.classList.remove('hidden');

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

    const FORM = new VerifierForm(document.getElementById('StakeForm'));
    const RESULT = new VerifierResult(document.getElementById('StakeResult'));

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
