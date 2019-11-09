import Cards from '../../Business/Games/Cards';

/**
 * Blackjack user interface.
 * @class
 */
export default class BlackjackUserInterface {
  /**
   * Manipulates form for Blackjack.
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
   * Submission handler for Blackjack.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const CARDS = (new Cards).verifyBlackjack({
      serverSeed: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
      nonce: FORM.getInputField('nonce'),
    });

    let counter = 0;

    RESULT.addScrollingGrid(140 * 52, [[
      ...CARDS.map((card) => {
        counter++;

        return {
          // eslint-disable-next-line max-len
          text: `<div class="card card-${card[1].toLowerCase()} width-125 height-125">${card[0]}</div>`,
          highlighted: counter > 2 && counter < 5,
        };
      }),
    ]]);
  }
}
