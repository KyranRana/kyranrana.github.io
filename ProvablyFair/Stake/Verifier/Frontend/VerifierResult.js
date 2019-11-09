/**
 * Manages result in frontend.
 * @class
 */
export default class VerifierResult {
  /**
   * Constructs a result.
   *
   * @param {string} RESULT_ELEMENT - The result element.
   */
  constructor(RESULT_ELEMENT) {
    this.RESULT_ELEMENT = RESULT_ELEMENT;
  }

  /**
   * Removes all content from result.
   *
   * @param {String} TEXT - The text.
   */
  removeAllContent() {
    this.RESULT_ELEMENT.innerHTML = '';
  }

  /**
   * Adds text to result.
   *
   * @param {string} TEXT - The text.
   */
  addText(TEXT) {
    this.RESULT_ELEMENT.insertAdjacentHTML('beforeend',
        `<p>${TEXT}</p>`);
  }

  /**
   * Adds grid to result.
   *
   * @param {Object[]} ROWS - The row.
   * @param {Object[]} COLUMNS[] - The column.
   * @param {string} COLUMNS[].html - The column html.
   * @param {boolean} [COLUMNS[].highlighted=false] - True to highlight column.
   */
  addGrid(ROWS) {
    this.RESULT_ELEMENT.insertAdjacentHTML('beforeend',
        `<div class="customGrid">${ROWS.map((row) => `<div class="row">
        ${row.map((col) =>`<div class="col"><div class="colArea 
          ${col.highlighted ? 'highlighted' : ''}">
          ${col.text}
        </div></div>`).join``}
        </div>`).join``}
        </div>`);
  }

  /**
   * Adds grid to result.
   *
   * @param {integer} SCROLL_WIDTH - The scroll width.
   * @param {Object[]} ROWS - The row.
   * @param {Object[]} COLUMNS[] - The column.
   * @param {string} COLUMNS[].html - The column html.
   * @param {boolean} [COLUMNS[].highlighted=false] - True to highlight column.
   */
  addScrollingGrid(SCROLL_WIDTH, ROWS) {
    this.RESULT_ELEMENT.insertAdjacentHTML('beforeend',
        `<div class="customGrid">${ROWS.map((row) =>
          `<div class="scroll-row-wrapper">
          <div class="scroll-row" style="width:${SCROLL_WIDTH}px">
        ${row.map((col) =>`<div class="scroll-col"><div class="colArea 
          ${col.highlighted ? 'highlighted' : ''}">
          ${col.text}
        </div></div>`).join``}
        </div>`).join``}
        </div>`);
  }
}
