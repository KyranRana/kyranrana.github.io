/* eslint-disable max-len */
import FormUtils from './FormUtils';

/**
 * Provides utility methods to modify a bootstrap form.
 * @class
 */
export default class BootstrapFormUtils {
  /**
   * Creates a bootstrap form group div element with given input parameters.
   *
   * @param {string} ID_ATTRIBUTE_VALUE - The id attribute value.
   * @param {Object} LABEL_ELEMENT - The label element.
   * @param {Object} INPUT_ELEMENT - The input element (Input or Select).
   * @return {Object} The form group div element.
   */
  static createFormGroupElement(ID_ATTRIBUTE_VALUE, LABEL_ELEMENT, INPUT_ELEMENT) {
    const FORM_GROUP_ELEMENT = document.createElement('div');

    FORM_GROUP_ELEMENT.setAttribute('id', ID_ATTRIBUTE_VALUE);
    FORM_GROUP_ELEMENT.setAttribute('class', 'form-group');

    FORM_GROUP_ELEMENT.appendChild(LABEL_ELEMENT);
    FORM_GROUP_ELEMENT.appendChild(INPUT_ELEMENT);

    return FORM_GROUP_ELEMENT;
  }

  /**
   * Creates a bootstrap label element with given input parameters.
   *
   * @param {string} FOR_ATTRIBUTE_VALUE - The for attribute value.
   * @param {string} NAME - The name of the label.
   * @return {Object} The label element.
   */
  static createLabelElement(FOR_ATTRIBUTE_VALUE, NAME) {
    const LABEL_ELEMENT = document.createElement('label');

    LABEL_ELEMENT.setAttribute('for', FOR_ATTRIBUTE_VALUE);
    LABEL_ELEMENT.innerHTML = NAME;

    return LABEL_ELEMENT;
  }

  /**
   * Creates a bootstrap input element with given input parameters.
   *
   * @param {string} ID_ATTRIBUTE_VALUE - The id attribute value.
   * @param {string} TYPE - The type.
   * @param {boolean} REQUIRED - True if required.
   * @param {string} TEXT - The text.
   * @return {Object} The input element.
   */
  static createInputElement(ID_ATTRIBUTE_VALUE, TYPE, REQUIRED) {
    const INPUT_ELEMENT = document.createElement('input');

    INPUT_ELEMENT.setAttribute('id', ID_ATTRIBUTE_VALUE);
    INPUT_ELEMENT.setAttribute('type', TYPE || 'text');
    INPUT_ELEMENT.setAttribute('class', 'form-control');
    INPUT_ELEMENT.required = REQUIRED;

    return INPUT_ELEMENT;
  }

  /**
   * Creates a bootstrap select element with given input parameters.
   *
   * @param {string} ID_ATTRIBUTE_VALUE - The id attribute value.
   * @param {Object[]} OPTIONS - The options for the select.
   * @param {string} OPTIONS[].value - The value for a select option.
   * @param {string} OPTIONS[].text - The text for a select option.
   * @return {Object} The select element.
   */
  static createSelectElement(ID_ATTRIBUTE_VALUE, OPTIONS) {
    const SELECT_ELEMENT = document.createElement('select');

    SELECT_ELEMENT.setAttribute('id', ID_ATTRIBUTE_VALUE);
    SELECT_ELEMENT.setAttribute('class', 'form-control');

    FormUtils.addOptionsToSelectElement(OPTIONS, SELECT_ELEMENT);

    return SELECT_ELEMENT;
  }
}
