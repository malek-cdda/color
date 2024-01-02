import { useEffect, useState } from "react";
// import { colorFnc, gradientPosition } from "../colorPickerData/color";
import Theme from "./Theme";
const Background = ({ initialColor, colorFnc, gradientPosition }: any) => {
  const [gradientPos, setGradientPos] = useState<string>("to left");
  const [colorAdd, setColorAdd] = useState<any>([initialColor]);
  const [gradientStyle, setGradientStyle] = useState<any>({});
  const [textColor, setTextColor] = useState<boolean>(false);
  const [fixColor, setFixColor] = useState<any>();
  const [openChooseColor, setOpenChooseColor] = useState<number | null>(null);
  const [gradientColorPos, setGradientColorPos] =
    useState<string>("linear-gradient");
  const [preview, setPreview] = useState<any>(false);
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
    let newArr;

    if (gradientColorPos === "normal") {
      console.log(colorAdd);
      newArr = {
        background: fixColor ? colorAdd[fixColor] : colorAdd[0],
        // Add other styles as needed
      };
    } else {
      newArr = {
        background: `${gradientColorPos}(${gradientPos}, ${colorAdded})`,
        // Add other styles as needed
      };
    }
    setGradientStyle(newArr);
  }, [colorAdd, gradientPos, gradientColorPos, fixColor]);

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
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div className="   relative flex justify-center ">
      {toggle && (
        <div className="w-80 shadow-md p-5 mt-10  ">
          {preview && (
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
              className="w-full h-6 my-5 rounded-md "></h1>
          )}
          {/* selece gradient item  */}
          <div className="flex justify-between">
            <GradientItem handleGradientItem={handleGradientItem} />
            <button
              className="bg-blue-300 px-3 py-1 rounded-md hover:bg-blue-400"
              onClick={() => {
                setPreview(!preview);
              }}>
              preview
            </button>
          </div>
          {/* slect your gradient position  */}
          <GradientPosition
            setGradientPos={setGradientPos}
            gradientColorPos={gradientColorPos}
            gradientPosition={gradientPosition}
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
      )}
      <div>
        <button
          className={`h-6 w-6 left-1/2 top-0 absolute  bg-[${initialColor}]  rounded-full block`}
          style={{ background: initialColor }}
          onClick={() => setToggle(!toggle)}></button>
      </div>
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
        {["linear-gradient", "radial-gradient", "normal"].map(
          (item: any, index: any) => (
            <option key={index} value={item}>
              {item}
            </option>
          )
        )}
      </select>
    </div>
  );
};
// color added here
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
      {colorAdd.map((item: any, index: number) => (
        <div key={index} className="relative flex items-center gap-1 py-1  ">
          {/* <span className="bg-red-900 ">{item}</span> */}

          <button
            className="w-6 h-6 rounded-full mx-1"
            style={{ background: item }}
            onClick={() => handleAddedColor(index)}></button>
          <input
            onChange={(e) => handleColorChanges(e.target.value)}
            value={item}
            className="w-1/2 border rounded-md px-2"
          />

          {!(index === 0) && (
            <button
              className="w-6 h-6 rounded-full   hover:bg-gray-300/60"
              onClick={() => handleAddedColorRemove(index)}>
              x
            </button>
          )}
          {/* {console.log(!index == 0, index)} */}
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
// gradient position here
const GradientPosition = ({
  setGradientPos,
  gradientColorPos,
  gradientPosition,
}: any) => {
  return (
    <div className="flex justify-between py-5">
      <span>Gradient</span>
      <select
        className="border"
        onChange={(e) => setGradientPos(e.target.value)}>
        {gradientPosition?.map((item: any, index: any) => {
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
