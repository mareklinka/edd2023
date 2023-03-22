// basic usage
type CssUnit = "px" | "rem";
type Margin = `${number} ${CssUnit}`;

const m1: Margin = "1 px";
const m2: Margin = "3 rem";
const m3: Margin = "7";
const m4: Margin = "7 nothings";

// union expansion
type LocalizationLanguage = "en" | "de" | "sk";
type LocalizedStrings = "header" | "body" | "footer";
type LocalizationId = `${LocalizationLanguage}_${LocalizedStrings}_id`;

function translate(id: LocalizationId) {
  return "";
}

translate("de_body_id");

// inference
interface Observable<T> {
  value: T;
}

type ObservableObject<T> = {
  [P in keyof T as `${string & P}$`]: Observable<T[P]>;
};

type ObservableSubscribe<T> = {
  subscribe<K extends string & keyof T>(
    observableProperty: `${K}$`,
    callback: (value: T[K]) => void
  ): void;
};

const obj = {
  name: "John Shepard",
  yearOfBirth: 2154,
  rank: "N7",
};

const obs = makeObservable(obj);
obs.subscribe('names$', n => console.log(n));
obs.subscribe('yearOfBirth$', y => console.log(y));

// helpers
function makeObservable<T extends {}>(
  obj: T
): ObservableObject<T> & ObservableSubscribe<T> {
  throw "not implemented";
}
