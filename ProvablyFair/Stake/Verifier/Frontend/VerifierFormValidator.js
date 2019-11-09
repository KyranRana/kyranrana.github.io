/**
 * Validates verifier form.
 * @class
 */
export default class VerifierFormValidator {
  /**
   * Validates a verifier form.
   *
   * @param {string} FORM_ELEMENT - The form element.
   */
  constructor(FORM_ELEMENT) {
    this.FORM_ELEMENT = FORM_ELEMENT;
  }

  /**
   * Verifies all input fields in the form have got a value.
   *
   * @throws {Error} if one of the input fields is missing a value.
   */
  validateInputFieldsNotEmpty() {
    const INPUT_ELEMENTS = this.FORM_ELEMENT.getElementsByTagName('input');

    for (let i = 0; i < INPUT_ELEMENTS.length; i++) {
      if (INPUT_ELEMENTS[i].required && INPUT_ELEMENTS[i].value === '') {
        throw new Error('Please fill in all required fields');
      }
    }
  }
}
