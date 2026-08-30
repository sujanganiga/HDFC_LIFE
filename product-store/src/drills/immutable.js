const state = {
  user: {
    name: "Asha",
    address: {
      city: "Pune",
      pin: "411001",
    },
  },
  cart: {
    items: [
      { id: 1, title: "Phone", price: 500, qty: 1 },
      { id: 2, title: "Chair", price: 150, qty: 3 },
    ],
  },
  selectedTags: ["new"],
};

// 1. Add an item to cart.items
const addItem = (state, item) => ({
  ...state,
  cart: {
    ...state.cart,
    items: [...state.cart.items, item],
  },
});


// 2. Remove a cart item by id
const removeItem = (state, id) => ({
  ...state,
  cart: {
    ...state.cart,
    items: state.cart.items.filter((item) => item.id !== id),
  },
});


// 3. Increment qty of one item
const incrementQty = (state, id) => ({
  ...state,
  cart: {
    ...state.cart,
    items: state.cart.items.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    ),
  },
});


// 4. Decrement qty, never below 1
const decrementQty = (state, id) => ({
  ...state,
  cart: {
    ...state.cart,
    items: state.cart.items.map((item) =>
      item.id === id
        ? { ...item, qty: Math.max(1, item.qty - 1) }
        : item
    ),
  },
});


// 5. Change city
const setCity = (state, city) => ({
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city,
    },
  },
});


// 6. Toggle a tag
const toggleTag = (state, tag) => ({
  ...state,
  selectedTags: state.selectedTags.includes(tag)
    ? state.selectedTags.filter((item) => item !== tag)
    : [...state.selectedTags, tag],
});


// 7. Apply discount to every item
const discountAll = (state, percent) => ({
  ...state,
  cart: {
    ...state.cart,
    items: state.cart.items.map((item) => ({
      ...item,
      price: item.price - (item.price * percent) / 100,
    })),
  },
});


// 8. Move item from one index to another
const moveItem = (state, from, to) => {
  const items = [...state.cart.items];
  const [item] = items.splice(from, 1);

  items.splice(to, 0, item);

  return {
    ...state,
    cart: {
      ...state.cart,
      items,
    },
  };
};

// ---------- tests ----------

function check(name, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);

  console.log(
    pass
      ? `PASS  ${name}`
      : `FAIL  ${name}\n      got      ${JSON.stringify(actual)}\n      expected ${JSON.stringify(expected)}`
  );

  return pass;
}


// 1. addItem
const item = {
  id: 3,
  title: "Lamp",
  price: 100,
  qty: 1,
};

const added = addItem(state, item);

check(
  "addItem - item added",
  added.cart.items.length,
  3
);

check(
  "addItem - correct item",
  added.cart.items[2],
  item
);

check(
  "addItem - original unchanged",
  state.cart.items.length,
  2
);


// 2. removeItem
const removed = removeItem(state, 1);

check(
  "removeItem - item removed",
  removed.cart.items.map((item) => item.id),
  [2]
);

check(
  "removeItem - original unchanged",
  state.cart.items.map((item) => item.id),
  [1, 2]
);


// 3. incrementQty
const incremented = incrementQty(state, 1);

check(
  "incrementQty - qty increased",
  incremented.cart.items[0].qty,
  2
);

check(
  "incrementQty - other item untouched",
  incremented.cart.items[1].qty,
  3
);

check(
  "incrementQty - original unchanged",
  state.cart.items[0].qty,
  1
);


// 4. decrementQty
const decremented = decrementQty(state, 2);

check(
  "decrementQty - qty decreased",
  decremented.cart.items[1].qty,
  2
);

check(
  "decrementQty - original unchanged",
  state.cart.items[1].qty,
  3
);


// Test never goes below 1
const oneState = {
  ...state,
  cart: {
    ...state.cart,
    items: state.cart.items.map((item) =>
      item.id === 1
        ? { ...item, qty: 1 }
        : item
    ),
  },
};

const decrementedOne = decrementQty(oneState, 1);

check(
  "decrementQty - never below 1",
  decrementedOne.cart.items[0].qty,
  1
);


// 5. setCity
const cityChanged = setCity(state, "Mumbai");

check(
  "setCity - city changed",
  cityChanged.user.address.city,
  "Mumbai"
);

check(
  "setCity - original unchanged",
  state.user.address.city,
  "Pune"
);


// 6. toggleTag
const tagAdded = toggleTag(state, "sale");

check(
  "toggleTag - tag added",
  tagAdded.selectedTags,
  ["new", "sale"]
);

check(
  "toggleTag - original unchanged",
  state.selectedTags,
  ["new"]
);


// Toggle existing tag off
const tagRemoved = toggleTag(state, "new");

check(
  "toggleTag - existing tag removed",
  tagRemoved.selectedTags,
  []
);

check(
  "toggleTag - original still unchanged",
  state.selectedTags,
  ["new"]
);


// 7. discountAll
const discounted = discountAll(state, 10);

check(
  "discountAll - first price discounted",
  discounted.cart.items[0].price,
  450
);

check(
  "discountAll - second price discounted",
  discounted.cart.items[1].price,
  135
);

check(
  "discountAll - original unchanged",
  state.cart.items.map((item) => item.price),
  [500, 150]
);


// 8. moveItem
const moved = moveItem(state, 0, 1);

check(
  "moveItem - items moved",
  moved.cart.items.map((item) => item.id),
  [2, 1]
);

check(
  "moveItem - original unchanged",
  state.cart.items.map((item) => item.id),
  [1, 2]
);


// ---------- reference checks ----------

check(
  "new state reference",
  state !== added,
  true
);

check(
  "new cart reference",
  state.cart !== added.cart,
  true
);

check(
  "new items reference",
  state.cart.items !== added.cart.items,
  true
);

console.log("\nImmutable drills completed.");