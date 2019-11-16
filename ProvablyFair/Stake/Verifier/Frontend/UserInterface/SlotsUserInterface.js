import Slots from '../../Business/Games/Slots';
import ArrayUtils from '../../Business/Utils/ArrayUtils';

/**
 * Slots user interface.
 * @class
 */
export default class SlotsUserInterface {
  /**
   * Manipulates form for Slots.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {Object} FORM_INPUT_CACHE - The form input cache.
   */
  static manipulateForm(FORM, FORM_INPUT_CACHE) {
    FORM.addInputField('nonce', 'Nonce', 'number');
    FORM.addInputField('noOfRoundsSlots', 'Number of rounds', 'number');

    const NO_OF_ROUNDS_ELEMENT = document.getElementById('noOfRoundsSlots');

    NO_OF_ROUNDS_ELEMENT.setAttribute('min', 0);
    NO_OF_ROUNDS_ELEMENT.setAttribute('max', 180);

    if (!FORM_INPUT_CACHE.noOfRoundsSlots) {
      NO_OF_ROUNDS_ELEMENT.value = 0;
    }

    FORM_INPUT_CACHE.clientSeed &&
      (document.getElementById('clientSeed').value =
        FORM_INPUT_CACHE.clientSeed);

    FORM_INPUT_CACHE.serverSeed &&
      (document.getElementById('serverSeed').value =
        FORM_INPUT_CACHE.serverSeed);

    FORM_INPUT_CACHE.nonce &&
      (document.getElementById('nonce').value =
        FORM_INPUT_CACHE.nonce);

    FORM_INPUT_CACHE.noOfRoundsSlots &&
      (document.getElementById('noOfRoundsSlots').value =
        FORM_INPUT_CACHE.noOfRoundsSlots);
  }

  /**
   * Submission handler for Slots.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const POSITIONS = (new Slots).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
      nonce: FORM.getInputField('nonce'),
    }, FORM.getInputField('noOfRoundsSlots'));

    const REELS = [];
    REELS.push([
      'five.svg', 'queen.svg', 'ten.svg', 'three.svg', 'jack.svg', 'ace.svg',
      'four.svg', 'ten.svg', 'queen.svg', 'two.svg', 'nine.svg', 'ten.svg',
      'scatter.svg', 'queen.svg', 'jack.svg', 'wild.svg', 'queen.svg',
      'ace.svg', 'two.svg', 'king.svg', 'one.svg', 'queen.svg', 'five.svg',
      'king.svg', 'four.svg', 'ten.svg', 'one.svg', 'nine.svg', 'three.svg',
      'ten.svg']);

    REELS.push([
      'queen.svg', 'jack.svg', 'three.svg', 'queen.svg', 'ace.svg', 'wild.svg',
      'queen.svg', 'jack.svg', 'five.svg', 'nine.svg', 'queen.svg', 'three.svg',
      'king.svg', 'one.svg', 'jack.svg', 'two.svg', 'ten.svg', 'one.svg',
      'nine.svg', 'scatter.svg', 'ace.svg', 'four.svg', 'ten.svg', 'king.svg',
      'two.svg', 'jack.svg', 'queen.svg', 'five.svg', 'jack.svg', 'four.svg']);

    REELS.push([
      'king.svg', 'nine.svg', 'five.svg', 'ten.svg', 'three.svg', 'king.svg',
      'jack.svg', 'wild.svg', 'queen.svg', 'ten.svg', 'three.svg', 'nine.svg',
      'jack.svg', 'one.svg', 'ace.svg', 'ten.svg', 'four.svg', 'ace.svg',
      'king.svg', 'one.svg', 'nine.svg', 'ten.svg', 'two.svg', 'queen.svg',
      'nine.svg', 'four.svg', 'king.svg', 'five.svg', 'nine.svg',
      'scatter.svg']);

    REELS.push([
      'king.svg', 'nine.svg', 'five.svg', 'ace.svg', 'two.svg', 'jack.svg',
      'one.svg', 'ten.svg', 'four.svg', 'jack.svg', 'three.svg', 'queen.svg',
      'five.svg', 'jack.svg', 'ten.svg', 'four.svg', 'ace.svg', 'queen.svg',
      'scatter.svg', 'ten.svg', 'king.svg', 'three.svg', 'jack.svg', 'four.svg',
      'nine.svg', 'ace.svg', 'two.svg', 'nine.svg', 'ace.svg', 'wild.svg']);

    REELS.push([
      'three.svg', 'ten.svg', 'jack.svg', 'two.svg', 'king.svg', 'ten.svg',
      'wild.svg', 'king.svg', 'nine.svg', 'one.svg', 'ten.svg', 'five.svg',
      'ace.svg', 'jack.svg', 'scatter.svg', 'nine.svg', 'ace.svg', 'four.svg',
      'queen.svg', 'ace.svg', 'four.svg', 'ten.svg', 'five.svg', 'queen.svg',
      'three.svg', 'nine.svg', 'wild.svg', 'jack.svg', 'two.svg', 'queen.svg',
      'king.svg', 'five.svg', 'jack.svg', 'ten.svg', 'three.svg', 'queen.svg',
      'four.svg', 'nine.svg', 'one.svg', 'ace.svg', 'nine.svg']);

    const CHOSEN_POSITIONS = POSITIONS.map((position, index) => [
      REELS[index][position - 1 < 0 ? REELS[index].length - 1 : position - 1],
      REELS[index][position],
      REELS[index][position + 1 === REELS[index].length ? 0 : position + 1],
    ]);

    RESULT.addText(`Chosen positions <span>` +
      `${POSITIONS.sort((a, b) => a - b).join`, `}</span>`);

    for (let i = 0; i < 3; i++) {
      RESULT.addGrid([[
        ...ArrayUtils.generateArrayWithRange(0, 4).map((index) => {
          return {
            text: `<div class='reel-svg'><img src="./Images/Slots/` +
              `${CHOSEN_POSITIONS[index][i]}"/></div>`,
          };
        }),
      ]]);
    }
  }
}
