import * as React from "react";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export const MusicContext = createContext();

export function useMusicContext() {
  return useContext(MusicContext);
}

export const MusicContextProvider = ({ children }) => {
  const [urlForm, setUrlForm] = React.useState("");
  const [url, setUrl] = useState("");

  function handleUrlInputChange(event) {
    setUrl(event.target.value);
  }

  function handleOnSubmitUrl(event) {
    event.preventDefault();
    setUrlForm(url);
  }

  const MusicContextVariables = {
    urlForm,
    url,
    setUrlForm,
    setUrl,
    handleUrlInputChange,
    handleOnSubmitUrl,
};

    return (
        <MusicContext.Provider value = {{MusicContextVariables}}>
            {children}
        </MusicContext.Provider> 
    )

};
