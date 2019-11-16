import GameSeedUtils from '../Utils/GameSeedUtils';

/**
 * Verifies a plinko game.
 * @class
 */
export default class Plinko {
  /**
   * Verifies a plinko game for a given GAME_SEED_DATA object.
   *
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional).
   * @param {integer} DROPS - The number of bits.
   * @return {string[]} The directions.
   */
  verify(GAME_SEED_DATA, DROPS) {
    return this._getDirections(GAME_SEED_DATA, DROPS);
  }

  /**
   * Gets the directions given a GAME_SEED_DATA object.
   *
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional).
   * @param {integer} DROPS - The number of drops.
   * @return {string[]} The directions.
   */
  _getDirections(GAME_SEED_DATA, DROPS) {
    const BINARY_GENERATOR = GameSeedUtils.binaryExtractor(GAME_SEED_DATA, 4);
    const DIRECTION_OF_BITS = [];

    while (DIRECTION_OF_BITS.length < DROPS) {
      const BINARY = BINARY_GENERATOR.next().value;

      const DIRECTIONS = [...BINARY].map((binary) =>
        binary == 0 ? 'LEFT' : 'RIGHT');

      DIRECTION_OF_BITS.push(DIRECTIONS);
    }

    return DIRECTION_OF_BITS;
  }
}
