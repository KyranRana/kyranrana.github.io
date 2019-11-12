/**
 * Stores payout tables for games.
 * @class
 */
export default class PayoutTables {
  /**
   * Returns payout table for bitspin.
   *
   * @return {Object} Bitspin payout table.
   */
  static getBitspinPayoutTable() {
    return {
      'red': [15, 0, 0, 0, 0.11, 0, 0, 0, 0.5, 0, 0, 0, 0.11, 0, 0, 0],
      'orange': [7, 0, 0.11, 0, 0.5, 0, 0.25, 0, 7, 0, 0.25, 0, 0.5, 0,
        0.11, 0],
      'green': [5, 0.1, 1.2, 0.1, 1.2, 0.1, 2, 0.07, 2, 0.05, 1.2, 0.1, 1.2,
        0.1, 1.2, 0.1],
      'teal': [3, 0, 2, 0, 1, 0, 2, 0, 3, 0, 2, 0, 1, 0, 1.72, 0],
      'blue': [2, 0, 3, 0, 4, 0, 5, 0, 1, 0, 0.2, 0, 0.32, 0, 0.2, 0],
    };
  }

  /**
   * Returns payout table for plinko.
   *
   * @return {Object} Plinko payout table.
   */
  static getPlinkoPayoutTable() {
    return {
      'red': [1111, 111, 22.7, 7.77, 4, 2, 0.26, 0.25, 0.2, 0.25, 0.26, 2, 4,
        7.77, 22.7, 111, 1111],
      'orange': [444, 55, 15.5, 6, 3.5, 1.5, 0.7, 0.5, 0.22, 0.5, 0.7, 1.5,
        3.5, 6, 15.5, 55, 444],
      'green': [111, 44.4, 11, 5, 3, 1.2, 1.01, 0.6, 0.25, 0.6, 1.01, 1.2,
        3, 5, 11, 44.4, 111],
      'teal': [33, 11, 3.3, 1.8, 1.3, 1.14, 1.11, 1.03, 0.4, 1.03, 1.11, 1.14,
        1.3, 1.8, 3.3, 11, 33],
      'blue': [4, 4, 2, 0.25, 0, 0.1, 0, 1.05, 3, 1.05, 0, 0.1, 0, 0.25, 2, 4,
        4],
    };
  }
}
