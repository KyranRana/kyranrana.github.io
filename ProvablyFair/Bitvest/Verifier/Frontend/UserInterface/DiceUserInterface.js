import Dice from '../../Business/Games/Dice';

/**
 * Dice user interface.
 * @class
 */
export default class DiceUserInterface {
  /**
   * Manipulates form for Dice.
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
   * Submission handler for Dice.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const ROLL = (new Dice).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      userSeed: FORM.getInputField('userSeed'),
    });

    RESULT.addText(`Dice roll: <span>${ROLL}</span>`);
  }
}
