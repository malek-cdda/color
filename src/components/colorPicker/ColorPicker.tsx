import React, { useEffect, useState } from "react";
import Background from "./theme/Background";
import { colorFnc, gradientPosition } from "./colorPickerData/color";
import Theme from "./theme/Theme";

const ColorPicker = () => {
  const selectColor = "red";
  const [color, setColor] = useState<string>("red");

  const [colorAdd, setColorAdd] = useState<any>(["red"]);
  let newArr;
  const [gradientVarient, setGradientVarient] = React.useState<string>(
    selectColor.includes("gradient") ? "gradient" : "normal"
  );
  // TOGGLE NORMAL AND GRADIENT STATE COLOR
  const handleRadioChange = (e: any) => {
    const radioValue = e.target.value;

    setGradientVarient(radioValue);
  };
  const handleGetCollor = (e: any) => {
    setColor(e);
  };

  const [toggle, setToggle] = React.useState<boolean>(false);
  console.log(selectColor.includes("gradient") ? true : false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // Check if the click is inside the component
      if (event.target instanceof Node && !event.target.closest(".relative")) {
        setToggle(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [toggle]);

  const handleToggle = (value: boolean) => {
    newArr = {};
    setColorAdd(["red"]);
    setToggle(value);
  };
  console.log(color);
  return (
    <div className="relative  rounded-md">
      {/* <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleCopy}>Copy</button>
      </div> */}

      <div className="flex justify-center rounded-md mb-1.5">
        <button
          className="  h-6 w-6 rounded-full"
          style={{ background: color ? color : selectColor }}
          onClick={() => handleToggle(!toggle)}></button>
      </div>
      {toggle && (
        <div className="w-80 bg-white border px-5 py-3 rounded-md  shadow-md   before:absolute before:border-4   before:border-transparent  before:border-b-[#696969] before:top-[22px] before:left-[48.5%]  ">
          <div className="duration-300 ">
            <SelectedColorType
              gradientVarient={gradientVarient}
              handleRadioChange={handleRadioChange}
            />
            {gradientVarient === "gradient" && (
              <Background
                initialColor={color}
                colorFnc={colorFnc}
                gradientPosition={gradientPosition}
                setColor={setColor}
                color={color}
                handleGetCollors={handleGetCollor}
                newArr={newArr}
                colorAdd={colorAdd}
                setColorAdd={setColorAdd}
              />
            )}
            {gradientVarient === "normal" && (
              <div className="w-full    ">
                <Theme colorFnc={colorFnc} handleGetCollor={handleGetCollor} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

const SelectedColorType = ({ gradientVarient, handleRadioChange }: any) => {
  return (
    <div className="text-center flex flex-wrap justify-center pb-3 ">
      <div className="flex items-center mr-4  ">
        <input
          id="radio1"
          type="radio"
          name="radio"
          className="hidden"
          value="normal"
          checked={gradientVarient === "normal"}
          onChange={handleRadioChange}
        />
        <label htmlFor="radio1" className="flex items-center cursor-pointer">
          <span
            className={` ${
              gradientVarient === "normal" && "bg-green-500"
            }  w-4 h-4 inline-block mr-1 rounded-full border border-grey transition-transform hover:scale-110 group-hover:bg-blue-500 group-hover:shadow-inner`}></span>
          normal
        </label>
      </div>
      <div className="flex items-center mr-4 ">
        <input
          id="radio2"
          type="radio"
          name="radio"
          className="hidden"
          value="gradient"
          checked={gradientVarient === "gradient"}
          onChange={handleRadioChange}
        />
        <label htmlFor="radio2" className="flex items-center cursor-pointer">
          <span
            className={` ${
              gradientVarient === "gradient" && "bg-blue-500"
            }  w-4 h-4 inline-block mr-1 rounded-full border border-grey transition-transform hover:scale-110 group-hover:bg-blue-500 group-hover:shadow-inner`}></span>
          gradient
        </label>
      </div>
    </div>
  );
};
