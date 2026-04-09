"use client";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

/**
 * Data Types definition first as per AGENTS.md
 */
interface ItemData {
  name: string;
  id: number;
}

const DATA: ItemData[] = [
  { name: "Apple", id: 1 },
  { name: "Banana", id: 2 },
  { name: "Orange", id: 3 },
  { name: "Mango", id: 4 },
  { name: "Pineapple", id: 5 },
  { name: "Watermelon", id: 6 },
  { name: "Carrot", id: 7 },
  { name: "Broccoli", id: 8 },
  { name: "Mushroom", id: 9 },
  { name: "Tomato", id: 10 },
  { name: "Cucumber", id: 11 },
];

/**
 * Best Solution for Production:
 * 1. Immediate search state for responsive UI.
 * 2. useDebounce hook to derive the 'single input' value after 500ms.
 * 3. useMemo for high-performance data filtering on debounced input.
 */
const DebounceTest = () => {
  const [search, setSearch] = useState("");
  
  // High-performance: Get only one 'single input' value after user stops typing
  const debouncedSearch = useDebounce(search, 500);

  // Optimization: Only re-filter when the single debounced input changes
  const filteredResult = useMemo(() => {
    if (!debouncedSearch) return DATA;
    
    console.log("Filtering for:", debouncedSearch);
    return DATA.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="c-container py-10">
      <div className="flex flex-col gap-8 max-w-md mx-auto">
        <header className="space-y-2">
          <h1 className="font-press-start-2p text-primary text-lg">Debounce test</h1>
          <p className="font-pixelify-sans text-on-surface-variant">
            Filtering only after 500ms of inactivity
          </p>
        </header>

        <div className="space-y-4">
          <label className="font-silkscreen text-xs uppercase text-outline">
            Search Item
          </label>
          <input
            type="text"
            className="pixel-input"
            placeholder="Type to search..."
            onChange={handleSearchChange}
            value={search}
          />
        </div>

        <div className="pixel-card p-6 min-h-[300px]">
          <h2 className="font-press-start-2p text-[10px] mb-6 text-secondary">
            Results ({filteredResult.length})
          </h2>
          <div className="space-y-3">
            {filteredResult.length > 0 ? (
              filteredResult.map((item) => (
                <div 
                  key={item.id} 
                  className="font-silkscreen p-2 border-b border-outline-variant/30 text-on-background hover:text-primary transition-colors"
                >
                  {item.name}
                </div>
              ))
            ) : (
              <div className="font-silkscreen text-outline-variant italic">
                No items found...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { DebounceTest };
