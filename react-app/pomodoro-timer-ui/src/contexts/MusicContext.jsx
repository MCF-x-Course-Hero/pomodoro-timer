import * as React from "react";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export const MusicContext = createContext();

const MUSIC_URL_KEY = "video-url"
export function useMusicContext() {
  return useContext(MusicContext);
}

export const MusicContextProvider = ({ children }) => {
  const [urlForm, setUrlForm] = React.useState("");
  const [activePreset, SetActivePreset] = React.useState("")
  const [url, setUrl] = useState("");
  const [shouldPlay, setShouldPlay] = React.useState(false);
  function handleUrlInputChange(event) {
    setUrl(event.target.value);
  }

  function handleOnSubmitUrl(url) {
    
    if (!url) return
    setUrlForm(url);
    setUrl("")
    SetActivePreset("")
  }

  function handleOnSubmitIcon(url) {
    setUrlForm(url);
  }

  function toggleMedia(shouldPlay="true"){
    setShouldPlay(shouldPlay)
  }

  React.useEffect(()=>{
    const storageMusicUrl = JSON.parse(
      localStorage.getItem(MUSIC_URL_KEY)
    );
    if (storageMusicUrl) setUrlForm(storageMusicUrl);
    setShouldPlay(false)
  },[])

  React.useEffect(()=>{
    localStorage.setItem(MUSIC_URL_KEY, JSON.stringify(urlForm))
  },[urlForm])



  const MusicContextVariables = {
    urlForm,
    url,
    shouldPlay,
    activePreset,
    setUrlForm,
    setUrl,
    handleUrlInputChange,
    handleOnSubmitUrl,
    handleOnSubmitIcon,
    setShouldPlay,
    toggleMedia,
    SetActivePreset
};

    return (
        <MusicContext.Provider value = {{MusicContextVariables}}>
            {children}
        </MusicContext.Provider> 
    )

};
