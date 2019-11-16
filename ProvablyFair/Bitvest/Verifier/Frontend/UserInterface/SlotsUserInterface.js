import Slots from '../../Business/Games/Slots';
import ArrayUtils from '../../Business/Utils/ArrayUtils';

/**
 * Slots user interface.
 * @class
 */
export default class SlotsUserInterface {
  /**
   * Manipulates form for Slots.
   *
   * @param {Object} FORM_INPUT_CACHE - The form input cache.
   */
  static manipulateForm(FORM_INPUT_CACHE) {
    FORM_INPUT_CACHE.clientSeed &&
      (document.getElementById('clientSeed').value =
        FORM_INPUT_CACHE.clientSeed);

    FORM_INPUT_CACHE.serverSeed &&
      (document.getElementById('serverSeed').value =
        FORM_INPUT_CACHE.serverSeed);
  }

  /**
   * Submission handler for Slots.
   *
   * @param {VerifierForm} FORM - The form.
   * @param {VerifierResult} RESULT - The result.
   */
  static verify(FORM, RESULT) {
    const POSITIONS = (new Slots).verify({
      serverSeed: FORM.getInputField('serverSeed'),
      userSeed: FORM.getInputField('userSeed'),
    });

    const REELS = [];
    REELS.push([
      'wild.png', 'etherum.png', 'dash.png', 'petro.png', 'petro.png',
      'wild.png', 'dash.png', 'petro.png', 'pertro.png', 'dash.png',
      'wild.png', 'doge.png', 'litecoin.png', 'doge.png', 'dash.png',
      'bitcoin.png', 'ripple.png', 'petro.png', 'ripple.png', 'petro.png',
      'bitcoin.png', 'litecoin.png', 'litecoin.png', 'doge.png', 'litecoin.png',
      'wild.png', 'petro.png', 'dash.png', 'petro.png', 'ripple.png',
      'diamond.png', 'litecoin.png', 'petro.png', 'ripple.png', 'doge.png',
      'diamond.png', 'ripple.png', 'doge.png', 'dash.png', 'petro.png',
      'bicoin.png', 'dash.png', 'etherum.png', 'etherum.png', 'dash.png',
      'bitcoin.png', 'petro.png', 'etherum.png', 'doge.png', 'etherum.png',
      'bitcoin.png', 'dash.png', 'ripple.png', 'dash.png', 'dash.png',
      'petro.png', 'doge.png', 'doge.png', 'etherum.png', 'ripple.png',
      'litecoin.png', 'etherum.png', 'litecoin.png', 'litecoin.png']);

    REELS.push([
      'wild.png', 'petro.png', 'ripple.png', 'doge.png', 'litecoin.png',
      'petro.png', 'wild.png', 'ripple.png', 'dash.png', 'litecoin.png',
      'litecoin.png', 'dash.png', 'diamond.png', 'etherum.png', 'litecoin.png',
      'litecoin.png', 'etherum.png', 'ripple.png', 'diamond.png', 'petro.png',
      'etherum.png', 'litecoin.png', 'dash.png', 'petro.png', 'bitcoin.png',
      'ripple.png', 'dash.png', 'dash.png', 'dash.png', 'doge.png',
      'bitcoin.png', 'petro.png', 'etherum.png', 'petro.png', 'etherum.png',
      'doge.png', 'bitcoin.png', 'doge.png', 'etherum.png', 'petro.png',
      'ripple.png', 'etherum.png', 'bitcoin.png', 'dash.png', 'etherum.png',
      'litcoin.png', 'doge.png', 'etherum.png', 'bitcoin.png', 'litecoin.png',
      'doge.png', 'petro.png', 'ripple.png', 'petro.png', 'ripple.png',
      'dash.png', 'doge.png', 'dash.png', 'etherum.png', 'dash.png', 'doge.png',
      'petro.png', 'petro.png', 'ripple.png']);

    REELS.push([
      'wild.png', 'petro.png', 'ripple.png', 'ripple.png', 'petro.png',
      'dash.png', 'doge.png', 'wild.png', 'dash.png', 'doge.png', 'dash.png',
      'dash.png', 'etherum.png', 'petro.png', 'diamond.png', 'doge.png',
      'petro.png', 'dash.png', 'petro.png', 'doge.png', 'petro.png',
      'diamond.png', 'litecoin.png', 'petro.png', 'dash.png', 'litecoin.png',
      'litecoin.png', 'doge.png', 'bitcoin.png', 'petro.png', 'doge.png',
      'litecoin.png', 'litecoin.png', 'ripple.png', 'dash.png', 'bitcoin.png',
      'dash.png', 'doge.png', 'petro.png', 'ripple.png', 'petro.png',
      'dash.png', 'bitcoin.png', 'ripple.png', 'dash.png', 'litecoin.png',
      'dash.png', 'petro.png', 'petro.png', 'bitcoin.png', 'petro.png',
      'litecoin.png', 'doge.png', 'dash.png', 'dash.png', 'ripple.png',
      'litecoin.png', 'etherum.png', 'ripple.png', 'ripple.png', 'petro.png',
      'petro.png', 'doge.png', 'etherum.png']);

    REELS.push([
      'wild.png', 'etherum.png', 'dash.png', 'doge.png', 'ripple.png',
      'etherum.png', 'litecoin.png', 'petro.png', 'etherum.png', 'etherum.png',
      'doge.png', 'ripple.png', 'diamond.png', 'doge.png', 'etherum.png',
      'doge.png', 'doge.png', 'petro.png', 'petro.png', 'litecoin.png',
      'ripple.png', 'dash.png', 'dash.png', 'petro.png', 'bitcoin.png',
      'ripple.png', 'doge.png', 'litecoin.png', 'dash.png', 'dash.png',
      'doge.png', 'etherum.png', 'petro.png', 'ripple.png', 'dash.png',
      'doge.png', 'bitcoin.png', 'litecoin.png', 'petro.png', 'dash.png',
      'doge.png', 'petro.png', 'petro.png', 'litecoin.png', 'petro.png',
      'ripple.png', 'dash.png', 'etherum.png', 'bitcoin.png', 'petro.png',
      'petro.png', 'doge.png', 'litecoin.png', 'dash.png', 'litecoin.png',
      'petro.png', 'dash.png', 'ripple.png', 'petro.png', 'ripple.png',
      'litecoin.png', 'dash.png', 'ripple.png', 'dash.png']);

    REELS.push([
      'wild.png', 'etherum.png', 'dash.png', 'doge.png', 'litecoin.png',
      'litecoin.png', 'petro.png', 'dash.png', 'etherum.png', 'petro.png',
      'petro.png', 'doge.png', 'dash.png', 'litecoin.png', 'litecoin.png',
      'ripple.png', 'doge.png', 'ripple.png', 'doge.png', 'etherum.png',
      'bitcoin.png', 'litecoin.png', 'petro.png', 'litecoin.png', 'petro.png',
      'ripple.png', 'litecoin.png', 'dash.png', 'dash.png', 'petro.png',
      'dash.png', 'dash.png', 'doge.png', 'petro.png', 'ripple.png',
      'petro.png', 'dash.png', 'ripple.png', 'dash.png', 'ripple.png',
      'bitcoin.png', 'dash.png', 'doge.png', 'doge.png', 'petro.png',
      'ripple.png', 'ripple.png', 'doge.png', 'dash.png', 'dash.png',
      'etherum.png', 'petro.png', 'petro.png', 'etherum.png', 'litecoin.png',
      'etherum.png', 'ripple.png', 'petro.png', 'petro.png', 'doge.png',
      'doge.png', 'petro.png', 'petro.png', 'dash.png']);

    const CHOSEN_POSITIONS = POSITIONS.map((position, index) => [
      REELS[index][position],
      REELS[index][(position + 1) % REELS[index].length],
      REELS[index][(position + 2) % REELS[index].length],
    ]);

    RESULT.addText(`Chosen positions <span>` +
      `${POSITIONS.sort((a, b) => a - b).join`, `}</span>`);

    for (let i = 0; i < 3; i++) {
      RESULT.addGrid([[
        ...ArrayUtils.generateArrayWithRange(0, 4).map((index) => {
          return {
            text: `<div class='reel-svg'><img src="./Images/Slots/` +
              `${CHOSEN_POSITIONS[index][i]}"/></div>`,
          };
        }),
      ]]);
    }
  }
}
