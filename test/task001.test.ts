import { expect } from 'chai'

/**
 * https://www.figma.com/file/3ghGVFN7GpJvi1NehlFFFs/Coding-Challenge?node-id=0%3A1
 */
describe('Null permutations', function () {
  type Data<T> = T[]
  type Result<T> = Data<T | null>

  const perm = <T>(data: Data<T>): Result<T>[] => {
    // TODO impl...
    return [data]
  }

  describe('correctness', () => {
    it('no element', () => {
      expect(perm([])).to.have.deep.members([[]])
    })

    it('one element', () => {
      expect(perm(['A'])).to.have.deep.members([[null], ['A']])
    })

    it('two elements', () => {
      expect(perm(['A', 'B'])).to.have.deep.members([
        ['A', 'B'],
        ['A', null],
        [null, 'B'],
        [null, null],
      ])
    })

    it('three elements', () => {
      expect(perm(['A', 'B', 'C'])).to.have.deep.members([
        ['A', 'B', 'C'],
        ['A', 'B', null],
        ['A', null, 'C'],
        ['A', null, null],
        [null, 'B', 'C'],
        [null, 'B', null],
        [null, null, 'C'],
        [null, null, null],
      ])
    })
  })
})
