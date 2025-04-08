describe('Utility Types', () => {
  it('Awaited', async () => {
    type NN = NonNullable<number | string | null | undefined>
    type PR = Promise<Promise<Promise<'myType' | 'myOtherType'>>>
    type AW = Awaited<PR>

    const asyncFn = async <T>(producer: () => Promise<T>): Promise<T> => {
      const result = await producer()
      return result
    }
    const asyncFn1 = async (): Promise<'type1'> => 'type1'
    const asyncFn2 = async (): Promise<Promise<'type1'>> => asyncFn1()

    const result = await asyncFn(asyncFn2)
  })

  it('Infer', async () => {
    const aFunction = (id: string) => {
      return `user-${id}` as const
    }
    type A = ReturnType<typeof aFunction>
    const f: `user-${string}` = 'user-a'
    const g: `user-${string}` = 'user-B'

    type X<S extends string> = S extends `user-${infer ID}` ? ID : never
    type Y = X<'user-foo'>
  })

  it('Enum vs Type 1', async () => {
    const abc = ['alpha', 'beta', 'gamma'] as const
    type ABC = (typeof abc)[number]

    const a: Extract<ABC, 'alpha'> = 'alpha'
    const b: Extract<ABC, 'beta'> = 'beta'
    const c: Extract<ABC, 'gamma'> = 'gamma'
    const abcAny: ABC = 'gamma'
  })

  it('Enum vs Type 2', async () => {
    const abc = { a: 'alpha', b: 'beta', c: 'gamma' } as const
    type ABC = typeof abc

    const a: ABC['a'] = 'alpha'
    const b: ABC['b'] = 'beta'
    const c: ABC['c'] = 'gamma'
    const abcAny: ABC[keyof ABC] = 'gamma'
  })
})
