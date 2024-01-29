import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {MainPage} from "pages/MainPage";
import {UpdatelContext} from "../features/Context/UpdateContext";

function App() {
    const [update, setUpdate] = useState<boolean>(false)

  return (
      <UpdatelContext.Provider value={{update, setUpdate}}>
                  <Routes>
            <Route path={"/"} element={<MainPage/>}/>
        </Routes>

      </UpdatelContext.Provider>
  );
}

export default App;
