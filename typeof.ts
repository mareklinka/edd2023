type UnaryPredicate = (input: unknown) => boolean;

function return4() {
  return 4;
}

type R1 = ReturnType<return4>;

type R2 = typeof return4;
type R3 = ReturnType<typeof return4>;
type R4 = ReturnType<R2>;

// static members
class MyClass {
  static doSomething() {
    console.log("Doing something");
  }

  static get value() {
    return 1;
  }

  static set value(v: number) {}

  callForHelp() {
    console.log("Help, help, I'm being repressed!");
  }
}

type MyClassPrototype = typeof MyClass;
type StaticMembers = keyof MyClassPrototype;
type InstanceMembers = keyof MyClass;
