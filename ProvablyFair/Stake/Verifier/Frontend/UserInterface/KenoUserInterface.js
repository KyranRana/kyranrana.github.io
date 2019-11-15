/* eslint-disable max-len */
import Keno from '../../Business/Games/Keno';
import ArrayUtils from '../../Business/Utils/ArrayUtils';

/**
 * Keno user interface.
 * @class
 */
export default class KenoUserInterface {
  /**
   * Manipulates form for Keno.
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
   * Submission handler for Keno.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const CARDS = (new Keno).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
      nonce: FORM.getInputField('nonce'),
    });

    RESULT.addText(`Chosen numbers <span>${CARDS.sort((a, b) => a - b).join`, `}</span>`);

    for (let i = 0; i < 5; i++) {
      RESULT.addGrid([[
        ...ArrayUtils.generateArrayWithRange(i * 8 + 1, i * 8 + 8).map((index) => {
          return {
            text: index,
            highlighted: CARDS.indexOf(index) !== -1,
          };
        }),
      ]]);
    }
  }
}
