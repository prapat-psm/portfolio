"use client";

import { useState, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Lead Creative Developer Review:
 * 
 * 1. State Management: The previous component used multiple arrays (dataTest, vType, fType), 
 *    which leads to verbose logic when moving items (filtering from one, appending to another).
 *    Better approach: Use a single source of truth and filter/derive the views.
 * 
 * 2. Interaction: Individual item removal from sorted lists was missing (only a global reset).
 *    Better approach: Clicking an item should toggle its location.
 * 
 * 3. Aesthetics: The original was bare-bones.
 *    Better approach: Use the established Pixel Art design system (Press Start 2P font, 
 *    pixel borders, Framer Motion for premium feel).
 */

interface PixelStyle extends CSSProperties {
  "--color-base"?: string;
}

type ItemType = "Fruit" | "Vegetable";

interface Item {
  id: string; // Added ID for better React key management
  type: ItemType;
  name: string;
  location: "main" | "sorted";
}

const INITIAL_DATA: Item[] = [
  { id: "1", type: "Fruit", name: "Apple", location: "main" },
  { id: "2", type: "Vegetable", name: "Broccoli", location: "main" },
  { id: "3", type: "Vegetable", name: "Mushroom", location: "main" },
  { id: "4", type: "Fruit", name: "Banana", location: "main" },
  { id: "5", type: "Vegetable", name: "Tomato", location: "main" },
  { id: "6", type: "Fruit", name: "Orange", location: "main" },
  { id: "7", type: "Fruit", name: "Mango", location: "main" },
  { id: "8", type: "Fruit", name: "Pineapple", location: "main" },
  { id: "9", type: "Vegetable", name: "Cucumber", location: "main" },
  { id: "10", type: "Fruit", name: "Watermelon", location: "main" },
  { id: "11", type: "Vegetable", name: "Carrot", location: "main" },
];

export const PixelTest = () => {
  const [items, setItems] = useState<Item[]>(INITIAL_DATA);

  const toggleItemLocation = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, location: item.location === "main" ? "sorted" : "main" }
          : item
      )
    );
  };

  const resetCategory = (type: ItemType) => {
    setItems((prev) =>
      prev.map((item) =>
        item.type === type ? { ...item, location: "main" } : item
      )
    );
  };

  const mainList = items.filter((i) => i.location === "main");
  const fruitList = items.filter((i) => i.location === "sorted" && i.type === "Fruit");
  const vegetableList = items.filter((i) => i.location === "sorted" && i.type === "Vegetable");

  return (
    <div className="c-container py-10 font-silkscreen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main List */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-press-start-2p text-primary mb-4 text-center h-12 flex items-center justify-center">
            INVENTORY
          </h2>
          <div className="flex flex-col gap-3 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {mainList.map((item) => (
                <motion.button
                  layout
                  key={item.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleItemLocation(item.id)}
                  className="btn-pixel w-full text-left"
                  style={{ "--color-base": "var(--color-surface-variant)" } as PixelStyle}
                >
                  {item.name}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Vegetables Column */}
        <div className="pixel-card p-6 flex flex-col gap-4">
          <button 
            onClick={() => resetCategory("Vegetable")}
            className="btn-pixel btn-pixel--secondary w-full mb-4 font-press-start-2p text-[10px]"
            style={{ "--color-base": "#4ade80" } as PixelStyle} // Green for Veggies
          >
            VEGETABLES
          </button>
          <div className="flex flex-col gap-3 min-h-[300px]">
            <AnimatePresence mode="popLayout">
              {vegetableList.map((item) => (
                <motion.button
                  layout
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => toggleItemLocation(item.id)}
                  className="btn-pixel w-full"
                  style={{ "--color-base": "var(--color-outline-variant)" } as PixelStyle}
                >
                  {item.name}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Fruits Column */}
        <div className="pixel-card p-6 flex flex-col gap-4">
          <button 
            onClick={() => resetCategory("Fruit")}
            className="btn-pixel w-full mb-4 font-press-start-2p text-[10px]"
            style={{ "--color-base": "#fb923c" } as PixelStyle} // Orange for Fruits
          >
            FRUITS
          </button>
          <div className="flex flex-col gap-3 min-h-[300px]">
            <AnimatePresence mode="popLayout">
              {fruitList.map((item) => (
                <motion.button
                  layout
                  key={item.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => toggleItemLocation(item.id)}
                  className="btn-pixel w-full"
                  style={{ "--color-base": "var(--color-outline-variant)" } as PixelStyle}
                >
                  {item.name}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>

      <div className="mt-12 text-center text-outline text-xs uppercase tracking-widest opacity-50">
        Click items to sort • Click categories to reset
      </div>
    </div>
  );
};

export default PixelTest;
