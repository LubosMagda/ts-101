import { expect } from 'chai'

describe('Generators', () => {
  describe('Intro & Applications', () => {
    // https://youtu.be/gu3FfmgkwUc
  })

  describe('Elementary', () => {
    describe('Genesis', () => {
      /**
       * So... what is a generator (function)?
       */

      it('function declaration', async () => {
        function* genFunction() {}

        const genObject = genFunction()
      })

      it('anonymous function expression', async () => {
        const genFunction = function* () {}

        const genObject = genFunction()
      })

      it('anonymous function expression call', async () => {
        const genObject = (function* () {})()
      })

      it('method definition', async () => {
        const obj = {
          *genFunction1() {},
          genFunction2: function* () {},
        }

        const genObject1 = obj.genFunction1()
        const genObject2 = obj.genFunction2()
      })

      it('arrow function', async () => {
        // nope
      })
    })

    describe('Consumption', () => {
      /** Learnings so far:
       * - generator function is just a (fancy) fn
       */

      describe('sync', () => {
        function* genFunction(): Generator<string> {
          yield '🚀'
          yield '🏃'
          return '🏁'
        }

        it('iterate manually', () => {
          /** Generator is an *Iterator*
           *
           *  interface Iterable {
           *      [Symbol.iterator]() : Iterator;
           *  }
           *
           *  interface Iterator {
           *      next() : IteratorResult;
           *  }
           *
           *  interface IteratorResult {
           *      value: any;
           *      done: boolean;
           *  }
           */
          console.log('>>>', 'genFunction()')
          const genObject = genFunction()
          console.log('>>>', 'next()', '1')
          console.log(genObject.next())
          console.log('>>>', 'next()', '2')
          console.log(genObject.next())
          console.log('>>>', 'next()', '3')
          console.log(genObject.next())
          console.log('>>>', 'next()', '4')
          console.log(genObject.next())
        })

        it('for-of loop', () => {
          for (const genValue of genFunction()) {
            console.log(genValue)
          }
        })

        it('spread', async () => {
          console.log([...genFunction()])
          console.log(Array.from(genFunction()))
        })
      })

      describe('async', () => {
        async function* genFunction(): AsyncGenerator<string> {
          yield '🚀'
          yield '🏃'
          yield '🏁'
        }

        it('iterate manually', async () => {
          console.log('>>>', 'genFunction()')
          const genObject = genFunction()
          console.log('>>>', 'next()', '1')
          console.log(await genObject.next())
          console.log('>>>', 'next()', '2')
          console.log(await genObject.next())
          console.log('>>>', 'next()', '3')
          console.log(await genObject.next())
          console.log('>>>', 'next()', '4')
          console.log(await genObject.next())
        })

        it('for-of loop', async () => {
          for await (const genValue of genFunction()) {
            console.log(genValue)
          }
        })

        it('spread', async () => {
          // 🤷‍
        })
      })
    })

    describe('Properties', () => {
      /** Learnings so far:
       * - generator fn that returns an iterator
       */

      it('pausable', () => {
        /**
         * yield pauses & return closes a generator
         * 👀 >>> observe the generator state
         */
        const genFunction = function* (): Generator<void, void, void> {
          console.log('✨', '#️⃣')
          yield
          console.log('✨', '1️⃣')
          yield
          console.log('✨', '2️⃣')
          return
          console.log('✨', '*️⃣')
          yield
        }

        console.log('call', '0', 'genFunction()')
        const genObject = genFunction()
        console.log('call', '1', 'next()')
        console.log(genObject.next())
        console.log('call', '2', 'next()')
        console.log(genObject.next())
        console.log('call', '3', 'next()')
        console.log(genObject.next())
        console.log('call', '4', 'next()')
        console.log(genObject.next())
      })

      it('pausable again', () => {
        const genFunction = function* (): Generator<number, void, void> {
          for (let n = 0; true; n++) {
            console.log('before')
            yield 3 * n + 1
            console.log('after')
          }
        }

        console.log('call', '0', 'genFunction()')
        const genObject = genFunction()
        console.log('call', '1', 'next()')
        console.log(genObject.next())
        console.log('call', '2', 'next()')
        console.log(genObject.next())
        console.log('call', '3', 'next()')
        console.log(genObject.next())
        console.log('call', '4', 'next()')
        console.log(genObject.next())
      })

      it('producer', () => {
        /**
         * yield 'generator output'
         * (from the perspective of a generator consumer)
         */
        /**
         *  interface Generator<YIELD, RETURN, NEXT> extends Iterator {
         *      next(NEXT): IteratorResult;
         *      [Symbol.iterator](): Generator<YIELD, RETURN, NEXT>;
         *  }
         */
        const genFunction = function* (): Generator<string, string, void> {
          yield '🐭'
          yield '🐱'
          return '🐶'
        }

        const genObject = genFunction()
        console.log(genObject.next())
        console.log(genObject.next())
        console.log(genObject.next())
      })

      it('consumer', () => {
        /**
         * const generatorInput = yield
         * (from the perspective of a generator consumer)
         */
        /**
         *  interface Generator<YIELD, RETURN, NEXT> extends Iterator {
         *      next(NEXT): IteratorResult;
         *      [Symbol.iterator](): Generator<YIELD, RETURN, NEXT>;
         *  }
         */
        const genFunction = function* (): Generator<void, void, string> {
          const value = yield
          console.log(value)

          console.log(yield)
        }

        const genObject = genFunction()
        console.log(genObject.next('🥦'))
        console.log(genObject.next('🍄'))
        console.log(genObject.next('🌽'))
      })

      it('closure', () => {
        /**
         * Because Generator fn is a Function
         */
        let context = '🥕'
        const genFunction = function* (arg: string): Generator<string> {
          yield arg
          yield context
          return context
        }

        const genObject = genFunction('🐇')
        console.log(genObject.next())
        console.log(genObject.next())
        context = '😊'
        console.log(genObject.next())
      })

      it('closable', () => {
        /**
         * Because Generator is an Iterator
         */
        const genFunction = function* (): Generator<string> {
          yield '🐭'
          yield '🐱'
          return '🐶'
        }

        const genObject = genFunction()
        console.log(genObject.next())
        console.log(genObject.return('☠️'))
        console.log(genObject.next())
        console.log(genObject.next())
      })

      it('stateful', () => {
        /**
         * Because Generator is pausable
         */
        const genFunction = function* (): Generator<void, void, string> {
          // yield
          let storage = ''
          while (true) {
            const toStore = yield
            storage += toStore
            console.log(storage)
          }
        }

        const genObject = genFunction()
        genObject.next() // kick off the generator
        genObject.next('🔒')
        genObject.next('🔑')
        genObject.next('🔐')
      })
    })

    describe('Composition', () => {
      /** Learnings so far:
       * - generator function has the properties of a Function
       * - generator (object) has the properties of an Iterator
       * - generator can produce and/or consume data
       * - generator is pausable & stateful
       */

      it('generator can call a generator', () => {
        function* genFunction1(): Generator<string> {
          yield '🧸'
          yield '🎁'
        }

        function* genFunction2(): Generator<string> {
          yield '💎'
          yield '💾'
          // typically yield* genFunction1()
          // 👀 >>> this is to observe generator state
          const gen = genFunction1()
          yield* gen
          // Note: yield gen.next() won't work here (return type must be a string, not an IteratorResult)
        }

        const genObject = genFunction2()
        console.log(genObject.next())
        console.log(genObject.next())
        console.log(genObject.next())
        console.log(genObject.next())
        console.log(genObject.next())
      })

      it('higher-order functions vs generator functions', () => {
        const genFunction = function* (): Generator<string> {
          yield '🇦🇺'
          yield '🇸🇰'
        }

        const chompFn = (generatorFn: () => Generator<string>, generator: Generator<string>) => {
          console.log([...generatorFn()])
          console.log([...generator])
        }

        chompFn(genFunction, genFunction())
      })
    })
  })

  describe('Exercise', () => {
    /**
     * take(0, naturalNumbers()) -> []
     * take(1, naturalNumbers()) -> [0]
     * take(2, naturalNumbers()) -> [0, 1]
     * take(3, naturalNumbers()) -> [0, 1, 2]
     */
    const take = function* <T>(n: number, generator: Generator<T>): Generator<T, T | undefined> {
      // TODO ...code...
      return undefined
    }

    it('implement a take(n, generator) generator', () => {
      /**
       * [0, 1, 2, 3, 4, ...]
       */
      const naturalNumbers = function* (limit: number = Infinity): Generator<number> {
        // TODO ...code...
        yield 0
      }

      expect([...take(0, naturalNumbers(0))]).to.eql([])
      expect([...take(1, naturalNumbers(0))]).to.eql([])
      expect([...take(2, naturalNumbers(0))]).to.eql([])
      expect([...take(3, naturalNumbers(1))]).to.eql([0])

      expect([...take(0, naturalNumbers())]).to.eql([])
      expect([...take(1, naturalNumbers())]).to.eql([0])
      expect([...take(2, naturalNumbers())]).to.eql([0, 1])
      expect([...take(3, naturalNumbers())]).to.eql([0, 1, 2])
    })

    it('implement a interleave(generator1, generator2) combinator', () => {
      /**
       * [1, 2, 6, 24, 120, ...]
       */
      const factorial = function* (limit: number = Infinity): Generator<number> {
        // TODO ...code...
      }

      /**
       * [1, 1, 2, 3, 5, ...]
       */
      const fibonacci = function* (limit: number = Infinity): Generator<number> {
        // TODO ...code...
      }

      /**
       * [1, 1, 3, 4, 6, 9, 10, 16, 15, 25, ...]
       * @param generator1
       * @param generator2
       */
      const interleave = function* <T>(
        generator1: Generator<T>,
        generator2: Generator<T>
      ): Generator<T, T | undefined> {
        return undefined // TODO ...code...
      }

      expect([...factorial(5)]).to.eql([1, 2, 6, 24, 120])
      expect([...fibonacci(5)]).to.eql([1, 1, 2, 3, 5])

      expect([...interleave(factorial(3), fibonacci(5))]).to.eql([1, 1, 2, 1, 6, 2, 3, 5])
      expect([...take(10, interleave(factorial(), fibonacci()))]).to.eql([1, 1, 2, 1, 6, 2, 24, 3, 120, 5])
    })

    it(`reimplement last week's challenge`, () => {
      // https://www.figma.com/file/3ghGVFN7GpJvi1NehlFFFs/Coding-Challenge
    })
  })

  describe('Final thought', () => {
    // Baruch's Observation
    // If all you have is a hammer, every problem looks like a nail.
  })
})
