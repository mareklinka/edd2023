type Part<
  P extends number,
  A extends number[],
  Left extends number[] = [],
  Right extends number[] = []
> = A extends []
  ? [P, Left, Right]
  : A extends [infer F extends number, ...infer Rest extends number[]]
  ? Part<
      P,
      Rest,
      M.Comparator<P, F> extends true ? [F, ...Left] : Left,
      M.Comparator<P, F> extends true ? Right : [F, ...Right]
    >
  : never;

type Part1 = Part<3, [1, 2]>;

type QS<A extends number[]> = A extends []
  ? []
  : A extends [infer F extends number, ...infer Rest extends number[]]
  ? [...QS<Part<F, Rest>[1]>, Part<F, Rest>[0], ...QS<Part<F, Rest>[2]>]
  : never;

type Z = QS<[99, 3, 1, 2, 5, 6]>;

namespace M {
  export type Num<T> = Extract<T, number>;
  type Length<T extends any[]> = T["length"];
  type Push<T extends any[], Val> = [...T, Val];
  type NTuple<N extends number, T extends any[] = []> = T["length"] extends N
    ? T
    : NTuple<N, Push<T, any>>;

  export type Add<A extends number, B extends number> = Length<
    [...NTuple<A>, ...NTuple<B>]
  >;
  export type Sub<A extends number, B extends number> = NTuple<A> extends [
    ...infer U,
    ...NTuple<B>
  ]
    ? Length<U>
    : never;

  export type Comparator<N1 extends number, N2 extends number> = N1 extends N2
    ? false
    : [Sub<N2, N1>] extends [never]
    ? true
    : false;
}
