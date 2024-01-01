import React, { use, useEffect, useState } from "react";
import { colorFnc, gradientPosition } from "./colorPickerData/color";

const Background = () => {
  const [active, setActive] = useState(false);
  const [theme, setTheme] = useState(true);
  const [range, setRange] = useState<number>(0.4);
  const [colorList, setColorList] = useState<any>([]);

  const [gradientPos, setGradientPos] = useState<string>("to left");
  const [colorAdd, setColorAdd] = useState<any>([]);
  const [gradientStyle, setGradientStyle] = useState<any>({});

  const handleAdd = (e: any) => {
    let colors = colorFnc(range);
    const rand = Math.floor(Math.random() * colors.length);
    console.log(rand);
    setColorAdd([...colorAdd, colors[rand].value]);
  };

  useEffect(() => {
    const newColor = colorAdd.join(",");
    const v = colorAdd.length == 1 ? `${newColor},${newColor}` : newColor;
    console.log(v);
    const newArr = {
      background: `linear-gradient(${gradientPos}, ${v})`,
      // Add other styles as needed
    };
    setGradientStyle(newArr);
  }, [colorAdd, gradientPos]);
  const [fixColor, setFixColor] = useState<any>();
  const [toggle, setToggle] = useState<boolean>(false);
  const handleAddedColor = (e: any) => {
    if (fixColor == e) {
      setToggle(!toggle);
    } else {
      setToggle(true);
    }
    setFixColor(e);
  };
  const handleAddedColors = (e: any) => {
    // setFixColor(e);
    // colorAdd[fixColor] = e;
    const data = colorAdd.map((item: any, index: any) => {
      return index == fixColor ? (item = e) : item;
    });
    setColorAdd(data);
  };
  const [textColor, setTextColor] = useState<boolean>(false);
  const removeAllColor = () => {
    setTextColor(!textColor);
  };
  console.log(textColor);
  const handleAddedColorRemove = (idx: any) => {
    const data = colorAdd.filter((item: any, index: any) => index !== idx);
    setToggle(false);
    setColorAdd(data);
  };
  return (
    <div className="w-80 shadow-md p-5 mt-32 ">
      <h1
        style={
          textColor
            ? {
                ...gradientStyle,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }
            : gradientStyle
        }
        className="w-[200px] h-32 ">
        welcome my home {textColor.toString()}
      </h1>
      <div className="flex justify-between py-5">
        <span>Gradient</span>
        <select
          className="border"
          onChange={(e) => setGradientPos(e.target.value)}>
          {gradientPosition.map((item: any, index: any) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {colorAdd.map((item: any, index: any) => (
          <div key={index}>
            <button
              className="w-6 h-6 rounded-full mx-1"
              style={{ background: item }}
              onClick={() => handleAddedColor(index)}></button>
            {!index == 0 && (
              <button
                className="w-6 h-6 rounded-full mx-1"
                onClick={() => handleAddedColorRemove(index)}>
                x
              </button>
            )}
          </div>
        ))}
      </div>
      <h1>selecte color from here</h1>
      {toggle && (
        <div>
          {colorFnc(".5").map((item: any, index: any) => (
            <button
              className="w-6 h-6 rounded-full mx-1"
              style={{ background: item.value }}
              key={index}
              onClick={() => handleAddedColors(item.value)}></button>
          ))}
          <input
            type="color"
            onChange={(e) => handleAddedColors(e.target.value)}
          />
        </div>
      )}

      <button onClick={handleAdd}>+Add</button>
      <div>
        <button onClick={() => removeAllColor()}>remove</button>
      </div>
    </div>
  );
};

export default Background;
