import ArrayUtils from '../../Business/Utils/ArrayUtils';
import PayoutTables from '../../Business/Games/PayoutTables';
import Wheel from '../../Business/Games/Wheel';

/**
 * Wheel user interface.
 * @class
 */
export default class WheelUserInterface {
  /**
   * Manipulates form for Wheel.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {Object} FORM_INPUT_CACHE - The form input cache.
   */
  static manipulateForm(FORM, FORM_INPUT_CACHE) {
    FORM.addInputField('nonce', 'Nonce', 'number');

    FORM.addSelectField('riskWheel', 'Risk', [
      {value: 'low', text: 'Low'},
      {value: 'medium', text: 'Medium'},
      {value: 'high', text: 'High'},
    ]);

    FORM.addSelectField('segmentsWheel', 'Segments', [
      {value: '10', text: '10'},
      {value: '20', text: '20'},
      {value: '30', text: '30'},
      {value: '40', text: '40'},
      {value: '50', text: '50'},
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

    FORM_INPUT_CACHE.riskWheel &&
      (document.getElementById('riskWheel').value =
        FORM_INPUT_CACHE.riskWheel);

    FORM_INPUT_CACHE.segmentsWheel &&
      (document.getElementById('segmentsWheel').value =
        FORM_INPUT_CACHE.segmentsWheel);
  }

  /**
   * Submission handler for Wheel.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const SEGMENTS = FORM.getSelectField('segmentsWheel');
    const RISK = FORM.getSelectField('riskWheel');

    const PAYOUT_TABLE = ArrayUtils.generateArrayOfUniqueItems(
        PayoutTables.getWheelPayoutTable()[SEGMENTS][RISK]);

    PAYOUT_TABLE.sort((a, b) => a - b);

    const PAYOUT = (new Wheel).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      clientSeed: FORM.getInputField('clientSeed'),
      nonce: FORM.getInputField('nonce'),
    }, SEGMENTS, RISK);

    console.log(PAYOUT);

    RESULT.addText(`Wheel payout: <span>${PAYOUT}x</span>`);

    RESULT.addGrid([[
      ...PAYOUT_TABLE.map((payout) => {
        return {
          text: payout.toFixed(2) + 'x',
          highlighted: payout == PAYOUT,
        };
      }),
    ]]);
  }
}

