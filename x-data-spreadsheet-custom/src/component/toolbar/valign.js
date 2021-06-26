import DropdownItem from './dropdown_item.js';
import DropdownAlign from '../dropdown_align.js';

export default class Valign extends DropdownItem {
  constructor(value) {
    super('valign', '', value);
  }

  dropdown() {
    const { value } = this;
    return new DropdownAlign(['top', 'middle', 'bottom'], value);
  }
}
