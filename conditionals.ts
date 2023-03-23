interface NumericIdObject {
  id: number;
}

interface GuidIdObject {
  guid: string;
}

// not exactly helpful
function naiveGetId(o: NumericIdObject | GuidIdObject): number | string {
  throw "not implemented";
}

// with conditional
type ObjectId<T extends NumericIdObject | GuidIdObject> =
  T extends NumericIdObject ? number : string;

function getId<T extends NumericIdObject | GuidIdObject>(o: T): ObjectId<T> {
  throw "not implemented";
}

const numeridId = getId({ id: 1 });
const guidId = getId({ guid: crypto.randomUUID() });

// never
type ErrorCode<T> = T extends { errorCode: string } ? string : never;

function getErrorCodeFrom<T extends {}>(o: T): ErrorCode<T> {
  if ('errorCode' in o) {
    return o['errorCode'] as ErrorCode<T>;
  } else {
    throw "errorCode not found";
  }
}

const errorCode = getErrorCodeFrom({ errorCode: "E100" });
const errorCode2 = getErrorCodeFrom({ id: 1 });

// infer
type Flatten<T> = T extends Array<infer TA> ? TA : never;

const f1: Flatten<Array<number>>;
const f2: Flatten<Array<number | string>>;
const f3: Flatten<string>;
