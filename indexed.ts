type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
type Age2 = Person["age2"];
type AgeOrName = Person["age" | "name"];

interface User {
  id: 'aaa';
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}

function updateUser(id: User["id"], newAddress: User["address"]) {
  console.log(
    `Updating user ${id}. New Address: ${JSON.stringify(newAddress)}`
  );
}

updateUser(1, {
  city: "Bratislava",
  country: "Slovakia",
  street: "Einsteinova 33",
});

updateUser(1, {
  city: "Bratislava",
  country: "Slovakia",
  street: "Einsteinova 33",
  fero: "jozo",
});
