import GameSeedUtils from '../Utils/GameSeedUtils';

/**
 * Verifies a dice game.
 * @class
 */
export default class Dice {
  /**
   * Verifies a dice game for a given GAME_SEED_DATA object.
   *
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional).
   * @return {integer} The roll number.
   */
  verify(GAME_SEED_DATA) {
    return this._getWinningNumber(GAME_SEED_DATA);
  }

  /**
   * Gets the winning number for a given GAME_SEED_DATA object.
   *
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional).
   * @return {integer} The roll number.
   */
  _getWinningNumber(GAME_SEED_DATA) {
    const DECIMAL_GENERATOR = GameSeedUtils.decimalExtractor(GAME_SEED_DATA, 5);

    let winningNumber = null;

    while (winningNumber === null) {
      const ROLL_NUMBER = DECIMAL_GENERATOR.next().value;

      if (!Number.isInteger(ROLL_NUMBER)) {
        winningNumber = 0;
      } else if (ROLL_NUMBER <= 999999) {
        winningNumber = ROLL_NUMBER / 10000;
      }
    }

    return winningNumber;
  }
}
