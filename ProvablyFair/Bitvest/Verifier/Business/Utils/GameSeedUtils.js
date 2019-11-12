import {sha512} from './Sha512Utils';

/**
 * Provides utility method for extracting hex values from a game seed.
 * @class
 */
export default class GameSeedUtils {
  /**
   * Given a GAME_SEED_DATA object, will keep yielding the binary
   * equivalent of the next N hex values in its HMAC_SHA512 sequence.
   * If we run out of values, the generator will return an string with
   * the remaining hex values.
   *
   * @see {@link https://bitvest.io/results.php?bitspin=1}
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional)
   * @param {integer} N - The N.
   * @yields {string} The binary equivalent of the next N hex values.
   * @throws {Error} If there are no more hex values to fetch.
   */
  static* binaryExtractor(GAME_SEED_DATA, N) {
    yield* GameSeedUtils._extractor(GAME_SEED_DATA, N, 2);
  }

  /**
   * Given a GAME_SEED_DATA object, will keep yielding the decimal
   * equivalent of the next N hex values in its HMAC_SHA512 sequence.
   * If we run out of values, the generator will return an string with
   * the remaining hex values.
   *
   * @see {@link https://bitvest.io/results.php?bitspin=1}
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.clientSeed - The client seed.
   * @param {integer} GAME_SEED_DATA.nonce - The nonce (optional)
   * @param {integer} N - The N.
   * @yields {integer} The decimal equivalent of the next N hex values.
   * @throws {Error} If there are no more hex values to fetch.
   */
  static* decimalExtractor(GAME_SEED_DATA, N) {
    yield* GameSeedUtils._extractor(GAME_SEED_DATA, N, 16);
  }

  /**
   * Given a GAME_SEED_DATA object, will keep yielding the given radix
   * equivalent of the next N hex values in its HMAC_SHA512 sequence.
   * If we run out of values, the generator will return an string with
   * the remaining hex values.
   *
   * @see {@link https://bitvest.io/results.php?bitspin=1}
   * @param {Object} GAME_SEED_DATA - The game seed data.
   * @param {string} GAME_SEED_DATA.serverSeed - The server seed.
   * @param {string} GAME_SEED_DATA.userSeed - The user seed.
   * @param {integer} N - The N.
   * @param {integer} RADIX - The radix.
   * @yields {integer} The radix equivalent of the next N hex values.
   * @throws {Error} If there are no more hex values to fetch.
   */
  static* _extractor({serverSeed, userSeed}, N, RADIX) {
    const HASH = sha512.hmac(userSeed, serverSeed);

    for (let i = 0; i < HASH.length - (HASH.length % N) - 1; i += N) {
      const HEX_VALUES = HASH.substr(i, N);

      if (RADIX === 2) {
        yield (parseInt(HEX_VALUES, 16).toString(2)).padStart(16, '0');
      } else {
        yield parseInt(HEX_VALUES, RADIX);
      }
    }

    yield HASH.substr(-(HASH.length % N));
  }
}
