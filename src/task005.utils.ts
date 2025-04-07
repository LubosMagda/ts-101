//*******************************************
//***** DO NOT CHANGE CODE IN THIS FILE *****
//********** REQUIRED FOR TESTING ***********
//*******************************************

/**
 * Represents the output terminal
 */
export namespace SpiralOut {
  /**
   * Use this function to print a line of the spiral (new line will be appended automatically).
   *
   * @param s String to be displayed
   */
  export const printLine = (s: string): void => console.log(s)

  /**
   * ### Space complexity
   * The amount of space or memory taken by an algorithm to run as a function of the length of the input.
   *
   * ##### Note
   * For space complexity,
   * specify the number of characters per each line of the spiral output
   * (including the new line character, assume unix/linux system) and
   * the number of lines of the spiral output.
   *
   * @param tSpace
   */
  export const tSpace = (tSpace: { charsPerLine: number; lines: number }): void =>
    console.error('## T_space:', tSpace.charsPerLine, '(chars/line) x', tSpace.lines, '(lines) =', tSpace.charsPerLine * tSpace.lines, 'bytes')
}
