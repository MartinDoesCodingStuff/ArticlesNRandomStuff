/**
 * OTP table and key generator
 * 
 * Copyright (c) 2022 Martin Does Stuff
 */

// Any string must not have any characters outside the allowedCharacters variable
var allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890+/'.split('');

// ASCII extended charset (0-255).
// Not recommended if your computer is weak (takes a minute and 15 seconds on my computer),
// intend this script to be used in mobile devices (again because their processors are weak),
// or you intend to output this to a CSV file (I don't think your spreadsheet software will be happy with control bytes).
// var allowedCharacters = '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'.split('');


/**
 * Generate table
 */
function generateOTPRandtable() {
  /**
   * generateOTPRandTable writes to this array first to ensure unique values
   * across the board. After generation, it the writes to...
   * @type string[]
   */
  var elem_gen = [];

  /**
   * ...this variable. Here is where our formatted table is stored.
   * @type string[][]
   */
  var rand_table = [];

  // generate unique values
  var i_col = 0;
  while (i_col < (allowedCharacters.length * allowedCharacters.length)) {
    let elem = allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)] + allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)];
    if (elem_gen.includes(elem)) continue;
    else {
      elem_gen.push(elem);
      i_col++;
    }
  }

  // format table
  let elem_gen_i = 0;
  for (let tablecol_i = 0; tablecol_i < allowedCharacters.length; tablecol_i++) {
    let t = [];
    for (let tablerow_i = 0; tablerow_i < allowedCharacters.length; tablerow_i++) {
      t.push(elem_gen[elem_gen_i]);
      elem_gen_i += 1;
    }
    rand_table.push(t);
  }
  return rand_table;
}
/**
 * Function to generate a valid key
 * @param {number} strlen 
 */
function generateOTPKey(strlen) {
  var out = '';
  var i = 0;
  var ar = [];
  while (i < strlen) {
    let r = Math.floor(Math.random() * allowedCharacters.length);
    let s = allowedCharacters[r];
    if (ar.includes(s)) continue;
    else {
      ar.push(s);
      i += 1;
    }
  }
  out = ar.join('');
  return out;
}

/**
 * Output generated array as a CSV-compatible file
 * Keep in mind that Excel (or other spreadsheet applications) will try to parse
 * any entry beginning with a "=" or "+" character as a formula and thus result
 * in an error. See the README for more details.
 * @param {string[][]} input - rand_table variable or other similarly formatted versions
 * */
function convertToCSV(input) {
  var out = '';
  var firstRow = ',' + allowedCharacters.map(x => '"' + x + '"').join() + ',\n';
  out += firstRow;
  for (let i = 0; i < input.length; i++) {
    let s = '';
    for (let n = 0; n < input[i].length; n++) s += '"' + input[i][n] + '",';
    out += allowedCharacters[i] + ',' + s + '\n';
  }
  // output_str = out;
  return out;
}

/**
 * Function to output a machine-friendly version of the inputted table.
 * @param {string[][]} input - rand_table variable or other similarly formatted versions
 */
function convertToObject(input) {
  let out = {};
  for (let i = 0; i < input.length; i++) {
    let u = {};
    for (let n = 0; n < input[i].length; n++) {
      u[allowedCharacters[n]] = input[i][n];
    }
    out[allowedCharacters[i]] = u;
  }
  return out;
}

/**
 * Encode string automatically
 * @param {string} input - must not have characters outside of the allowedCharacters table
 * @param {string} key - must be at least longer than the string to be encoded
 * @param {{}} in_table - output of the convertToObject function
 * */
function encodeMessage(input, key, table) {
  if (Object.keys(table).length == 0) {
    console.warn('no table inputted');
    return;
  }
  var string = (input);
  if (string.length > key.length) { console.warn('key length smaller than input length'); return; }

  // Uncomment lines below if expected input string is encoded in base64
  // var equals = string.includes('=') ? string.match(/\=/g).join('') : '';
  // string = string.replace(/\=/g, '');

  var out = '';
  for (let i = 0; i < string.length; i++) {
    out += table[key[i]][string[i]];
  }

  // and if the expected output is base64, append the "equals" variable at the end here.
  return out;
}
