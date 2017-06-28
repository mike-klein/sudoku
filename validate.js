var values =  "1,2,3,4,5,6,7,8,9," +
              "4,5,6,7,8,9,1,2,3," +
              "7,8,9,1,2,3,4,5,6," +
              "2,3,4,5,6,7,8,9,1," +
              "5,6,7,8,9,1,2,3,4," +
              "8,9,1,2,3,4,5,6,7," +
              "3,4,5,6,7,8,9,1,2," +
              "6,7,8,9,1,2,3,4,5," +
              "9,1,2,3,4,5,6,7,8";

var cells = [];
var puz = {};
var validator = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9;
var log = false;  // <------------- set to true/fasle for on-screen logging

// do a complete sum-check
puz.CheckRanges = function() {
  var tokens = values.split(",");
  var sum = 0;  // sum holder
  var i = 0; // int value 
  var oorFlag = false;  // out-of-range flage (set when a data value is in range of 1 to 9)

  tokens.forEach(function(c) {
    if(log) console.log(c);

    i = parseInt(c);
    if((i < 1) || (i > 9)) {
      oorFlag = true;
    } else {
      cells.push(i);
      sum += i;
    }
  });

  // check for out-of-range flag
  if(oorFlag) {
    if(log) console.log("Cell value is out of range (1-9): " + i);
    return false;
  }

  // the sum-total of ALL cells should add up to (9 * (sum 1 to 9))
  if(sum != 9 * validator) {
    if(log) console.log("Invalid Sum-total: " + sum);
    return false;
  };
  return true;
};

puz.CheckCount = function() {
    // there should be 81 entries in the 'cells' array...
  if(cells.length != 81) {
    if(log) console.log("There is an invalid number of cell entries: " + cells.length);
    return false;
  }
  return true;
}

// each (and every) row should add up to 'validator'
puz.CheckRows = function() {
  var x, y, sum; // counter

  for(y = 1; y <= 9; y++) {
    sum = 0 // zero each row-sum
    for(x = 1; x <= 9; x++) {
      // remember that JS arrays are zero-based, so subtract one from index-pointers
      sum += cells[((y-1) * 9) + (x - 1)]
    }
    if(log) console.log("Sum of Row #" + y + " = " + sum);
    if(sum != validator) return false;
  }
  return true; 
}

// each (and every) row should add up to 'validator'
puz.CheckCols = function() {
  var x, y, sum; // counter

  for(x = 1; x <= 9; x++) {
    sum = 0 // zero each row-sum
    for(y = 1; y <= 9; y++) {
      // remember that JS arrays are zero-based, so subtract one from index-pointers
      sum += cells[(x-1) + ((y-1) * 9)]
    }
    if(log) console.log("Sum of Column #" + x + " = " + sum);
    if(sum != validator) return false;
  }
  return true; 
}

// 'cubes' are defined as each individual 3x3 block (of which there are 9)
puz.CheckCubes = function() {
  var cubePointers = [1,4,7,   28,31,34,  55,58,61];
  var cubeMap = [0,1,2,  9,10,11,  18,19,20];
  var sum, cCube = 0;
  var rv = true;  // reutrn value of f(x)

  cubePointers.forEach(function(ptr) {
    // cubePointer point to the upper-leftmost cell of each block
    // cubeMap contains the offsets for the ALL 9 cells in that particular cube
    // cubes are "indexed" starting with the upper-left
    sum = 0;
    cCube ++;

    cubeMap.forEach(function(offset) {
      // again, remember that cells are zero-based...so adjust the cubePointer
      sum += cells[(ptr - 1) + offset];
    })

    if(log) console.log("Cube #" + cCube + " has sum: " + sum);
    if(sum != validator) rv = false;    // set flag (easier than logic for kickout from anonymous function)
  });
  return rv;
};

// RUN entry-point
// step-tests (kickout @ first False)
if (!puz.CheckRanges() || !puz.CheckCount() || !puz.CheckRows() || !puz.CheckCols() || !puz.CheckCubes()) {
        console.log("False");
} else {
        console.log("True");
}