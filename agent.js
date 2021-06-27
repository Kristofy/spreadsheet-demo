import Spreadsheet from "./x-data-spreadsheet-custom/src/index.js";
import { CellRange } from "./x-data-spreadsheet-custom/src/core/cell_range.js";

class Agent {

  static instance = Agent.Init();

  static Init() {
    return new Agent();
  }

  constructor() {
    const options = {
      mode: 'edit', // edit | read
      showToolbar: false, // toolbar
      showGrid: true, // separator lines between cells
      showContextmenu: true, // right click
      view: {
        height: () => document.documentElement.clientHeight * 0.9,
        width: () => document.documentElement.clientWidth * 0.9,
      },
      row: {
        len: 10000, // could be dynamic based on the SQL query
        height: 25,
      },
      col: {
        len: 365, // should be changed
        width: 100,
        indexWidth: 60,
        minWidth: 60,
      },
      style: {
        bgcolor: '#ffffff',
        align: 'left',
        valign: 'middle',
        textwrap: false,
        strike: false,
        underline: false,
        color: '#0a0a0a',
        font: {
          name: 'Helvetica',
          size: 10,
          bold: false,
          italic: false,
        },
      },
    };

    this.spreadsheet = new Spreadsheet("#x-spreadsheet-demo", options)
      .loadData({}) // TODO find out the expected format
      .change(data => {
        console.log(data); // only for debug
      });

    this.sheet = this.spreadsheet.datas[0];

    this.freeze(1, 1); // lock the first row and column

    window.s = this.spreadsheet; // only for debug
  }

  freeze(x, y) {
    this.sheet.freeze = [x, y]; // fix the first row and first column
  }

  write(x, y, text) {
    this.sheet.setCellTextWOhistory(y, x, text);
    this.reRender();
  }

  // use if a single row is merged, and you want to write sg. in the merged cell,
  // then write something new inside the merged cell, and want to keep the original cell
  // merged in it's unchanged intervall, and this cell merged in the remaning intervall
  // like : | some text         |    =>    | some text   | new text  |
  writeInHorizontalRow(x, y, text) {
    const range = this.sheet.getCellRange(y, x);
    if (range.eri !== range.sri) return; // isn't a single row merged

    if (range.sci === x) { // if whole merged cell is rewritten & also includes single cell
      this.write(x, y, text);
    } else { // if has to be divided
      this.unmerge(x, y);
      this.merge(range.sci, range.sri, x - 1, range.eri);
      this.merge(x, range.sri, range.eci, range.eri);
      this.write(x, y, text);
    }
  }

  merge(startX, startY, endX, endY) {
    this.sheet.mergeXY(new CellRange(startY, startX, endY, endX));
    this.reRender();
  }

  unmerge(x, y) {
    this.sheet.unmergeXY(x, y);
  }

  getCell(x, y) {
    let range = this.sheet.getCellRange(y, x);
    return this.sheet.getCellXY(range.sci, range.sri);
  }

  setWidth(y, width) {
    this.sheet.setColWidth(y, width);
    this.reRender();
  }

  reRender() { this.spreadsheet.reRender() }



  static reRender = Agent.instance.reRender.bind(Agent.instance);
  static freeze = Agent.instance.freeze.bind(Agent.instance);
  static write = Agent.instance.write.bind(Agent.instance);
  static writeInHorizontalRow = Agent.instance.writeInHorizontalRow.bind(Agent.instance);
  static merge = Agent.instance.merge.bind(Agent.instance);
  static setWidth = Agent.instance.setWidth.bind(Agent.instance);
}


export default Agent;