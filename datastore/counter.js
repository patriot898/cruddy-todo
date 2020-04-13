const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

//just takes a number and adds padded zeros up to 5 digits

//added


const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

//takes a callback, reads the number in the file

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};


const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

//should read the data from the counterFile and set the counter to that
//increment it by one
//then write that new number to the counter file
exports.getNextUniqueId = (callback) => {
  let err = null;
  let id = 0;
  //should not use global counter
  //should run asynchronously
  //nest functions within others
  readCounter((error, fileData) => {
    writeCounter(fileData + 1, (error, newId) => {
      id = newId;
      err = error;
      callback(err, id);
    }
    );
  });

};








// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
