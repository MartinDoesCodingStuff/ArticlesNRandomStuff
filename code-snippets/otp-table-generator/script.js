/**
 * OTP table and key generator
 * 
 * Copyright (c) 2022 Martin Does Stuff
 */


//#region allowedCharacters presets
// Any string to be encoded must not have any characters outside the allowedCharacters variable.
// Characters or numbers work here, as long as Array.includes can find duplicate values,
// otherwise it loops forever.

// Base64 alphabet, excluding equal signs.
// var allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890+/'.split('');

// All alphanumeric characters, including some punctuation and the newline and tab character.
var allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890()\'\"!?,.-\n\t /'.split('');

// All printable characters (including some control characters).
// var allowedCharacters = '\b\t\n\v\f\r !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.split('');

// ASCII extended charset (0-255).
// var allowedCharacters = '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'.split('');

// Numbers from 0-255.
// var allowedCharacters = Array.from(new Array(256), (x, i) => {return i});
//#endregion


/**
 * Generate table
 * @param {boolean} uniquePerRow - If the values should be unique per row of the table
 */
function generateOTPRandtable(uniquePerRow) {
  /**
   * generateOTPRandTable writes to this array first to ensure unique values
   * across the board. After generation, it the writes to...
   * @type string[]|number[]
   */
  var elem_gen = [];

  /**
   * ...this variable. Here is where our formatted table is stored.
   * Note that if uniquePerRow is enabled, the function writes to this
   * variable directly.
   * @type string[][]|number[][]
   */
  var rand_table = [];

  // Have all values in the table to be a unique value
  if (uniquePerRow == false) {

    // generate unique values
    let i_col = 0;
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
  }

  // have each row of the table to have a unique value
  else {
    for (let tablecol_i = 0; tablecol_i < allowedCharacters.length; tablecol_i++) {
      let t = [];
      let tablerow_i = 0;
      while (tablerow_i < allowedCharacters.length) {
        let elem = allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)] + allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)];
        if (t.includes(elem)) continue;
        else {
          t.push(elem); tablerow_i++;
        }
      }
      rand_table.push(t);
    }
  }
  return rand_table;
}

/**
 * Generate a regular table
 */
function generateOTPSanetable() {
  // Array.at polyfill
  Array.prototype.at=typeof Array.prototype.at!="undefined"?Array.prototype.at:function(index){if(index<0){return this[this.length+index];}else{return this[index];}};
  /**@type string[][]|number[][] */
  var rand_table = [];
  for (let col_i = 0; col_i < allowedCharacters.length; col_i++) {
    let t = [];
    for (let row_i = 0; row_i < allowedCharacters.length; row_i++) {
      t.push(allowedCharacters.at(row_i - col_i));
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
  return ar;
}

/**
 * Output generated array as a CSV-compatible file
 * Keep in mind that Excel (or other spreadsheet applications) will try to parse
 * any entry beginning with a "=" or "+" character as a formula and thus result
 * in an error. See the README for more details.
 * @param {string[][]|number[][]} input - rand_table variable or other similarly formatted versions
 * */
function convertToCSV(input) {
  var out = '';
  var firstRow = ',' + allowedCharacters.map(x => '"' + x + '"').join() + ',\n';
  out += firstRow;
  for (let i = 0; i < input.length; i++) {
    let s = '';
    for (let n = 0; n < input[i].length; n++) s += '\"' + input[i][n] + '\",';
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
 * @param in_table - The table used to encode the message, formatted using convertToObject
 * */
function encodeMessage(input, key, table) {
  if (Object.keys(table).length == 0) { console.warn('no table inputted'); return; }
  var string = (input);
  if (string.length < key.length) { console.warn('key length smaller than input length'); return; }

  // Uncomment lines below if you want the function to spit out valid base64
  // var equals = string.includes('=') ? string.match(/\=/g).join('') : '';
  // string = string.replace(/\=/g, '');

  var out = '';
  for (let i = 0; i < string.length; i++) {
    out += table[key[i]][string[i]];
  }

  // and if the expected output must be valid base64, append the "equals" variable at the end here.
  return out;
}

/**
 * Decode string automatically
 * @param {string} input - must not have characters outside of the allowedCharacters table
 * @param {string} key - must be at least longer than the string to be encoded
 * @param in_table - The table used to encode the message, formatted using convertToObject
 * */
function decodeMessage(input, key, table) {
  if (input.length % 2 != 0) { console.warn('string is probably invalid, continuing anyway...'); }

  var string = (input);
  if (string.length < key.length) { console.warn('key length smaller than input length'); return; }

  // Uncomment lines below if you want the function to spit out valid base64
  // var equals = string.includes('=') ? string.match(/\=/g).join('') : '';
  // string = string.replace(/\=/g, '');

  var split_string = string.match(/[\s\S]{2}/g);
  var out = '';
  for (let i = 0; i < split_string.length; i++) {
    let keyRowIndex = Object.keys(table[key[i]]);
    for (let n = 0; n < keyRowIndex.length; n++) {
      if (table[key[i]][keyRowIndex[n]] == split_string[i]) {
        out += keyRowIndex[n];
        break; // probably makes this prone to timing attacks
      }
    }

  }

  // if the expected output is valid base64, append the "equals" variable at the end here.
  return out;
}