import GameSeedUtils from '../Utils/GameSeedUtils';

/**
 * Verifies a roulette game.
 * @class
 */
export default class Roulette {
  /**
   * Verifies a roulette game for a given GAME_SEED_DATA object.
   *
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional).
   * @return {integer} The winning number.
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
   * @return {integer} The winning number.
   */
  _getWinningNumber(GAME_SEED_DATA) {
    const DECIMAL_GENERATOR = GameSeedUtils.decimalExtractor(GAME_SEED_DATA, 2);

    let winningNumber = null;

    while (winningNumber === null) {
      const WINNING_NUMBER = DECIMAL_GENERATOR.next().value;

      if (!Number.isInteger(WINNING_NUMBER)) {
        winningNumber = 0;
      } else if (WINNING_NUMBER <= 221) {
        winningNumber = WINNING_NUMBER % 37;
      }
    }

    return winningNumber;
  }
}
