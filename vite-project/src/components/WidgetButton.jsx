import React, { useState } from "react";
import Widget from "./Widget";
import Button from "./Button";

const WidgetButton = () => {
  const [showWidget, setShowWidget] = useState(false);
  const handleButtonClick = () => {
    showWidget === false ? setShowWidget(true) : setShowWidget(false);
  };
  return (
    <div>
      {showWidget ? <Widget handleButtonClick={handleButtonClick}/> : <Button handleButtonClick={handleButtonClick}/>}
      {/* Initially display Button if it is clicked display the Widget */}
    </div>
  );
};

export default WidgetButton;
