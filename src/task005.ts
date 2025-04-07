import { SpiralOut } from './task005.utils'

/**
 * ### TODO 🤔🧐🧠💭💡
 * Remove the example code and implement this function
 */
export const spiral = (n: number): void => {
  switch (n) {
    case 0: {
      SpiralOut.printLine('* ')
      SpiralOut.tSpace({ charsPerLine: 3, lines: 1 })
      return
    }
    case 1: {
      SpiralOut.printLine('* * * * * ')
      SpiralOut.printLine('*       * ')
      SpiralOut.printLine('*   *   * ')
      SpiralOut.printLine('*   * * * ')
      SpiralOut.printLine('*         ')
      SpiralOut.tSpace({ charsPerLine: 11, lines: 5 })
      return
    }
    case 2: {
      SpiralOut.printLine('* * * * * * * * * ')
      SpiralOut.printLine('*               * ')
      SpiralOut.printLine('*   * * * * *   * ')
      SpiralOut.printLine('*   *       *   * ')
      SpiralOut.printLine('*   *   *   *   * ')
      SpiralOut.printLine('*   *   * * *   * ')
      SpiralOut.printLine('*   *           * ')
      SpiralOut.printLine('*   * * * * * * * ')
      SpiralOut.printLine('*                 ')
      SpiralOut.tSpace({ charsPerLine: 19, lines: 9 })
      return
    }
    default: {
      SpiralOut.printLine('The spicy 🌶️ burrito 🌯')
      SpiralOut.tSpace({ charsPerLine: 0, lines: 0 })
      return
    }
  }
}
