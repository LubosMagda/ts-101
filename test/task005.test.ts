import sinon from 'sinon'
import { SpiralOut } from '../src/task005.utils'
import { spiral } from '../src/task005'

describe('Task 5 (the spiral)', () => {
  let outStub: sinon.SinonStubbedInstance<typeof SpiralOut>

  before('setup out stub', () => {
    outStub = sinon.stub(SpiralOut)
  })

  afterEach('reset stubs', () => {
    sinon.reset()
  })

  after('restore stubs', () => {
    sinon.verifyAndRestore()
  })

  const assertSpiral = (spiral: string[]) => {
    sinon.assert.callCount(outStub.printLine, spiral.length)
    for (let i = 0; i < spiral.length; i++) {
      sinon.assert.calledWith(outStub.printLine.getCall(i), spiral[i])
    }
  }

  describe('N=0', () => {
    it('Tspace', async () => {
      spiral(0)

      sinon.assert.calledOnceWithExactly(outStub.tSpace, { charsPerLine: 3, lines: 1 })
    })

    it('The spiral', async () => {
      spiral(0)

      assertSpiral([
        // (0 wraps around) the center
        '* ',
      ])
    })
  })

  describe('N=1', () => {
    it('Tspace', async () => {
      spiral(1)

      sinon.assert.calledOnceWithExactly(outStub.tSpace, { charsPerLine: 11, lines: 5 })
    })

    it('The spiral', async () => {
      spiral(1)

      assertSpiral([
        // 1 wrap around the center
        '* * * * * ',
        '*       * ',
        '*   *   * ',
        '*   * * * ',
        '*         ',
      ])
    })
  })

  describe('N=2', () => {
    it('Tspace', async () => {
      spiral(2)

      sinon.assert.calledOnceWithExactly(outStub.tSpace, { charsPerLine: 19, lines: 9 })
    })

    it('The spiral', async () => {
      spiral(2)

      assertSpiral([
        // 2 wraps around the center
        '* * * * * * * * * ',
        '*               * ',
        '*   * * * * *   * ',
        '*   *       *   * ',
        '*   *   *   *   * ',
        '*   *   * * *   * ',
        '*   *           * ',
        '*   * * * * * * * ',
        '*                 ',
      ])
    })
  })

  describe('N=3', () => {
    it('Tspace', async () => {
      spiral(3)

      sinon.assert.calledOnceWithExactly(outStub.tSpace, { charsPerLine: 27, lines: 13 })
    })

    it('The spiral', async () => {
      spiral(3)

      assertSpiral([
        // 3 wraps around the center
        '* * * * * * * * * * * * * ',
        '*                       * ',
        '*   * * * * * * * * *   * ',
        '*   *               *   * ',
        '*   *   * * * * *   *   * ',
        '*   *   *       *   *   * ',
        '*   *   *   *   *   *   * ',
        '*   *   *   * * *   *   * ',
        '*   *   *           *   * ',
        '*   *   * * * * * * *   * ',
        '*   *                   * ',
        '*   * * * * * * * * * * * ',
        '*                         ',
      ])
    })
  })

  describe('N=4', () => {
    it('Tspace', async () => {
      spiral(4)

      sinon.assert.calledOnceWithExactly(outStub.tSpace, { charsPerLine: 35, lines: 17 })
    })

    it('The spiral', async () => {
      spiral(4)

      assertSpiral([
        // 4 wraps around the center
        '* * * * * * * * * * * * * * * * * ',
        '*                               * ',
        '*   * * * * * * * * * * * * *   * ',
        '*   *                       *   * ',
        '*   *   * * * * * * * * *   *   * ',
        '*   *   *               *   *   * ',
        '*   *   *   * * * * *   *   *   * ',
        '*   *   *   *       *   *   *   * ',
        '*   *   *   *   *   *   *   *   * ',
        '*   *   *   *   * * *   *   *   * ',
        '*   *   *   *           *   *   * ',
        '*   *   *   * * * * * * *   *   * ',
        '*   *   *                   *   * ',
        '*   *   * * * * * * * * * * *   * ',
        '*   *                           * ',
        '*   * * * * * * * * * * * * * * * ',
        '*                                 ',
      ])
    })
  })

  describe('N=5', () => {
    it('Tspace', async () => {
      spiral(5)

      sinon.assert.calledOnceWithExactly(outStub.tSpace, { charsPerLine: 43, lines: 21 })
    })

    it('The spiral', async () => {
      spiral(5)

      assertSpiral([
        // 5 wraps around the center
        '* * * * * * * * * * * * * * * * * * * * * ',
        '*                                       * ',
        '*   * * * * * * * * * * * * * * * * *   * ',
        '*   *                               *   * ',
        '*   *   * * * * * * * * * * * * *   *   * ',
        '*   *   *                       *   *   * ',
        '*   *   *   * * * * * * * * *   *   *   * ',
        '*   *   *   *               *   *   *   * ',
        '*   *   *   *   * * * * *   *   *   *   * ',
        '*   *   *   *   *       *   *   *   *   * ',
        '*   *   *   *   *   *   *   *   *   *   * ',
        '*   *   *   *   *   * * *   *   *   *   * ',
        '*   *   *   *   *           *   *   *   * ',
        '*   *   *   *   * * * * * * *   *   *   * ',
        '*   *   *   *                   *   *   * ',
        '*   *   *   * * * * * * * * * * *   *   * ',
        '*   *   *                           *   * ',
        '*   *   * * * * * * * * * * * * * * *   * ',
        '*   *                                   * ',
        '*   * * * * * * * * * * * * * * * * * * * ',
        '*                                         ',
      ])
    })
  })
})
