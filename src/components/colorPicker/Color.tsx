import { useEffect, useState } from "react";
import { colorFnc } from "./colorPickerData/color";

const Color = () => {
  const [active, setActive] = useState(false);
  const [theme, setTheme] = useState(true);
  const [range, setRange] = useState<number>(0.4);
  const [colorList, setColorList] = useState<any>([]);
  useEffect(() => {
    // console.log(colorFnc(range));
    let color = colorFnc(range);
    setColorList(color);
  }, [range]);
  const handleRange = (e: any) => {
    const inputValue = Number(e.target.value); // Assuming e.target.value is a string representing a number
    const rangeFix = Number((Math.floor(inputValue / 10) * 0.1).toFixed(1));
    setRange(rangeFix);
    console.log(inputValue);
  };
  //   console.log(colorFnc(theme));
  //   let color = colorFnc(range) ? colorFnc : [];
  const [color, setColor] = useState<string>("red");
  const handleColorChange = (color: string) => {
    setColor(color);
  };
  return (
    <div className="w-80 shadow-md p-5 mt-32 ">
      <div className="flex ">
        <span className="w-1/2"> color</span>
        <div className="w-1/2 relative flex  items-center space-x-2">
          <button
            className="w-6 h-6 rounded-full  "
            onClick={() => setActive(!active)}
            style={{ backgroundColor: color }}></button>
          <input
            type="text"
            value={color}
            className="w-3/4 border rounded-md"
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
          <div
            className={` ${
              active ? "block" : "hidden"
            } absolute bottom-8  border shadow-md  rounded-md py-1`}>
            <div className="flex justify-between px-1">
              <button
                className="   bg-red-900 text-sm rounded-lg px-1 text-white "
                onClick={() => setTheme(true)}>
                theme
              </button>

              <input
                type="color"
                className="w-6 h-6 border rounded-full  "
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            {theme && (
              <div>
                {colorList?.map((color: any, index: any) => (
                  <button
                    key={index}
                    className="h-6 w-6 rounded-full mx-2"
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorChange(color.value)}></button>
                ))}
                <>
                  <input
                    type="range"
                    max={100}
                    min={10}
                    onChange={(e) => handleRange(e)}
                  />
                </>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Color;
