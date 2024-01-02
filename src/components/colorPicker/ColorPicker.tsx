import React from "react";
import Background from "./theme/Background";
import { colorFnc, gradientPosition } from "./colorPickerData/color";

const ColorPicker = () => {
  return (
    <div className=" ">
      <Background
        initialColor="red"
        colorFnc={colorFnc}
        gradientPosition={gradientPosition}
      />
    </div>
  );
};

export default ColorPicker;
