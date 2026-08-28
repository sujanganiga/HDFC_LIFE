// drills/es6.js
const results = []
function check(name, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected)
  results.push(pass)
  console.log(pass ? `PASS  ${name}` : `FAIL  ${name}\n      got      ${JSON.stringify(actual)}\n      expected ${JSON.stringify(expected)}`)
}

// ---------- sample data ----------
const products = [
  { id: 1, title: 'Phone',  price: 500, rating: 4.5, category: 'tech',  tags: ['new', 'sale'] },
  { id: 2, title: 'Laptop', price: 900, rating: 4.8, category: 'tech',  tags: ['sale'] },
  { id: 3, title: 'Chair',  price: 150, rating: 4.5, category: 'home',  tags: [] },
  { id: 4, title: 'Lamp',   price: 150, rating: 3.9, category: 'home',  tags: ['new'] },
]

// 1. Find product title by id
const titleById = (list, id) =>
  list.find((product) => product.id === id)?.title ?? "Not found";


// 2. Return titles only
const titles = (list) =>
  list.map((product) => product.title);


// 3. Total value of all products
const totalValue = (list) =>
  list.reduce((total, product) => total + product.price, 0);


// 4. Count products by category
const countByCategory = (list) =>
  list.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1;
    return acc;
  }, {});


// 5. Sum price by category
const priceByCategory = (list) =>
  list.reduce((acc, product) => {
    acc[product.category] =
      (acc[product.category] ?? 0) + product.price;

    return acc;
  }, {});


// 6. Get every unique tag
const allTags = (list) =>
  [...new Set(list.flatMap((product) => product.tags))];


// 7. Check if any product is cheaper than limit
const hasCheaperThan = (list, limit) =>
  list.some((product) => product.price < limit);


// 8. Destructure parameter
const describe = ({ title, price }) =>
  `${title} costs ${price}`;


// 9. Return new product with markup
const withMarkup = (product, percent) => ({
  ...product,
  price: product.price + (product.price * percent) / 100,
});


// 10. Remove tags without mutating original
const stripTags = (product) => {
  const { tags, ...withoutTags } = product;

  return withoutTags;
};


// 11. Safely read city
const cityOf = (user) =>
  user?.address?.city ?? "Unknown";


// 12. Stock: 0 must remain 0
const stockLabel = (product) =>
  product.stock ?? "Out of stock";


// 13. Category totals sorted descending
const categoryTotals = (list) =>
  Object.entries(priceByCategory(list))
    .map(([category, total]) => ({
      category,
      total,
    }))
    .sort((a, b) => b.total - a.total);


// 14. Products rated above min
const topRatedTitles = (list, min) =>
  list
    .filter((product) => product.rating > min)
    .map((product) => product.title)
    .join(", ");


// 15. Average price rounded to 2 decimals
const averagePrice = (list) =>
  Number(
    (
      list.reduce((total, product) => total + product.price, 0) /
      list.length
    ).toFixed(2)
  );

// ---------- tests ----------
check('titleById',       titleById(products, 2),        'Laptop')
check('titleById miss',  titleById(products, 99),       'Not found')
check('titles',          titles(products),              ['Phone', 'Laptop', 'Chair', 'Lamp'])
check('totalValue',      totalValue(products),          1700)
check('countByCategory', countByCategory(products),     { tech: 2, home: 2 })
check('priceByCategory', priceByCategory(products),     { tech: 1400, home: 300 })
check('allTags',         allTags(products).sort(),      ['new', 'sale'])
check('hasCheaperThan',  hasCheaperThan(products, 200), true)
check('describe',        describe(products[0]),         'Phone costs 500')
check('withMarkup',      withMarkup(products[0], 10).price, 550)
check('no mutation',     products[0].price,             500)
check('stripTags',       'tags' in stripTags(products[0]), false)
check('cityOf',          cityOf({ address: { city: 'Pune' } }), 'Pune')
check('cityOf empty',    cityOf({}),                    'Unknown')
check('stockLabel zero', stockLabel({ stock: 0 }),      0)
check('stockLabel none', stockLabel({}),                'Out of stock')
check('categoryTotals',  categoryTotals(products),      [{ category: 'tech', total: 1400 }, { category: 'home', total: 300 }])
check('topRatedTitles',  topRatedTitles(products, 4.4), 'Phone, Laptop, Chair')
check('averagePrice',    averagePrice(products),        425)

console.log(`\n${results.filter(Boolean).length}/${results.length} passing`)