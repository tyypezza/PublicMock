import { useState } from "react";
import "../styles/main.css";
import { REPLHeader } from "./REPLHeader";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

export default function REPL() {
  const [history, setHistory] = useState<[string, string[][]][]>([]);
  const [isBrief, setMode] = useState<boolean>(true);
  const [loadedCSV, setLoadedCSV] = useState<string>("No CSV Loaded");

  return (
    <div className="repl">
      <REPLHeader loadedCSV={loadedCSV} isBrief={isBrief} />
      <REPLHistory history={history} isBrief={isBrief} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        isBrief={isBrief}
        setMode={setMode}
        setLoadedCSV={setLoadedCSV}
      />
    </div>
  );
}
