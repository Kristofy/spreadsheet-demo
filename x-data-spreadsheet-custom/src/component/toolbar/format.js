import DropdownItem from './dropdown_item.js';
import DropdownFormat from '../dropdown_format.js';

export default class Format extends DropdownItem {
  constructor() {
    super('format');
  }

  getValue(it) {
    return it.key;
  }

  dropdown() {
    return new DropdownFormat();
  }
}
