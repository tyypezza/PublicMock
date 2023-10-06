import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  history: [string, string[][]][];
  setHistory: Dispatch<SetStateAction<[string, string[][]][]>>;
  isBrief: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
}
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */

  function handleSubmit(commandString: string) {
    var output = "";
    if (commandString == "mode") {
      if (props.isBrief) {
        props.setMode(false);
        output = "Mode was set to verbose";
      } else {
        props.setMode(true);
        output = "Mode was set to brief";
      }
    } else if (commandString.startsWith("load", 0)) {
      output = "Load csv";
    } else if (commandString == "view") {
      output = "View csv";
    } else if (commandString == "search") {
      output = "Search csv";
    } else {
      output = "Invalid command";
    }
    props.setHistory([[commandString, [[output]]], ...props.history]);
    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
