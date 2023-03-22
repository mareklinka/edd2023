type Day28 =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28;

type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Year = `${19 | 20}${Digit}${Digit}`;

type IsDivisibleBy4<S extends string | number> = `${S}` extends '0' | '4' | '8'
  ? true
  : `${S}` extends `${number | ''}${`${0 | 2 | 4 | 6 | 8}${0 | 4 | 8}` | `${1 | 3 | 5 | 7 | 9}${2 | 6}`}`
  ? true
  : false;
type IsLeapYear<S extends string | number> = `${S}` extends `${infer Hundreds}00`
  ? IsDivisibleBy4<Hundreds>
  : IsDivisibleBy4<S>;

type February<Y extends Year> = `${Y}-02-${IsLeapYear<Y> extends true ? Day28 | 29 : Day28}`;

type DateString =
  | `${Year}-${'01' | '03' | '05' | '07' | '08' | '10' | '12'}-${Day28 | 29 | 30 | 31}`
  | `${Year}-${'04' | '06' | '09' | '11'}-${Day28 | 29 | 30}`
  | { [Y in Year]: February<Y> }[Year];

const dates: DateString[] = ['2020-02-29', '2021-01-31', '2021-02-28', '2021-02-29', '2021-03-31', '2021-03-33', ''];


interface M { }

type N = M & { id: number } ;