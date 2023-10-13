import { useState } from "react";
import "../styles/main.css";
import { REPLHeader } from "./REPLHeader";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/**
 * This is the main component that contains the header, history, and input.
 * Additionally, it holds all the props and state changers that are passed as inputs into the proper
 * components.
 *
 * @returns the actual repl components, with the header, history, and input.
 */
export default function REPL() {
  const [history, setHistory] = useState<[string, string[][]][]>([]);
  const [isBrief, setMode] = useState<boolean>(true);
  const [loadedCSVMessage, setLoadedCSVMessage] =
    useState<string>("No CSV Loaded");
  const [currCSV, setCurrCSV] = useState<string[][]>([]);

  return (
    <div className="repl">
      <REPLHeader loadedCSV={loadedCSVMessage} isBrief={isBrief} />
      <br></br>
      <REPLHistory history={history} isBrief={isBrief} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        isBrief={isBrief}
        setMode={setMode}
        loadedCSVMessage={loadedCSVMessage}
        setLoadedCSVMessage={setLoadedCSVMessage}
        currCSV={currCSV}
        setCurrCSV={setCurrCSV}
      />
    </div>
  );
}
