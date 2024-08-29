import { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";

export default function CitationGenerator() {
    // Array mit allen Zitate
    // wir wollen das React den Wert speichert aber
    // die Benutzeroberfläche muss nicht aktualisiert werden bei Änderung
    const quotesRef = useRef([]);

    // wir wollen das React den Wert speichert
    // die Benutzeroberfläche muss aktualisiert werden bei Änderung
    const [activeQuote, setActiveQuote] = useState(null);

    // wird nur einmal ausgeführt
    useEffect(() => {
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
        .then(response => response.json())
        .then(data => {
            quotesRef.current = data.quotes;
            setActiveQuote(data.quotes[0])
        })

    }, [])

    function getRandomQuote() {
        if (quotesRef.current.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotesRef.current.length);
            setActiveQuote(quotesRef.current[randomIndex]);
        }
    }

    return (
        <div>
            {
                activeQuote ? (
                <div className="citation-box">
                    <p>"{activeQuote.quote}"</p>
                    <p>- {activeQuote.author}</p>
                    <button className="citation-box__btn" onClick={getRandomQuote}>Next quote</button>
                </div>
                ) : (
                <Spinner />
                ) 
            }
        </div>
    )
}