interface Employee {
  name: string;
  personalNumber?: string;
  level: number;
}

type SimpleReadonly<T> = {
  +readonly [P in keyof T]: T[P];
};

// readonly - TS also contains it's own version of this called Readonly<T>
const ro: SimpleReadonly<Employee> = {
  name: "Marek",
  personalNumber: "2",
  level: 3,
};
ro.level = 1;

// selecting only a subset of properties
type RequiredSubset<T> = {
  [P in keyof T as T[P] extends {} ? P : never]: T[P];
};

const req: RequiredSubset<Employee> = { name: "John", level: 7 };
req.personalNumber = "111";

// changing property names and types
interface AbsenceRequestModel {
  start: Date;
  end: Date;
  description: string;
}

type StringDates<T> = {
  [P in keyof T as T[P] extends Date
    ? `${P & string}DateString`
    : P]: T[P] extends Date ? string : T[P];
};

function convertModelDates(
  model: AbsenceRequestModel
): StringDates<AbsenceRequestModel> {
  throw "not implemented";
}

const replaced = convertModelDates({
  description: "a",
  start: new Date(),
  end: new Date(),
});

replaced.