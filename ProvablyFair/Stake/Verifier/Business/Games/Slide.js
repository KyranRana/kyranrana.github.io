import {sha256} from '../Utils/Sha256Utils';

/**
 * Verifies a slide game.
 * @class
 */
export default class Slide {
  /**
   * Verifies a game of Slide given a hash and client seed.
   *
   * @param {Object} SLIDE_SEED_DATA - Seed data for slide.
   * @param {string} SLIDE_SEED_DATA.hash - The hash.
   * @param {string} SLIDE_SEED_DATA.clientSeed - The client seed.
   * @return {float} The result.
   */
  verify({
    hash,
    clientSeed,
  }) {
    const HEX = sha256.hmac.update(hash, clientSeed).hex();
    const INT = parseInt(HEX.substr(0, 8), 16);

    const HOUSE_EDGE = 0.98;
    const SLIDE_POINT = Math.max(1, (2 ** 32 / (INT + 1)) * HOUSE_EDGE);

    return (Math.floor(SLIDE_POINT * 100) / 100).toFixed(2);
  }
}
