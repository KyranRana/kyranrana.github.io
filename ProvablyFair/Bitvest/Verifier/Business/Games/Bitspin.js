import GameSeedUtils from '../Utils/GameSeedUtils';

/**
 * Verifies a bitspin game.
 * @class
 */
export default class Bitspin {
  /**
   * Verifies a bitspin game for a given GAME_SEED_DATA object.
   *
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional).
   * @param {string} COLOUR - The chosen colour.
   * @return {float} The chosen wedge.
   */
  verify(GAME_SEED_DATA, COLOUR) {
    return this._getWinningSpot(GAME_SEED_DATA);
  }

  /**
   * Gets winning spot for a given GAME_SEED_DATA object.
   *
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional).
   * @return {integer} The winning spot.
   */
  _getWinningSpot(GAME_SEED_DATA) {
    const DECIMAL_GENERATOR = GameSeedUtils.decimalExtractor(GAME_SEED_DATA, 1);

    return DECIMAL_GENERATOR.next().value + 1;
  }
}
