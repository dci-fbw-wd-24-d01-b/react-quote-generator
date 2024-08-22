import { useState, useEffect } from "react";
import Spinner from "./Spinner";


export default function CitationGenerator() {

    const [allQuotes, setAllQuotes] = useState([]);
    const [activeQuote, setActiveQuote] = useState(null);

    useEffect(function() {
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
        .then(response => response.json())
        .then(data => {
            setAllQuotes(data.quotes);
            setActiveQuote(data.quotes[0]);
        })
    }, [])







    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * allQuotes.length);
        setActiveQuote(allQuotes[randomIndex]);
    }

    return (
        <div className="citation-box">
            {
                activeQuote ? (
                    <div>
                        <h3>{activeQuote.quote}</h3>
                        <p>- {activeQuote.author}</p>
                    </div>
                ) : (
                    // "... Zitate laden ..."
                    <Spinner />
                )
                
            }
            <button className="citation-box__btn" onClick={getRandomQuote}>Nächstes Zitat</button>
        </div>
    )
}