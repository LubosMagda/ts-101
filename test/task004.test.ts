describe('Discriminated Unions', () => {
  it('test 0', async () => {
    type BaseAnimal = {
      name: string
      isFluffy: boolean
    }

    type BaseCat = BaseAnimal & {
      _t: 'cat' // <- the discriminator for cat
    }

    type CatSmall = BaseCat & {
      _st: 'small' // <- sub-type
      meowSmall: () => string
    }

    type CatLarge = BaseCat & {
      _st: 'large' // <- sub-type
      meowLarge: () => string
    }

    // dogs bark
    type BaseDog = BaseAnimal & {
      _t: 'dog' // <- the discriminator for dog
    }

    type DogSmall = BaseDog & {
      _st: 'small' // <- sub-type
      barkSmall: () => string
    }

    type DogLarge = BaseDog & {
      _st: 'large' // <- sub-type
      barkLarge: () => string
    }

    type DogBulky = BaseDog & {
      _st: 'bulky' // <- sub-type
      barkBulky: () => string
    }

    type Cat = CatSmall | CatLarge
    type Dog = DogSmall | DogLarge | DogBulky
    type Animal = Cat | Dog

    const assertNever = (n: never): never => {
      throw new Error('Should never happen')
    }

    const makeNoise = (animal: Animal): string => {
      switch (animal._t) {
        case 'cat':
          switch (animal._st) {
            case 'small':
              return animal.meowSmall()
            case 'large':
              return animal.meowLarge()
          }
        case 'dog':
          switch (animal._st) {
            case 'small':
              return animal.barkSmall()
            case 'large':
              return animal.barkLarge()
            case 'bulky':
              return animal.barkBulky()
          }
        default:
          return assertNever(animal)
      }
    }
  })

  it('test 1', async () => {
    type A<S extends string, T extends string> = {
      type: T
      size: S
      name: string
      isFluffy: boolean
    }

    type CatSmall = A<'small', 'cat'> & { meowSmall: () => string }
    type CatLarge = A<'large', 'cat'> & { meowLarge: () => string }
    type DogSmall = A<'small', 'dog'> & { barkSmall: () => string }
    type DogLarge = A<'large', 'dog'> & { barkLarge: () => string }
    type DogBulky = A<'bulky', 'dog'> & { barkBulky: () => string }

    type Cat = CatSmall | CatLarge
    type Dog = DogSmall | DogLarge | DogBulky
    type Animal = Cat | Dog

    const makeNoise = (animal: Animal): string => {
      switch (animal.type) {
        case 'cat':
          switch (animal.size) {
            case 'small':
              return animal.meowSmall()
            case 'large':
              return animal.meowLarge()
            default:
              throw new Error(`Unknown cat size ${animal['size'] satisfies never}`)
          }
        case 'dog':
          switch (animal.size) {
            case 'small':
              return animal.barkSmall()
            case 'large':
              return animal.barkLarge()
            case 'bulky':
              return animal.barkBulky()
            default:
              throw new Error(`Unknown dog size ${animal['size'] satisfies never}`)
          }
        default:
          throw new Error(`Unknown animal type ${animal['type'] satisfies never}`)
      }
    }
  })
})
