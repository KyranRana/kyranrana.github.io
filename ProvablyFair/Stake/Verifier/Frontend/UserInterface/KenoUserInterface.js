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
    FORM.addInputField('noOfHitsKeno', 'Number of hits', 'number');

    const NO_OF_HITS_ELEMENT = document.getElementById('noOfHitsKeno');

    NO_OF_HITS_ELEMENT.setAttribute('min', 1);
    NO_OF_HITS_ELEMENT.setAttribute('max', 10);

    if (!FORM_INPUT_CACHE.noOfHitsKeno) {
      NO_OF_HITS_ELEMENT.value = 10;
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

    FORM_INPUT_CACHE.noOfHitsKeno &&
      (document.getElementById('noOfHitsKeno').value =
        FORM_INPUT_CACHE.noOfHitsKeno);
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
    }).slice(0, FORM.getInputField('noOfHitsKeno'));

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
