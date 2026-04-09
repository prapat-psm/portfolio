"use client";
import { useState } from "react";

type ItemType = "Fruit" | "Vegetable";
type Item = {
  type: ItemType;
  name: string;
};
const data: Item[] = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

const Test = () => {
  const [dataTest, setDataTest] = useState<Item[]>(data);
  const [vType, setVType] = useState<Item[]>([]);
  const [fType, setFType] = useState<Item[]>([]);

  const handleClickCheckType = (item: Item) => {
    switch (item.type) {
      case "Fruit":
        setDataTest((prev) => prev.filter((p) => p.name !== item.name));
        setFType((prev) => [...prev, item]);
        break;

      default:
        setDataTest((prev) => prev.filter((p) => p.name !== item.name));
        setVType((prev) => [...prev, item]);
        break;
    }
  };

  const handleResetVegetableType = () => {
    setDataTest((prev) => [...prev, ...vType]);
    setVType([]);
  };

  const handleResetFruitType = () => {
    setDataTest((prev) => [...prev, ...fType]);
    setFType([]);
  };

  return (
    <div className="c-container">
      <div className="flex gap-4">
        <div className="flex-1/3">
          {dataTest.map((item) => (
            <div key={item.name}>
              <button type="button" onClick={() => handleClickCheckType(item)}>
                {item.name}
              </button>
            </div>
          ))}
        </div>
        <div className="flex-1/3">
          <button
            className="text-lg"
            type="button"
            onClick={handleResetVegetableType}>
            Vegetable
          </button>
          {vType.map((item) => (
            <div key={item.name}>{item.name}</div>
          ))}
        </div>
        <div className="flex-1/3">
          <button
            className="text-lg"
            type="button"
            onClick={handleResetFruitType}>
            Fruit
          </button>
          {fType.map((item) => (
            <div key={item.name}>{item.name}</div>
          ))}
        </div>
        {/* {Object.entries(groupedData).map(([type, names]) => (
        <div key={type}>
          <h2>{type}</h2>
          <ul>
            {names.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      ))} */}
      </div>
    </div>
  );
};

export default Test;
