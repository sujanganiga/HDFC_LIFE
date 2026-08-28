
import { Search } from "lucide-react";

function FilterBar({
  search,
  category,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}) {
  return (
    <div className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* Search */}
        <div>
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Search
          </label>

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="search"
              type="search"
              value={search}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search products..."
              className="min-h-10 w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(event) =>
              onCategoryChange(event.target.value)
            }
            className="min-h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          >
            <option value="">
              All categories
            </option>

            {categories.map((item) => (
              <option
                key={item.slug}
                value={item.slug}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label
            htmlFor="sort"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Sort
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value)
            }
            className="min-h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          >
            <option value="">
              Default
            </option>

            <option value="price-asc">
              Price: Low → High
            </option>

            <option value="price-desc">
              Price: High → Low
            </option>

            <option value="rating-desc">
              Rating: High → Low
            </option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default FilterBar;

