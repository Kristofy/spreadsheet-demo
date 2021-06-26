import { Element } from './element.js';
import { cssPrefix } from '../config.js';
import { t } from '../locale/locale.js';

export default class Button extends Element {
  // type: primary
  constructor(title, type = '') {
    super('div', `${cssPrefix}-button ${type}`);
    this.child(t(`button.${title}`));
  }
}
