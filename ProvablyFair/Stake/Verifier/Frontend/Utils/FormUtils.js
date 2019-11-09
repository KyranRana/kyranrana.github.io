/**
 * Provides utility methods to modify a form.
 * @class
 */
export default class FormUtils {
  /**
   * Adds options to select element.
   *
   * @param {Object[]} OPTIONS - The options for the select.
   * @param {string} OPTIONS[].value - The value for a select option.
   * @param {string} OPTIONS[].text - The text for a select option.
   * @param {Object} SELECT_ELEMENT - The select element.
   */
  static addOptionsToSelectElement(OPTIONS, SELECT_ELEMENT) {
    OPTIONS.map((option) => {
      const OPTION_ELEMENT = document.createElement('option');

      OPTION_ELEMENT.value = option.value;
      OPTION_ELEMENT.innerHTML = option.text;

      SELECT_ELEMENT.appendChild(OPTION_ELEMENT);
    });
  }
}
