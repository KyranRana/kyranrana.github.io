import Crash from '../../Business/Games/Crash';

/**
 * Crash user interface.
 * @class
 */
export default class CrashUserInterface {
  /**
   * Manipulates form for Crash.
   *
   * @param {Object} FORM_INPUT_CACHE - The form input cache.
   */
  static manipulateForm(FORM_INPUT_CACHE) {
    const CLIENT_SEED_ELEMENT = document.getElementById('clientSeed');

    CLIENT_SEED_ELEMENT.value = '000000000000000000' +
      '1b34dc6a1e86083f95500b096231436e9b25cbdd0075c4';
    CLIENT_SEED_ELEMENT.disabled = true;

    FORM_INPUT_CACHE.serverSeed &&
      (document.getElementById('serverSeed').value =
        FORM_INPUT_CACHE.serverSeed);
  }

  /**
   * Submission handler for Crash.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const CRASH_POINT = (new Crash).verify({
      hash: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
    });

    RESULT.addText(`Crash point: <span>${CRASH_POINT}x</span>`);
  }
}
