/* eslint-disable max-len */
import PayoutTables from '../../Business/Games/PayoutTables';
import Plinko from '../../Business/Games/Plinko';
import ArrayUtils from '../../Business/Utils/ArrayUtils';

/**
 * Plinko user interface.
 * @class
 */
export default class PlinkoUserInterface {
  /**
   * Manipulates form for Plinko.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {Object} FORM_INPUT_CACHE - The form input cache.
   */
  static manipulateForm(FORM, FORM_INPUT_CACHE) {
    FORM.addInputField('noOfDropsPlinko', 'Drops', 'number');

    FORM.addSelectField('colourPlinko', 'Colour', [
      {value: 'red', text: 'Red'},
      {value: 'orange', text: 'Orange'},
      {value: 'green', text: 'Green'},
      {value: 'teal', text: 'Teal'},
      {value: 'blue', text: 'Blue'},
      {value: 'purple', text: 'Purple'},
    ]);

    const NO_OF_DROPS_ELEMENT = document.getElementById('noOfDropsPlinko');

    NO_OF_DROPS_ELEMENT.setAttribute('min', 1);
    NO_OF_DROPS_ELEMENT.setAttribute('max', 32);

    if (!FORM_INPUT_CACHE.noOfDropsPlinko) {
      NO_OF_DROPS_ELEMENT.value = 1;
    }

    FORM_INPUT_CACHE.userSeed &&
      (document.getElementById('userSeed').value =
        FORM_INPUT_CACHE.userSeed);

    FORM_INPUT_CACHE.serverSeed &&
      (document.getElementById('serverSeed').value =
        FORM_INPUT_CACHE.serverSeed);

    FORM_INPUT_CACHE.noOfDropsPlinko &&
      (document.getElementById('noOfDropsPlinko').value =
        FORM_INPUT_CACHE.noOfDropsPlinko);

    FORM_INPUT_CACHE.colourPlinko &&
      (document.getElementById('colourPlinko').value =
        FORM_INPUT_CACHE.colourPlinko);
  }

  /**
   * Submission handler for Plinko.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const COLOUR = FORM.getSelectField('colourPlinko');
    const DROPS = FORM.getInputField('noOfDropsPlinko');

    const FULL_PAYOUT_TABLE = PayoutTables.getPlinkoPayoutTable()[COLOUR];

    const PATHS = (new Plinko).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      userSeed: FORM.getInputField('userSeed'),
    }, DROPS);

    const PAYOUT_INDEXES = {};

    for (const PATH of PATHS) {
      let chosenIndex;

      if (PATH[0] === 'LEFT') {
        chosenIndex = PATH.filter((direction) => direction === 'RIGHT').length;
      } else {
        chosenIndex = 17 - PATH.filter((direction) => direction === 'LEFT').length - 1;
      }

      PAYOUT_INDEXES[chosenIndex] = PAYOUT_INDEXES[chosenIndex] || 0;
      PAYOUT_INDEXES[chosenIndex]++;
    }

    const POSITION_OVERVIEW = [];

    Object.keys(PAYOUT_INDEXES).map((PAYOUT_INDEX) =>
      POSITION_OVERVIEW.push(`<small>${PAYOUT_INDEXES[PAYOUT_INDEX]} bit${PAYOUT_INDEXES[PAYOUT_INDEX] > 1 ? 's' : ''}` +
        ` dropped into position ${+PAYOUT_INDEX + 1}</small>`));

    RESULT.addText(`${POSITION_OVERVIEW.join`<br>`}`);

    if (COLOUR !== 'purple') {
      const MULTIPLIER_INDEXES = {};

      Object.keys(PAYOUT_INDEXES).map((payoutIndex) => {
        MULTIPLIER_INDEXES[FULL_PAYOUT_TABLE[payoutIndex]] = MULTIPLIER_INDEXES[FULL_PAYOUT_TABLE[payoutIndex]] || 0;
        MULTIPLIER_INDEXES[FULL_PAYOUT_TABLE[payoutIndex]] += PAYOUT_INDEXES[payoutIndex];
      });

      const PAYOUT_TABLE = ArrayUtils.generateArrayOfUniqueItems(FULL_PAYOUT_TABLE);
      PAYOUT_TABLE.sort((a, b) => a - b);

      RESULT.addGrid([[
        ...PAYOUT_TABLE.map((payment) => {
          return {
            text: payment + 'x ' + (payment in MULTIPLIER_INDEXES ?
              `<small>${MULTIPLIER_INDEXES[payment]}</small>` : ''),
            highlighted: payment in MULTIPLIER_INDEXES,
            highlightedColour: COLOUR,
          };
        }),
      ]]);
    }
  }
}
