---
theme : "black"
transition: "zoom"
highlightTheme: "darkula"
separator: ^---$
verticalSeparator: ^--$
---

## It's Types All the Way Down
### Exploring Advanced Typescript Concepts
##### Marek Linka, ESK

---

### About Me

* Joined ESK in March 2016
* Focus on backend .NET (Core 2+)
* .NET Core Contributor
* Proponent of strong type systems

---

### Agenda

* What's not in here
* Motivational examples
* `keyof` & `typeof`
* Indexed access types
* Conditional types, `never`
* Mapped types
* Template literal types
* Discriminated unions

---

### What's Not in Here

* What is TS and why is TS
* Simple types, scalars, objects, functions
* Type guards and narrowing
* Interfaces, classes, object literal types

---

### Example 1 - Practical

---

### Example 2 - Impractical

---

### Example 3 - Crazy

---

### `keyof`

* Takes an object type, produces a union of its keys
* Situationally useful on its own
* Absolutely crucial with mapped types

--

### Example

---

### `typeof`

* Values and types are not the same thing
* JS's `typeof` is a runtime expression
* TS adds `typeof` as a compile-time expression
* TS specifically limits the scope to identifiers and their properties
* Useful for helper types and further processing
--

### Example

---

### Indexed Access Types

* Used for accessing a type of property on a different type
* Useful when splitting larger types doesn't make much sense

--

### Example

---

### Template Literal Types

* An extension of string literal types
* Expanding via union types
* Useful for modelling strings of specific formats
* Also supports inference over string values

--

### Example

---

### Conditional Types

* Take the form of a ternary expression
* Help describe logic inherent in our types
* Not very useful on their own, but shine when used with generics

--

### Example

---

### Mapped Types

* Building types from other types using index signatures
* Allows changing optionality and mutability
* Allows changing keys and return types of properties
* Allows filtering of keys via `never`

--

### Example

---

### Never

* A "bottom" type of a type hierarchy
* Is equivalent to an empty set
* Useful for modelling functions that never return (e.g. throw helpers, infinite cycles)
* Useful for implementing compile-time exhaustiveness checks for unions

--

### Discriminated Unions

* Discriminated unions consist of a discriminator and a value
* Type of value differs dedepnding on the discriminator
* Widely used in functional-style programming
* Useful for modelling data that has a known set of cases

--

### Example

---

### Oh, and One Last Thing...

* TS's type-system is Turing-complete
* It's a programming language _**in its own right**_
* This means it's also subject to Halting Problem
* Artificial limits are imposed in the compiler to prevent infinite compilation

---

### Q&A

---

### Thank You