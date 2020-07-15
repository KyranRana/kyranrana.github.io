import Slide from '../../Business/Games/Slide';

/**
 * Slide user interface.
 * @class
 */
export default class SlideUserInterface {
  /**
   * Manipulates form for Slide.
   *
   * @param {Object} FORM_INPUT_CACHE - The form input cache.
   */
  static manipulateForm(FORM_INPUT_CACHE) {
    const CLIENT_SEED_ELEMENT = document.getElementById('clientSeed');

    CLIENT_SEED_ELEMENT.value = '0000000000000000000' +
      'b20f796f5421cac95c4efb06c6bbf6408d6f9b5d7b9dc';
    CLIENT_SEED_ELEMENT.disabled = true;

    FORM_INPUT_CACHE.serverSeed &&
      (document.getElementById('serverSeed').value =
        FORM_INPUT_CACHE.serverSeed);
  }

  /**
   * Submission handler for Slide.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const SLIDE_MULTIPLIER = (new Slide).verify({
      hash: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
    });

    RESULT.addText(`Slide multiplier: <span>${SLIDE_MULTIPLIER}x</span>`);
  }
}
