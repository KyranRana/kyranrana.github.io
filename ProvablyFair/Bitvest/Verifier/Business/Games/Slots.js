import GameSeedUtils from '../Utils/GameSeedUtils';

/**
 * Verifies a slots game.
 * @class
 */
export default class Slots {
  /**
   * Verifies a slots game for a given GAME_SEED_DATA object.
   *
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional).
   * @return {integer[]} The reel positions.
   */
  verify(GAME_SEED_DATA) {
    return this._getReelPositions(GAME_SEED_DATA);
  }

  /**
   * Gets the reel positions for a given GAME_SEED_DATA object.
   *
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional).
   * @return {integer} The reel positions.
   */
  _getReelPositions(GAME_SEED_DATA) {
    const DECIMAL_GENERATOR = GameSeedUtils.decimalExtractor(GAME_SEED_DATA, 2);
    const REEL_POSITIONS = [];

    while (REEL_POSITIONS.length < 5) {
      REEL_POSITIONS.push(DECIMAL_GENERATOR.next().value % 64);
    }

    return REEL_POSITIONS;
  }
}
