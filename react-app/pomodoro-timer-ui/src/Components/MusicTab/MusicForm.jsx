import * as React from "react";
import "./MusicTab.css";
import "./MusicForm.css";
import {useMusicContext} from "../../contexts/MusicContext"

import { Button, TextField, ThemeProvider } from "@mui/material";

export default function MusicForm() {
  const {MusicContextVariables} = useMusicContext()
  const handleOnSubmitUrl = MusicContextVariables.handleOnSubmitUrl
  const handleUrlInputChange = MusicContextVariables.handleUrlInputChange
  const url = MusicContextVariables.url
  // const url = MusicContextVariables.urlForm
  return (
    <div className="music-form">
      <form onSubmit={handleOnSubmitUrl}>
        <TextField
          variant="filled"
          label="Paste YouTube URL"
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
