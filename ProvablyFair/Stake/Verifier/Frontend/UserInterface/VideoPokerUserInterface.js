import Cards from '../../Business/Games/Cards';

/**
 * Video Poker user interface.
 * @class
 */
export default class VideoPokerUserInterface {
  /**
   * Manipulates form for Video Poker.
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
   * Submission handler for Video Poker.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const CARDS = (new Cards).verifyVideoPoker({
      serverSeed: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
      nonce: FORM.getInputField('nonce'),
    });

    RESULT.addScrollingGrid(140 * 10, [[
      ...CARDS.map((card) => {
        return {
          text: `<div class="card card-${card[1].toLowerCase()}` +
            ` width-125 height-125">${card[0]}</div>`,
        };
      }),
    ]]);
  }
}
