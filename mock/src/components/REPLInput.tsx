import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { path_to_data } from "../data/mockedJson";

interface REPLInputProps {
  history: [string, string[][]][];
  setHistory: Dispatch<SetStateAction<[string, string[][]][]>>;
  isBrief: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
  loadedCSVMessage: string;
  setLoadedCSVMessage: Dispatch<SetStateAction<string>>;
  currCSV: string[][];
  setCurrCSV: Dispatch<SetStateAction<string[][]>>;
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
      props.setHistory([[commandString, [[output]]], ...props.history]);
    } else if (commandString.startsWith("load_file ", 0)) {
      handleLoadFile(commandString);
    } else if (commandString == "view") {
      handleViewFile(commandString);
    } else if (commandString == "search") {
      output = "Search " + props.loadedCSVMessage;
      props.setHistory([[commandString, [[output]]], ...props.history]);
    } else if (commandString.length !== 0) {
      output = "Invalid command";
      props.setHistory([[commandString, [[output]]], ...props.history]);
    }
    //don't have props.setHistory here bc we want nothing to happen if we submit with empty input
    setCommandString("");
  }

  function handleLoadFile(commandString: string) {
    var output = "";
    const path = commandString.substring(10);
    const csv = path_to_data.get(path);
    if (csv) {
      props.setLoadedCSVMessage(path);
      output = "load_file " + path;
      props.setHistory([[commandString, [[output]]], ...props.history]);
      props.setCurrCSV(csv);
      console.log("success i think load_file");
    } else {
      output = "Path to file does not exist!";
      props.setHistory([[commandString, [[output]]], ...props.history]);
    }
  }

  function handleViewFile(commandString: string) {
    if (props.loadedCSVMessage == "No CSV Loaded") {
      let output = "Currently there is no CVS loaded.";
      //first and easiest I could think of to let single history classes know if a csv is loaded
      props.setHistory([
        [commandString + "none", [[output]]],
        ...props.history,
      ]);
    } else {
      props.setHistory([[commandString, props.currCSV], ...props.history]);
    }
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
