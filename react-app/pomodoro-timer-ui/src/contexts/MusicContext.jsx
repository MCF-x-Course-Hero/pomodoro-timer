import * as React from "react";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export const MusicContext = createContext();

export function useMusicContext() {
  return useContext(MusicContext);
}

export const MusicContextProvider = ({ children }) => {
  const defaultUrl = "https://www.youtube.com/watch?v=jfKfPfyJRdk"
  const [urlForm, setUrlForm] = React.useState("");
  const [url, setUrl] = useState("");

  function handleUrlInputChange(event) {
    setUrl(event.target.value);
    // setUrlForm(event.target.value);
  }

  function handleOnSubmitUrl(event) {
    event.preventDefault();
    if (url=="") {
      return}
    setUrlForm(url);
    setUrl("")
  }

  function handleOnSubmitIcon(url) {
    setUrlForm(url);
  }

  const MusicContextVariables = {
    urlForm,
    url,
    setUrlForm,
    setUrl,
    handleUrlInputChange,
    handleOnSubmitUrl,
    handleOnSubmitIcon,
};

    return (
        <MusicContext.Provider value = {{MusicContextVariables}}>
            {children}
        </MusicContext.Provider> 
    )

};
