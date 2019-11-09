import Cards from '../../Business/Games/Cards';

/**
 * Diamond Poker user interface.
 * @class
 */
export default class DiamondPokerUserInterface {
  /**
   * Manipulates form for Diamond Poker.
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
   * Submission handler for Diamond Poker.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const CARDS = (new Cards).verifyDiamondPoker({
      serverSeed: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
      nonce: FORM.getInputField('nonce'),
    });

    RESULT.addText('Player');
    RESULT.addScrollingGrid(140 * 5, [[
      ...CARDS.slice(0, 5).map((card) => {
        return {
          text: `<div class="card diamond-card width-125 height-125">
          <img src="./Images/Cards/DiamondPoker/${card.toLowerCase()}.svg"/>
          </div>`,
        };
      }),
    ]]);

    RESULT.addText('Banker');
    RESULT.addScrollingGrid(140 * 5, [[
      ...CARDS.slice(5).map((card) => {
        return {
          // eslint-disable-next-line max-len
          text: `<div class="card diamond-card width-125 height-125">
          <img src="./Images/Cards/DiamondPoker/${card.toLowerCase()}.svg"/>
          </div>`,
        };
      }),
    ]]);
  }
}
