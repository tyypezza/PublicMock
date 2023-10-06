import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

export default function REPL() {
  const [history, setHistory] = useState<[string, string[][]][]>([]);
  const [isBrief, setMode] = useState<boolean>(true);

  return (
    <div className="repl">
      <REPLHistory history={history} isBrief={isBrief} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        isBrief={isBrief}
        setMode={setMode}
      />
    </div>
  );
}
