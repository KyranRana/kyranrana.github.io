import Cards from '../../Business/Games/Cards';

/**
 * Hilo user interface.
 * @class
 */
export default class HiloUserInterface {
  /**
   * Manipulates form for Hilo.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {Object} FORM_INPUT_CACHE - The form input cache.
   */
  static manipulateForm(FORM, FORM_INPUT_CACHE) {
    FORM.addInputField('nonce', 'Nonce', 'number');
    FORM.addInputField('noOfCardsHilo', 'Number of cards', 'number');

    if (!FORM_INPUT_CACHE.noOfCardsHilo) {
      document.getElementById('noOfCardsHilo').value = 52;
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

    FORM_INPUT_CACHE.noOfCardsHilo &&
      (document.getElementById('noOfCardsHilo').value =
        FORM_INPUT_CACHE.noOfCardsHilo);
  }

  /**
   * Submission handler for Hilo.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const CARDS = (new Cards).verifyHilo({
      serverSeed: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
      nonce: FORM.getInputField('nonce'),
    }).slice(0, FORM.getInputField('noOfCardsHilo'));

    const CARD_TABLE = {'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
      '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13};

    const MOVES = [];

    for (let i = 1; i < CARDS.length; i++) {
      if (CARD_TABLE[CARDS[i][0]] > CARD_TABLE[CARDS[i-1][0]]) {
        MOVES.push('HIGH');
      } else if (CARD_TABLE[CARDS[i][0]] === CARD_TABLE[CARDS[i-1][0]]) {
        if ((13 - CARD_TABLE[CARDS[i][0]]) < CARD_TABLE[CARDS[i][0]]) {
          MOVES.push('HIGH');
        } else {
          MOVES.push('LOW');
        }
      } else {
        MOVES.push('LOW');
      }
    }

    RESULT.addScrollingGrid(140 * CARDS.length, [[
      ...CARDS.map((card) => {
        const MOVE = MOVES.shift();

        return {
          text: `<div class="card card-${card[1].toLowerCase()}` +
            ` width-125 height-125">${card[0]}
          ${MOVE !== undefined ? `<div class="sign sign-${MOVE.toLowerCase()}` +
            `">${MOVE}</div>` : ``}</div>`,
        };
      }),
    ]]);
  }
}
