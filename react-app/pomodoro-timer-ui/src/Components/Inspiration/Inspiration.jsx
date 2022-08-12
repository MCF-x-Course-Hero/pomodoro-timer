import * as React from "react";
import { useSettingsContext } from "../../contexts/SettingsContext";
import axios from "axios";
import "./Inspiration.css";

export default function Inspiration() {
    const { settingsStates } = useSettingsContext();
    const [quotes, setQuotes] = React.useState([]);
    const [quote, setQuote] = React.useState("");
    const[fadeQuote, setFadeQuote] = React.useState({fade: 'fade-in',})

    React.useEffect(() => {
        const getQuotes = async () => {
          try {
            const response = await axios.get('https://type.fit/api/quotes');
            setQuotes(response.data);
          } catch(err) {
            console.error(err);
          }
        };
        getQuotes();
    }, []);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            let min = Math.ceil(0);
            let max = Math.floor(1642);
            let newQuote = Math.floor(Math.random() * (max - min) + min);
            setFadeQuote({ fade: 'fade-out' });
            setTimeout(() => {
                setQuote(quotes[newQuote]);
                setFadeQuote({ fade: 'fade-in' });
            }, 5000);
        }, 25000);
        return () => clearInterval(intervalId);
    })

    return(
        <div className="inspiration-box">
            {settingsStates.inspiration ? (
                <>
                    <p className={fadeQuote.fade}>{quote ? (quote.author !== null ? `"${quote.text}"` : quote.text) : ""}</p>
                    <p className={fadeQuote.fade} id="author">{quote ? (quote.author !== null ? `~ ${quote.author}` : null) : ""}</p>
                </>
            ) : null}
        </div>
    )
}