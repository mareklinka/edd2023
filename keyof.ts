type Grade = "A" | "B" | "C";

interface MyInterface {
  id: number;
  name: string;
  grade: Grade;
}

type MyInterfaceKeys = keyof MyInterface;

function select(
  input: MyInterface,
  prop: MyInterfaceKeys
): MyInterface[MyInterfaceKeys] {
  return input[prop];
}

// this also uses an indexed access type in its return value
function selectGeneric<T extends {}, K extends keyof T>(
  input: T,
  prop: K
): T[K] {
  return input[prop];
}

const o: MyInterface = {
  id: 1,
  name: "John Doe",
  grade: "B",
};

const id = select(o, "ids");
const n = select(o, "name");
const grade = select(o, "grade");

const id2 = selectGeneric(o, "id");
const n2 = selectGeneric(o, "name");
const grade2 = selectGeneric(o, "grade");
