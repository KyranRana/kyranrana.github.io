import BootstrapFormUtils from './Utils/BootstrapFormUtils';

const VERIFIER_FORM_AUTO_SUBMIT_TIMEOUT = 500;

/**
 * Manages verifier form in frontend.
 * @class
 */
export default class VerifierForm {
  /**
   * Constructs a verifier form.
   *
   * @param {Object} FORM_ELEMENT - The form element.
   */
  constructor(FORM_ELEMENT) {
    this.FORM_ELEMENT = FORM_ELEMENT;
    this.FORM_FIELDS_ELEMENT = FORM_ELEMENT.lastElementChild;

    this.FORM_GROUP_ID_ATTRIBUTE_SUFFIX = 'FormGroup';
    this.FORM_INPUT_CACHE = {};

    this.verifierFormAutoSubmitHandlerFunc = null;
  }

  /**
   * Clears all dynamic form fields in form.
   */
  clearFields() {
    this.FORM_FIELDS_ELEMENT.innerHTML = '';
  }

  /**
   * Updates auto submit handler for verifier form to call verify method
   * in success, and error method in error.
   *
   * @param {Closure} VERIFY_METHOD - The verify method.
   * @param {Closure} ERROR_METHOD - The error method.
   */
  updateAutoSubmit(VERIFY_METHOD) {
    const TARGET_ELEMENTS = this.FORM_ELEMENT
        .querySelectorAll('input, .formFields select');

    document.removeEventListener(TARGET_ELEMENTS);
    document.addEventListener(TARGET_ELEMENTS, (EVENT) =>
      this._autoSubmit(EVENT, VERIFY_METHOD, ERROR_METHOD));
  }

  /**
   * Adds a new input field to the verifier form.
   *
   * @param {string} ID_ATTRIBUTE_VALUE - The id attribute value.
   * @param {string} NAME - The name of the input.
   * @param {string} [TYPE='text'] - The type of input.
   * @param {string} [REQUIRED=true] - False if input is optional.
   */
  addInputField(ID_ATTRIBUTE_VALUE, NAME, TYPE = 'text', REQUIRED = true) {
    const LABEL_ELEMENT = BootstrapFormUtils
        .createLabelElement(ID_ATTRIBUTE_VALUE, NAME);

    const INPUT_ELEMENT = BootstrapFormUtils
        .createInputElement(ID_ATTRIBUTE_VALUE, TYPE, REQUIRED);

    this.FORM_FIELDS_ELEMENT.appendChild(
        BootstrapFormUtils.createFormGroupElement(
            ID_ATTRIBUTE_VALUE + this.FORM_GROUP_ID_ATTRIBUTE_SUFFIX,
            LABEL_ELEMENT,
            INPUT_ELEMENT));
  }

  /**
   * Gets input field value from the verifier form.
   *
   * @param {string} ID_ATTRIBUTE_VALUE - The id attribute value.
   * @return {string} The input field value.
   */
  getInputField(ID_ATTRIBUTE_VALUE) {
    return document.getElementById(ID_ATTRIBUTE_VALUE).value;
  }

  /**
   * Adds a new select field to the verifier form.
   *
   * @param {string} ID_ATTRIBUTE_VALUE - The id attribute value.
   * @param {string} NAME - The name of the select.
   * @param {Object[]} OPTIONS - The options for the select.
   * @param {string} OPTIONS[].value - The value for a select option.
   * @param {string} OPTIONS[].text - The text for a select option.
   */
  addSelectField(ID_ATTRIBUTE_VALUE, NAME, OPTIONS) {
    const LABEL_ELEMENT = BootstrapFormUtils
        .createLabelElement(ID_ATTRIBUTE_VALUE, NAME);

    const SELECT_ELEMENT = BootstrapFormUtils
        .createSelectElement(ID_ATTRIBUTE_VALUE, OPTIONS);

    this.FORM_FIELDS_ELEMENT.appendChild(
        BootstrapFormUtils.createFormGroupElement(
            ID_ATTRIBUTE_VALUE + this.FORM_GROUP_ID_ATTRIBUTE_SUFFIX,
            LABEL_ELEMENT,
            SELECT_ELEMENT));
  }

  /**
   * Gets select field value from the verifier form.
   *
   * @param {string} ID_ATTRIBUTE_VALUE - The id attribute value.
   * @return {string} The select field value.
   */
  getSelectField(ID_ATTRIBUTE_VALUE) {
    return document.getElementById(ID_ATTRIBUTE_VALUE).value;
  }

  /**
   * Auto submit handler placeholder.
   *
   * @param {Object} EVENT - The event.
   * @param {Closure} verifyMethod - The verify method.
   * @param {Closure} errorMethod - The error method.
   */
  _autoSubmit(EVENT, verifyMethod, errorMethod) {
    this.verifierFormAutoSubmitHandlerFunc = setTimeout(() => {
      const FORM_ID = EVENT.target.closest('form').id;
      const VERIFIER_FORM_VALIDATOR = new VerifierFormValidator(FORM_ID);

      try {
        VERIFIER_FORM_VALIDATOR.validateInputFieldsNotEmpty();

        verifyMethod();
      } catch (e) {
        errorMethod(e);
      }
    }, VERIFIER_FORM_AUTO_SUBMIT_TIMEOUT);
  }
}
