const products = [
  {
    id: 1,
    title: "Phone",
    price: 500,
    rating: 4.5,
    category: "tech",
    tags: ["new", "sale"],
    discountPercentage: 10,
  },
  {
    id: 2,
    title: "Laptop",
    price: 900,
    rating: 4.8,
    category: "tech",
    tags: ["sale"],
    discountPercentage: 20,
  },
  {
    id: 3,
    title: "Chair",
    price: 150,
    rating: 4.5,
    category: "home",
    tags: [],
    discountPercentage: 10,
  },
  {
    id: 4,
    title: "Lamp",
    price: 150,
    rating: 3.9,
    category: "home",
    tags: ["new"],
    discountPercentage: 5,
  },
];


// ---------- helpers ----------

const getDiscountedPrice = (product) =>
  product.price -
  (product.price * product.discountPercentage) / 100;


// 1. Default sort surprise

const defaultSorted = [10, 9, 100, 1].sort();

console.log("Default sort:", defaultSorted);


// 2. Price ascending

const byPriceAsc = (list) =>
  [...list].sort((a, b) => a.price - b.price);


// 3. Price descending

const byPriceDesc = (list) =>
  [...list].sort((a, b) => b.price - a.price);


// 4. Title alphabetical

const byTitle = (list) =>
  [...list].sort((a, b) =>
    a.title.localeCompare(b.title)
  );


// 5. Rating descending,
//    then cheapest price first

const byRatingThenPrice = (list) =>
  [...list].sort(
    (a, b) =>
      b.rating - a.rating ||
      a.price - b.price
  );


// 6. Sort by discounted price

const byDiscountedPrice = (list) =>
  [...list].sort(
    (a, b) =>
      getDiscountedPrice(a) -
      getDiscountedPrice(b)
  );


// 7. Reusable comparator factory

const makeComparator = (key, direction = "asc") => {
  const multiplier = direction === "asc" ? 1 : -1;

  return (a, b) => {
    const left = a[key];
    const right = b[key];

    if (typeof left === "string") {
      return left.localeCompare(right) * multiplier;
    }

    return (left - right) * multiplier;
  };
};


// ---------- tests ----------

// 1. Default sort
console.log(
  JSON.stringify(defaultSorted) ===
    JSON.stringify([1, 10, 100, 9])
    ? "PASS default sort"
    : "FAIL default sort"
);


// 2. Price ascending
console.log(
  JSON.stringify(
    byPriceAsc(products).map((p) => p.price)
  ) === JSON.stringify([150, 150, 500, 900])
    ? "PASS price ascending"
    : "FAIL price ascending"
);


// Original untouched
console.log(
  JSON.stringify(products.map((p) => p.price)) ===
    JSON.stringify([500, 900, 150, 150])
    ? "PASS price ascending no mutation"
    : "FAIL price ascending mutation"
);


// 3. Price descending
console.log(
  JSON.stringify(
    byPriceDesc(products).map((p) => p.price)
  ) === JSON.stringify([900, 500, 150, 150])
    ? "PASS price descending"
    : "FAIL price descending"
);


// 4. Title
const mixedCase = [
  { title: "zebra" },
  { title: "Apple" },
  { title: "banana" },
];

const sortedTitles = [...mixedCase].sort((a, b) =>
  a.title.localeCompare(b.title)
);

console.log(
  JSON.stringify(sortedTitles.map((p) => p.title)) ===
    JSON.stringify(["Apple", "banana", "zebra"])
    ? "PASS title sorting"
    : "FAIL title sorting"
);


// 5. Rating then price
const ratingSorted = byRatingThenPrice(products);

console.log(
  JSON.stringify(
    ratingSorted.map((p) => [p.title, p.rating, p.price])
  ) ===
    JSON.stringify([
      ["Laptop", 4.8, 900],
      ["Phone", 4.5, 500],
      ["Chair", 4.5, 150],
      ["Lamp", 3.9, 150],
    ])
    ? "PASS rating then price"
    : "FAIL rating then price"
);


// 6. Discounted price
const discountSorted = byDiscountedPrice(products);

console.log(
  JSON.stringify(
    discountSorted.map((p) => p.title)
  ) ===
    JSON.stringify(["Chair", "Lamp", "Phone", "Laptop"])
    ? "PASS discounted price"
    : "FAIL discounted price"
);


// 7. makeComparator - number ascending
const numberAsc = [...products].sort(
  makeComparator("price", "asc")
);

console.log(
  JSON.stringify(numberAsc.map((p) => p.price)) ===
    JSON.stringify([150, 150, 500, 900])
    ? "PASS comparator number asc"
    : "FAIL comparator number asc"
);


// number descending
const numberDesc = [...products].sort(
  makeComparator("price", "desc")
);

console.log(
  JSON.stringify(numberDesc.map((p) => p.price)) ===
    JSON.stringify([900, 500, 150, 150])
    ? "PASS comparator number desc"
    : "FAIL comparator number desc"
);


// string ascending
const stringAsc = [...products].sort(
  makeComparator("title", "asc")
);

console.log(
  JSON.stringify(stringAsc.map((p) => p.title)) ===
    JSON.stringify(["Chair", "Lamp", "Laptop", "Phone"])
    ? "PASS comparator string asc"
    : "FAIL comparator string asc"
);


// string descending
const stringDesc = [...products].sort(
  makeComparator("title", "desc")
);

console.log(
  JSON.stringify(stringDesc.map((p) => p.title)) ===
    JSON.stringify(["Phone", "Laptop", "Lamp", "Chair"])
    ? "PASS comparator string desc"
    : "FAIL comparator string desc"
);


// Boolean comparator demonstration

const badInput = [
  { price: 3 },
  { price: 1 },
  { price: 2 },
];

const badComparator = [...badInput].sort(
  (a, b) => a.price > b.price
);

console.log(
  JSON.stringify(badComparator.map((p) => p.price)) !==
    JSON.stringify([1, 2, 3])
    ? "PASS boolean comparator fails"
    : "FAIL boolean comparator test"
);