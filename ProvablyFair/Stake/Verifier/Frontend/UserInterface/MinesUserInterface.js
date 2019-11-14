/* eslint-disable max-len */
import Mines from '../../Business/Games/Mines';
import ArrayUtils from '../../Business/Utils/ArrayUtils';

/**
 * Mines user interface.
 * @class
 */
export default class MinesUserInterface {
  /**
   * Manipulates form for Mines.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {Object} FORM_INPUT_CACHE - The form input cache.
   */
  static manipulateForm(FORM, FORM_INPUT_CACHE) {
    FORM.addInputField('nonce', 'Nonce', 'number');
    FORM.addInputField('noOfMines', 'Number of mines', 'number');

    const NO_OF_MINES_ELEMENT = document.getElementById('noOfMines');

    NO_OF_MINES_ELEMENT.setAttribute('min', 1);
    NO_OF_MINES_ELEMENT.setAttribute('max', 24);

    if (!FORM_INPUT_CACHE.noOfMines) {
      NO_OF_MINES_ELEMENT.value = 24;
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

    FORM_INPUT_CACHE.noOfMines &&
      (document.getElementById('noOfMines').value =
        FORM_INPUT_CACHE.noOfMines);
  }

  /**
   * Submission handler for Mines.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const MINES = (new Mines).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
      nonce: FORM.getInputField('nonce'),
    }).slice(0, FORM.getInputField('noOfMines'));

    RESULT.addText(`Chosen mines <span>${MINES.sort((a, b) => a - b).join`, `}</span>`);

    for (let i = 0; i < 5; i++) {
      RESULT.addGrid([[
        ...ArrayUtils.generateArrayWithRange(i * 5 + 1, i * 5 + 5).map((index) => {
          return {
            text: `<div class='mine-svg'><img src="./Images/Mines/${MINES.indexOf(index) !== -1 ?
              'mine.svg' : 'gem.svg'}"/></div>`,
          };
        }),
      ]]);
    }
  }
}
