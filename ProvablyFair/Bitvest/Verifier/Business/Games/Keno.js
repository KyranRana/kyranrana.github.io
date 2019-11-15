import GameSeedUtils from '../Utils/GameSeedUtils';

/**
 * Verifies a keno game.
 * @class
 */
export default class Keno {
  /**
   * Verifies a keno game by returning the 10 tiles for a given GAME_SEED_DATA
   * object.
   *
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional).
   * @return {integer[]} The tiles
   */
  verify(GAME_SEED_DATA) {
    return this._getWinningTiles(GAME_SEED_DATA);
  }

  /**
   * Gets the 20 winning tiles for a GAME_SEED_DATA object.
   *
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional).
   * @return {integer[]} The winning tiles
   */
  _getWinningTiles(GAME_SEED_DATA) {
    const DECIMAL_GENERATOR = GameSeedUtils.decimalExtractor(GAME_SEED_DATA, 2);
    const WINNING_TILES = [];

    while (WINNING_TILES.length < 20) {
      let decimal = DECIMAL_GENERATOR.next().value;

      if (!Number.isInteger(decimal)) {
        console.log('we have run out of hex values!');
        break;
      }

      if (decimal < 240) {
        decimal = decimal % 80 + 1;

        if (WINNING_TILES.indexOf(decimal) === -1) {
          WINNING_TILES.push(decimal);
        }
      }
    }

    return WINNING_TILES;
  }
}
