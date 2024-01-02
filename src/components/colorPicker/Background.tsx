import React, { use, useEffect, useState } from "react";
import { colorFnc, gradientPosition } from "./colorPickerData/color";
import Theme from "./theme/Theme";

const Background = () => {
  const [gradientPos, setGradientPos] = useState<string>("to left");
  const [colorAdd, setColorAdd] = useState<any>([]);
  const [gradientStyle, setGradientStyle] = useState<any>({});
  const [textColor, setTextColor] = useState<boolean>(false);
  const [fixColor, setFixColor] = useState<any>();
  const [openChooseColor, setOpenChooseColor] = useState<number | null>(null);
  const [gradientColorPos, setGradientColorPos] =
    useState<string>("linear-gradient");
  // added color to background function
  const handleAdd = (e: any) => {
    let colors = colorFnc(1);
    const rand = Math.floor(Math.random() * colors.length);
    setColorAdd([...colorAdd, colors[rand].value]);
  };
  // added color to background function
  useEffect(() => {
    const newColor = colorAdd.join(",");
    const colorAdded =
      colorAdd.length == 1 ? `${newColor},${newColor}` : newColor;
    const newArr = {
      background: `${gradientColorPos}(${gradientPos}, ${colorAdded})`,
      // Add other styles as needed
    };
    setGradientStyle(newArr);
  }, [colorAdd, gradientPos, gradientColorPos]);

  //  open popup to choose your color
  const handleAddedColor = (e: any) => {
    setFixColor(e);
    e === openChooseColor ? setOpenChooseColor(null) : setOpenChooseColor(e);
  };
  // change your choose  color from popup
  const handleColorChanges = (e: any) => {
    setColorAdd(
      colorAdd.map((item: any, index: any) => {
        return index == fixColor ? (item = e) : item;
      })
    );
  };
  // remove color from background
  const handleAddedColorRemove = (idx: any) => {
    const data = colorAdd.filter((item: any, index: any) => index !== idx);
    setColorAdd(data);
  };

  // set graident item here
  const handleGradientItem = (e: any) => {
    setGradientPos(
      e.target.value == "radial-gradient" ? "circle at top" : "to left"
    );
    setGradientColorPos(e.target.value);
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
        className="w-[200px] h-32 "></h1>
      {/* selece gradient item  */}
      <GradientItem handleGradientItem={handleGradientItem} />
      {/* slect your gradient position  */}
      <GradientPosition
        setGradientPos={setGradientPos}
        gradientColorPos={gradientColorPos}
      />
      {/* added color to background  */}
      <ColorAdded
        colorAdd={colorAdd}
        handleAddedColor={handleAddedColor}
        handleColorChanges={handleColorChanges}
        handleAddedColorRemove={handleAddedColorRemove}
        openChooseColor={openChooseColor}
        colorFnc={colorFnc}
      />
      <button onClick={handleAdd}>+Add</button>
    </div>
  );
};

export default Background;
// type func = {
//   handleGradientItem: (e: any) => void;

// }
const GradientItem = ({ handleGradientItem }: any) => {
  return (
    <div>
      <select className="border" onChange={(e) => handleGradientItem(e)}>
        {["linear-gradient", "radial-gradient"].map((item: any, index: any) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
const ColorAdded = ({
  colorAdd,
  handleAddedColor,
  handleColorChanges,
  handleAddedColorRemove,
  openChooseColor,
  colorFnc,
}: any) => {
  return (
    <div>
      {colorAdd.map((item: any, index: any) => (
        <div key={index} className="relative">
          {/* <span className="bg-red-900 ">{item}</span> */}
          <button
            className="w-6 h-6 rounded-full mx-1"
            style={{ background: item }}
            onClick={() => handleAddedColor(index)}></button>
          <input
            onChange={(e) => handleColorChanges(e.target.value)}
            value={item}
            className="w-1/2"
          />
          {!index == 0 && (
            <button
              className="w-6 h-6 rounded-full mx-1"
              onClick={() => handleAddedColorRemove(index)}>
              x
            </button>
          )}
          <div>
            {" "}
            {/*   open popup to choose your color */}
            {openChooseColor === index && (
              <Theme
                colorFnc={colorFnc}
                handleColorChanges={handleColorChanges}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const GradientPosition = ({ setGradientPos, gradientColorPos }: any) => {
  return (
    <div className="flex justify-between py-5">
      <span>Gradient</span>
      <select
        className="border"
        onChange={(e) => setGradientPos(e.target.value)}>
        {gradientPosition.map((item: any, index: any) => {
          console.log(item);
          let data =
            gradientColorPos === "radial-gradient" ? item.rName : item.name;
          return (
            <option key={index} value={data}>
              {data}
            </option>
          );
        })}
      </select>
    </div>
  );
};
