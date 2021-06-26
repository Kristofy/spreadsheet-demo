import DropdownItem from './dropdown_item.js';
import DropdownFont from '../dropdown_font.js';

export default class Font extends DropdownItem {
  constructor() {
    super('font-name');
  }

  getValue(it) {
    return it.key;
  }

  dropdown() {
    return new DropdownFont();
  }
}
