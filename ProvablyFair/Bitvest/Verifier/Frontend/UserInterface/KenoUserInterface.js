/* eslint-disable max-len */
import ArrayUtils from '../../Business/Utils/ArrayUtils';
import Keno from '../../Business/Games/Keno';

/**
 * Keno user interface.
 * @class
 */
export default class KenoUserInterface {
  /**
   * Manipulates form for Keno.
   *
   * @param {Object} FORM_INPUT_CACHE - The form input cache.
   */
  static manipulateForm(FORM_INPUT_CACHE) {
    FORM_INPUT_CACHE.userSeed &&
      (document.getElementById('userSeed').value =
        FORM_INPUT_CACHE.userSeed);

    FORM_INPUT_CACHE.serverSeed &&
      (document.getElementById('serverSeed').value =
        FORM_INPUT_CACHE.serverSeed);
  }

  /**
   * Submission handler for Keno.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const HITS = (new Keno).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      userSeed: FORM.getInputField('userSeed'),
    });


    RESULT.addText(`Chosen numbers <span>${HITS.join`, `}</span>`);

    for (let i = 0; i < 8; i++) {
      RESULT.addGrid([[
        ...ArrayUtils.generateArrayWithRange(i * 10 + 1, i * 10 + 10).map((index) => {
          return {
            text: index,
            highlighted: HITS.indexOf(index) !== -1,
          };
        }),
      ]]);
    }
  }
}
