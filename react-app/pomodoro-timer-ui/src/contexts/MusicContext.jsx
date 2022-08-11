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
  const [shouldPlay, setShouldPlay] = React.useState(true)
  function handleUrlInputChange(event) {
    setUrl(event.target.value);
  }

  function handleOnSubmitUrl(url) {
    
    if (!url) return
    setUrlForm(url);
    setUrl("")
  }

  function handleOnSubmitIcon(url) {
    setUrlForm(url);
  }

  function toggleMedia(shouldPlay="true"){
    setShouldPlay(shouldPlay)
  }


  const MusicContextVariables = {
    urlForm,
    url,
    shouldPlay,
    setUrlForm,
    setUrl,
    handleUrlInputChange,
    handleOnSubmitUrl,
    handleOnSubmitIcon,
    setShouldPlay,
    toggleMedia,
};

    return (
        <MusicContext.Provider value = {{MusicContextVariables}}>
            {children}
        </MusicContext.Provider> 
    )

};
