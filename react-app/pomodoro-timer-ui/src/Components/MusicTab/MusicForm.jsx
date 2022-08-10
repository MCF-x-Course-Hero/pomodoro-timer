import * as React from "react";
import "./MusicTab.css";
import "./MusicForm.css"

import { Button, TextField, ThemeProvider } from "@mui/material";

export default function MusicForm({ urlForm, setUrlForm }) {
  // create logic for url form
    const [url, setUrl] = React.useState("")

  function handleUrlInputChange(event) {
    
      setUrl(event.target.value)  
    }

    function handleOnSubmitUrl(event) {
        event.preventDefault()
            setUrlForm(url)  

  }

  return (
    <div className="music-form">
      <form onSubmit={handleOnSubmitUrl}>
        <TextField
          variant="filled"
          label="url"
          size="medium"
          fullWidth
          name="url"
          type="url"
          value={url}
          onChange={handleUrlInputChange}
          className="music-form-input"
          style={{ width: "315px" }}
        ></TextField>
        <Button
          size="large"
          type="submit"
          style={{
            color: "white",
            padding: "13px 13px",
          }}
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
}
