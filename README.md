# sudoku
sudoku puzzle validator

This is a puzzle validator for Sudoku (used as a programming POC), written in JavaScript.

The analysis of the puzzle data is as follows:
1) ensure that each cell has a value between 1 and 9
2) ensure there are 81 cell entries
3) test the sum of ALL cells; this should equal 405 >> (9 * (1+2+3+4+5+6+7+8+9))
4) test each ROW of the cell matrix; this should equal 45 >> (1+2+3+4+5+6+7+8+9)
5) test each COLUMN of the cell matrix; this should again equal 45 >> (1+2+3+4+5+6+7+8+9)
6) test each CUBE (sub-block of 9 cells); again, each cube should total 45>> (1+2+3+4+5+6+7+8+9)

The anaysis is done stepwise, using an OR operator -- so that the evaluation terminates (kicks-out) as soon as a
fault is found in the data. (Data is loaded at the very begining of the code via an Array literal)

Note: summation is used in place of Hashtable look-ups due ot the fact it is MUCH faster; the downside of summation is
that the data has to be looked at from a number of different vector-points, so there is SOME minimal performance hit
in the cases where data is valid (ie, a complete analysis has to take place). However, for the data size, this is a
moot point, and it has the benefit of shallow kick-out tests.
