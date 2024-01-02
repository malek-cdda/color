import React, { useEffect, useState } from "react";

const Theme = ({ colorFnc, handleColorChanges }: any) => {
  const [theme, setTheme] = useState(true);
  const [range, setRange] = useState<number>(0.4);
  const [colorList, setColorList] = useState<any>([]);
  // color opacity set and change here 0.1 to 1
  useEffect(() => {
    setColorList(colorFnc(range));
  }, [range, colorFnc]);
  //   change color opacity using range value
  const handleRange = (e: any) => {
    const inputValue = Number(e.target.value);
    const rangeFix = Number((Math.floor(inputValue / 10) * 0.1).toFixed(1));
    setRange(rangeFix);
  };

  return (
    <div className="flex flex-col bg-black px-5 py-3 rounded-lg gap-2 absolute left-0 bottom-8 z-10 ">
      <div className="flex justify-between px-1">
        <button
          className="   bg-red-900 text-sm rounded-lg px-1 text-white "
          onClick={() => setTheme(true)}>
          theme
        </button>
        <input
          type="color"
          className="w-6 h-6 border rounded-full  "
          onChange={(e) => handleColorChanges(e.target.value)}
        />
      </div>
      {theme && (
        <div>
          <div>
            {colorList?.map((color: any, index: any) => (
              <button
                key={index}
                className="h-6 w-6 rounded-full mx-2"
                style={{ backgroundColor: color.value }}
                onClick={() => handleColorChanges(color.value)}></button>
            ))}
          </div>
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
  );
};

export default Theme;
