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

  /**
   * Verifies all numeric input fields in the form have values which comply
   * with their restrictions.
   *
   * @throws {Error} if one of the numeric input fields has a value which
   * does not comply with it's set attributes e.g. A value out of bounds of
   * the set 'min' or 'max', or not within the 'step' range.
   */
  validateNumericInputFields() {
    const INPUT_ELEMENTS = this.FORM_ELEMENT.getElementsByTagName('input');

    for (let i = 0; i < INPUT_ELEMENTS.length; i++) {
      if (INPUT_ELEMENTS[i].required && INPUT_ELEMENTS[i].type === 'number') {
        const MIN = INPUT_ELEMENTS[i].getAttribute('min') || 0;
        const MAX = INPUT_ELEMENTS[i].getAttribute('max') || 1e8;
        const STEP = INPUT_ELEMENTS[i].getAttribute('step') || 1;

        const VALUE = INPUT_ELEMENTS[i].value;
        const LABEL = INPUT_ELEMENTS[i].previousSibling.innerHTML;

        let message = '';

        if (+VALUE < +MIN || +VALUE > +MAX) {
          message = `'${LABEL}' - ${VALUE} is not between ${MIN} and ${MAX}`;
        } else if ((VALUE - MIN) % STEP > 0) {
          message = `'${LABEL}' - value ${VALUE} is not a ${STEP} step interval 
            away from ${MIN}`;
        }

        if (message.length > 0) {
          throw new Error(message);
        }
      }
    }
  }
}

