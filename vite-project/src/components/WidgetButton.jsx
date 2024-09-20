import React from "react";
import Widget from "./Widget";
import Button from "./Button";

const WidgetButton = () => {
  return (
    <div>
      {/* Initially display Button if it is clicked display the Widget */}
      {/* <Button /> */}
      <Widget/>
    </div>
  );
};

export default WidgetButton;
