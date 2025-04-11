import sinon from 'sinon'
// suggestions - list changes in different ES versions, eg
// - https://en.wikipedia.org/wiki/ECMAScript_version_history
// - https://saigontechnology.com/blog/ecmascript/
// - https://techaffinity.com/blog/what-is-new-for-developers-in-javascript-ecmascript/
// - https://levelup.gitconnected.com/why-you-should-be-hyped-about-the-new-2025-javascript-release-51a89826f9c4

describe('Decorators (Stage 3)', () => {
  // video: https://www.youtube.com/watch?v=1hq_tNPWASM
  // ts lang spec: https://github.com/Microsoft/TypeScript/blob/v2.6.1/doc/spec.md#3.8.9
  // proposal:
  // * [class methods & constructor decorators : stage 1] https://github.com/tc39/proposal-class-method-parameter-decorators
  // * [decorators : stage 3] https://github.com/tc39/proposal-decorators
  // * [decorator metadata : stage 3] https://github.com/tc39/proposal-decorator-metadata
  // - [grouped/auto - accessors : stage 2?] https://github.com/tc39/proposal-grouped-and-auto-accessors
  // - [tc39 proposal process] https://tc39.es/process-document/
  //   - https://www.youtube.com/watch?app=desktop&v=P5mMDl9stJg&t=17s
  //   - https://youtu.be/7vjMdfkAtBM?si=mJaQgea7pulz1qj8&t=180
  // pr:
  // - https://github.com/microsoft/TypeScript/pull/50820 (https://github.com/microsoft/TypeScript/issues/48885; https://github.com/microsoft/TypeScript/commit/5b1897969769449217237aecbe364f823096c63e)
  // - https://github.com/microsoft/TypeScript/pull/49705
  // - https://github.com/microsoft/TypeScript/pull/54657
  // - https://github.com/microsoft/TypeScript/issues/57533
  // - note: from https://github.com/microsoft/TypeScript/issues/48885#issuecomment-1309327151
  // release:
  // - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators
  // doco:
  // - [legacy/experimental decorators aka stage 2] https://www.typescriptlang.org/docs/handbook/decorators.html
  // - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators
  // - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#decorator-metadata
  // - https://www.typescriptlang.org/tsconfig/#experimentalDecorators
  // - https://www.typescriptlang.org/tsconfig/#emitDecoratorMetadata
  // articles:
  // - https://linkedlist.ch/decorators_vs._legacy_decorators_55/
  // - https://medium.com/@templum.dev/all-you-need-to-know-about-typescript-decorators-as-introduced-in-5-0-b03866a8b213
  // - https://blog.logrocket.com/practical-guide-typescript-decorators/
  // - https://medium.com/tiendeo-tech/stage-2-decorators-101-2c989aeafcc0
  // - https://esdiscuss.org/topic/what-is-holding-back-decorators

  before('setup out stub', () => {})

  afterEach('reset stubs', () => {
    sinon.reset()
  })

  after('restore stubs', () => {
    sinon.verifyAndRestore()
  })

  describe('Context', () => {
    /** ```type SyntheticDecorator<T, C, R> = (target: T, context: C) => R | void``` */

    type Constructable = { new (...args: any[]): any }
    type ClassInstanceMethod<THIS, ARGS extends any[], RET> = (this: THIS, ...args: ARGS) => RET

    /**
     * type T = typeof MyClass;
     * type C = ClassDecoratorContext<typeof MyClass> & { name: "MyClass" };
     * type R = typeof MyClass;
     *
     * @param target The decorated class type.
     * @param context Class context.
     * @returns You can return a modified class from this constructor that will replace the decorated class.
     *
     * @see https://github.com/tc39/proposal-decorators?tab=readme-ov-file#classes
     */
    const AClassDecorator = <CLASS extends Constructable>(target: CLASS, context: ClassDecoratorContext<CLASS>): CLASS | void => {
      console.log('>>> AClassDecorator applied', target, context)

      context.addInitializer(function (this: CLASS): void {
        console.log('<<<', 'AClassDecorator initializer', this)
      })

      //const instance = new target('blah')
      const replacementClass = class extends target {
        #foo: string

        constructor(...args: any[]) {
          super(...args)
          this.#foo = 'bar'
        }
      }

      return replacementClass
    }

    /**
     * type T = (this: MyClass) => void;
     * type C = & ClassMethodDecoratorContext<MyClass, (this: MyClass) => void> & { private: false, static: false };
     * type R = (this: MyClass) => void;
     *
     * Note1: constructor is not in the ClassMethodDecoratorContext
     * Note2: decorator with type above will apply only to a public instance method
     *
     * @param target The decorated method.
     * @param context Method context.
     * @returns You can return a modified method from this constructor that will replace the decorated method.
     *
     * @see https://github.com/tc39/proposal-decorators?tab=readme-ov-file#class-methods
     */
    const AClassMethodDecorator = <THIS, ARGS extends any[], RET>(
      target: ClassInstanceMethod<THIS, ARGS, RET>,
      context: ClassMethodDecoratorContext<THIS, ClassInstanceMethod<THIS, ARGS, RET>>
    ): ClassInstanceMethod<THIS, ARGS, RET> | void => {
      console.log('>>> AClassMethodDecorator applied', target, context)

      context.addInitializer(function (this: THIS): void {
        console.log('<<<', 'AClassMethodDecorator initializer', this)
      })

      return function (this: THIS, ...args: ARGS): RET {
        console.log('>', context.name.toString(), 'called with', ...args)
        try {
          const retVal = target.call(this, ...args)
          console.log('>', context.name.toString(), 'returned', retVal)
          return retVal
        } catch (e: unknown) {
          console.log('>', context.name.toString(), 'failed with', e)
          throw e
        }
      }
    }

    /**
     * type T = undefined;
     * type C = ClassFieldDecoratorContext<MyClass, string> & { name: "#x", private: true, static: false };
     * type R = (this: MyClass, value: string) => string;
     *
     * Notes:
     *
     * - Class fields do not have a direct input value when being decorated (void target).
     *
     * - Instead, users can optionally return an initializer function which runs when the field is assigned,
     * receiving the initial value of the field and returning a new initial value.
     * If any other type of value besides a function is returned, an error will be thrown.

     * @param target The decorated class field.
     * @param context Class field context.
     * @returns You can return an Initializer mutator function — a callback that can observe, and potentially replace, the field's initialized value prior to the field being defined on the object
     *
     * @see https://github.com/tc39/proposal-decorators?tab=readme-ov-file#class-fields
     */
    const AClassFieldDecorator = <THIS, VAL>(target: undefined, context: ClassFieldDecoratorContext<THIS, VAL>): ((this: THIS, value: VAL) => VAL) | void => {
      console.log('>>>', 'AClassFieldDecorator applied', target, context)

      context.addInitializer(function (this: THIS): void {
        console.log('<<<', 'AClassFieldDecorator initializer', this)
      })

      return function (this: THIS, value: VAL): VAL {
        console.log('>', context.name.toString(), 'initialised with value', value)
        return value
      }
    }

    /**
     * type T = (this: MyClass) => string;
     * type C = ClassGetterDecoratorContext<MyClass, string> & { name: "x", private: false, static: false };
     * type R = (this: MyClass) => string;
     *
     * @param target The decorated class field getter.
     * @param context Class field getter context.
     * @returns You can return a modified getter that will replace the decorated getter function.
     *
     * @see https://github.com/tc39/proposal-decorators?tab=readme-ov-file#class-accessors
     */
    const AClassGetterDecorator = <THIS, VAL>(target: (this: THIS) => VAL, context: ClassGetterDecoratorContext<THIS, VAL>): ((this: THIS) => VAL) | void => {
      console.log('>>>', 'AClassGetterDecorator applied', target, context)

      context.addInitializer(function (this: THIS): void {
        console.log('<<<', 'AClassGetterDecorator initializer', this)
      })

      return function (this: THIS): VAL {
        const value = target.call(this)
        console.log('>', context.name.toString(), 'got value', value)
        return value
      }
    }

    /**
     * type T = (this: MyClass, value: string) => void;
     * type C = ClassSetterDecoratorContext<MyClass, string> { name: "x", private: false, static: false };
     * type R = (this: MyClass, value: string) => void;
     *
     * @param target The decorated class field setter.
     * @param context Class field setter context.
     * @returns You can return a modified setter that will replace the decorated setter function.
     *
     * @see https://github.com/tc39/proposal-decorators?tab=readme-ov-file#class-accessors
     */
    const AClassSetterDecorator = <THIS, VAL>(
      target: (this: THIS, value: VAL) => void,
      context: ClassSetterDecoratorContext<THIS, VAL>
    ): ((this: THIS, value: VAL) => void) | void => {
      console.log('>>>', 'AClassSetterDecorator applied', target, context)

      context.addInitializer(function (this: THIS): void {
        console.log('<<<', 'AClassSetterDecorator initializer', this)
      })

      return function (this: THIS, value: VAL): void {
        console.log('>', context.name.toString(), 'set value', value)
        target.call(this, value)
      }
    }

    /**
     * type T = ClassAccessorDecoratorTarget<MyClass, string>;
     * type C = ClassAccessorDecoratorContext<MyClass, string> & { name: "y", private: false, static: false };
     * type R = ClassAccessorDecoratorResult<MyClass, string>;
     *
     * @param target The decorated class field accessor.
     * @param context Class field accessor context.
     * @returns You can return a modified getter/setter/initializer that will replace the decorated accessor function.
     *
     * @see https://github.com/tc39/proposal-decorators?tab=readme-ov-file#class-auto-accessors
     */
    const AClassAccessorDecorator = <THIS, VAL>(
      target: ClassAccessorDecoratorTarget<THIS, VAL>,
      context: ClassAccessorDecoratorContext<THIS, VAL>
    ): ClassAccessorDecoratorResult<THIS, VAL> | void => {
      console.log('>>>', 'AClassAccessorDecorator applied', target, context)

      context.addInitializer(function (this: THIS): void {
        console.log('<<<', 'AClassAccessorDecorator initializer', this)
      })

      return {
        get(this: THIS): VAL {
          const value = target.get.call(this)
          console.log('>', context.name.toString(), 'got value', value)
          return value
        },
        set(this: THIS, value: VAL): void {
          console.log('>', context.name.toString(), 'set value', value)
          target.set.call(this, value)
        },
        init(this: THIS, value: VAL): VAL {
          console.log('>', context.name.toString(), 'initial value', value)
          return value
        },
      }
    }

    /**
     * Starting with TS 5
     * - `--experimentalDecorators=true` means decorators Stage 2
     * - `--experimentalDecorators=false` means decorators Stage 3
     *
     * Private member are recognised by decorators by the private name (#) indicator rather than by the private member (private) indicator
     *
     * https://github.com/tc39/proposal-decorators?tab=readme-ov-file#comparison-with-babel-legacy-decorators
     * https://github.com/tc39/proposal-decorators?tab=readme-ov-file#comparison-with-typescript-experimental-decorators
     *
     * Not supported at all:
     * - arrow functions cannot be decorated i.e. only classes and their members can be decorated
     *
     * Not supported in Stage 3 (still experimental):
     * - constructor/method argument decorators
     * - constructor decorators
     * - emission of decorator metadata
     * - `declare` field decorators
     *
     * Future plans:
     * - https://github.com/tc39/proposal-decorators/blob/master/EXTENSIONS.md
     *
     * Order of execution:
     * - https://github.com/tc39/proposal-decorators?tab=readme-ov-file#detailed-design
     *
     * @see https://github.com/microsoft/TypeScript/pull/50820#issue-1376896521
     */

    @AClassDecorator
    class MyClass {
      // Note: context.private is correctly populated when "#" is used, "private" does not work (is it coz it exists in ts only?)
      @AClassFieldDecorator
      static #instance: MyClass | undefined = undefined
      @AClassFieldDecorator
      readonly #description: string = 'No description'
      @AClassAccessorDecorator
      accessor x = 1

      // can't be decorated
      static {}

      @AClassGetterDecorator
      get info() {
        return this.#description
      }

      @AClassSetterDecorator
      set info(info: string) {
        //this.description = info
      }

      //@ClassMethodDecorator
      constructor(param: string) {
        this.#description = param
      }

      @AClassMethodDecorator
      public method(param: string): string {
        return param
      }

      @AClassMethodDecorator
      private privateMethod(param: string): string {
        console.log('#privateMethod')
        return param
      }

      @AClassMethodDecorator
      #privateName(param: string): string {
        console.log('#privateName')
        return param
      }

      @AClassMethodDecorator
      public static factory() {
        if (!MyClass.#instance) {
          MyClass.#instance = new MyClass('A new instance')
        }
        return MyClass.#instance
      }

      @((t, c) => console.log('>>>', t, c))
      @AClassMethodDecorator
      static #privateFactory() {
        if (!MyClass.#instance) {
          MyClass.#instance = new MyClass('A new private instance')
        }
        return MyClass.#instance
      }
    }

    it('Instance', async () => {
      const c = new MyClass('My personal description')
      c.method('a')
      console.log('x', c.info)
      c.info = 'asdf'
      console.log('x', c.x)
      c.x = 420
      console.log(c)

      const f = MyClass.factory()
      console.log(f)
    })
  })
})
