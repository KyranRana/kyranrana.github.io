import ArrayUtils from '../../Business/Utils/ArrayUtils';
import PayoutTables from '../../Business/Games/PayoutTables';
import Bitspin from '../../Business/Games/Bitspin';

/**
 * Bitspin user interface.
 * @class
 */
export default class BitspinUserInterface {
  /**
   * Manipulates form for Bitspin.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {Object} FORM_INPUT_CACHE - The form input cache.
   */
  static manipulateForm(FORM, FORM_INPUT_CACHE) {
    FORM.addSelectField('colourBitspin', 'Colour', [
      {value: 'red', text: 'Red'},
      {value: 'orange', text: 'Orange'},
      {value: 'green', text: 'Green'},
      {value: 'teal', text: 'Teal'},
      {value: 'blue', text: 'Blue'},
      {value: 'purple', text: 'Purple'},
    ]);

    FORM_INPUT_CACHE.userSeed &&
      (document.getElementById('userSeed').value =
        FORM_INPUT_CACHE.userSeed);

    FORM_INPUT_CACHE.serverSeed &&
      (document.getElementById('serverSeed').value =
        FORM_INPUT_CACHE.serverSeed);

    FORM_INPUT_CACHE.colourBitspin &&
      (document.getElementById('colourBitspin').value =
        FORM_INPUT_CACHE.colourBitspin);
  }

  /**
   * Submission handler for Bitspin.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const COLOUR = FORM.getSelectField('colourBitspin');

    const WEDGE = (new Bitspin).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      userSeed: FORM.getInputField('userSeed'),
    }, COLOUR);

    RESULT.addText(`Chosen Wedge: <span>${WEDGE}</span>`);

    if (COLOUR !== 'purple') {
      const FULL_PAYOUT_ROW = PayoutTables.getBitspinPayoutTable()[COLOUR];

      const MULTIPLIER = FULL_PAYOUT_ROW[WEDGE - 1];

      const PAYOUT_TABLE = ArrayUtils.generateArrayOfUniqueItems(
          FULL_PAYOUT_ROW);

      PAYOUT_TABLE.sort((a, b) => a - b);

      RESULT.addText(`Winning Payout: <span class="${COLOUR}">
        ${MULTIPLIER}x</span>`);

      RESULT.addGrid([[
        ...PAYOUT_TABLE.map((payment) => {
          return {
            text: payment + 'x',
            highlighted: MULTIPLIER == payment,
            highlightedColour: COLOUR,
          };
        }),
      ]]);
    }
  }
}
