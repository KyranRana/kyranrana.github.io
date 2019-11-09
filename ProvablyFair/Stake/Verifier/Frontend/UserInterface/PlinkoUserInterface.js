import ArrayUtils from '../../Business/Utils/ArrayUtils';
import PayoutTables from '../../Business/Games/PayoutTables';
import Plinko from '../../Business/Games/Plinko';

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
    FORM.addInputField('nonce', 'Nonce', 'number');

    FORM.addSelectField('riskPlinko', 'Risk', [
      {value: 'low', text: 'Low'},
      {value: 'medium', text: 'Medium'},
      {value: 'high', text: 'High'},
    ]);

    FORM.addSelectField('rowsPlinko', 'Rows', [
      {value: '8', text: '8'},
      {value: '9', text: '9'},
      {value: '10', text: '10'},
      {value: '11', text: '11'},
      {value: '12', text: '12'},
      {value: '13', text: '13'},
      {value: '14', text: '14'},
      {value: '15', text: '15'},
      {value: '16', text: '16'},
    ]);

    FORM_INPUT_CACHE.clientSeed &&
      (document.getElementById('clientSeed').value =
        FORM_INPUT_CACHE.clientSeed);

    FORM_INPUT_CACHE.serverSeed &&
      (document.getElementById('serverSeed').value =
        FORM_INPUT_CACHE.serverSeed);

    FORM_INPUT_CACHE.nonce &&
      (document.getElementById('nonce').value =
        FORM_INPUT_CACHE.nonce);

    FORM_INPUT_CACHE.riskPlinko &&
      (document.getElementById('riskPlinko').value =
        FORM_INPUT_CACHE.riskPlinko);

    FORM_INPUT_CACHE.rowsPlinko &&
      (document.getElementById('rowsPlinko').value =
        FORM_INPUT_CACHE.rowsPlinko);
  }

  /**
   * Submission handler for Plinko.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const ROWS = FORM.getSelectField('rowsPlinko');
    const RISK = FORM.getSelectField('riskPlinko');

    const FULL_PAYOUT_TABLE = PayoutTables.getPlinkoPayoutTable()[ROWS][RISK];

    const DIRECTIONS = (new Plinko).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
      nonce: FORM.getInputField('nonce'),
    }).slice(0, ROWS);

    let payout;

    if (DIRECTIONS[0] === 'LEFT') {
      payout = FULL_PAYOUT_TABLE[
          DIRECTIONS.filter((direction) => direction === 'RIGHT').length];
    } else {
      payout = FULL_PAYOUT_TABLE[FULL_PAYOUT_TABLE.length -
        DIRECTIONS.filter((direction) => direction === 'LEFT').length - 1];
    }

    const PAYOUT_TABLE = ArrayUtils.generateArrayOfUniqueItems(
        FULL_PAYOUT_TABLE);

    PAYOUT_TABLE.sort((a, b) => a - b);

    RESULT.addText(`Plinko payout: <span>${payout}x</span>`);
    RESULT.addText(`Plinko directions: <span>${DIRECTIONS.map((direction) =>
      direction.toLowerCase()).join(', ')}</span>`);

    RESULT.addGrid([[
      ...PAYOUT_TABLE.map((payment) => {
        return {
          text: payment + 'x',
          highlighted: payout == payment,
        };
      }),
    ]]);
  }
}
