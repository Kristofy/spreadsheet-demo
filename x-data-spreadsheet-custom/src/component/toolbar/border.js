import DropdownItem from './dropdown_item.js';
import DropdownBorder from '../dropdown_border.js';

export default class Border extends DropdownItem {
  constructor() {
    super('border');
  }

  dropdown() {
    return new DropdownBorder();
  }
}
