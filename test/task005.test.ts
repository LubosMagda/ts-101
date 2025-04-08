import sinon from 'sinon'

describe('Decorators', () => {
  before('setup out stub', () => {})

  afterEach('reset stubs', () => {
    sinon.reset()
  })

  after('restore stubs', () => {
    sinon.verifyAndRestore()
  })

  describe('N=0', () => {
    it('Tspace', async () => {
      //      sinon.assert.calledOnceWithExactly(outStub.tSpace, { charsPerLine: 3, lines: 1 })
    })
  })
})
