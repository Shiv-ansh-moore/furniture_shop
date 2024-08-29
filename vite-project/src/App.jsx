import Widget from "./components/Widget";
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const App = () => {
  return (
    <>
      <Widget />
    </>
  );
};
export default App;
