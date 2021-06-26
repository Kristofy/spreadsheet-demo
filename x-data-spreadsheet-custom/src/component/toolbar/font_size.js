import DropdownItem from './dropdown_item.js';
import DropdownFontsize from '../dropdown_fontsize.js';

export default class Format extends DropdownItem {
  constructor() {
    super('font-size');
  }

  getValue(it) {
    return it.pt;
  }

  dropdown() {
    return new DropdownFontsize();
  }
}
