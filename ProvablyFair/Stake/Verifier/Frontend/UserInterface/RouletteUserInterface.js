import Roulette from '../../Business/Games/Roulette';
import ArrayUtils from '../../Business/Utils/ArrayUtils';

/**
 * Roulette user interface.
 * @class
 */
export default class RouletteUserInterface {
  /**
   * Manipulates form for Roulette.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {Object} FORM_INPUT_CACHE - The form input cache.
   */
  static manipulateForm(FORM, FORM_INPUT_CACHE) {
    FORM.addInputField('nonce', 'Nonce', 'number');

    FORM_INPUT_CACHE.clientSeed &&
      (document.getElementById('clientSeed').value =
        FORM_INPUT_CACHE.clientSeed);

    FORM_INPUT_CACHE.serverSeed &&
      (document.getElementById('serverSeed').value =
        FORM_INPUT_CACHE.serverSeed);

    FORM_INPUT_CACHE.nonce &&
      (document.getElementById('nonce').value =
        FORM_INPUT_CACHE.nonce);
  }

  /**
   * Submission handler for Roulette.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const CARD = (new Roulette).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
      nonce: FORM.getInputField('nonce'),
    });

    RESULT.addText(`Winning number: <span>${CARD}</span>`);

    for (let i = 0; i < 3; i++) {
      RESULT.addGrid([[
        ...ArrayUtils.generateArrayWithRange(1, 13).map((index) => {
          return {
            // eslint-disable-next-line max-len
            text: index === 1 && i === 0 ? '0' : (index === 1 ? '' : 3 * (index - 1) - i),
            highlighted: CARD == 3 * (index - 1) - i,
          };
        }),
      ]]);
    }
  }
}
