import Dice from '../../Business/Games/Dice';

/**
 * Dice user interface.
 * @class
 */
export default class DiceUserInterface {
  /**
   * Manipulates form for Dice.
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
   * Submission handler for Dice.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const ROLL = (new Dice).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
      nonce: FORM.getInputField('nonce'),
    });

    RESULT.addText(`Dice roll: <span>${ROLL}</span>`);
  }
}
