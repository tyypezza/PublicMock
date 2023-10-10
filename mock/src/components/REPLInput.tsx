import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { path_to_data, search } from "../data/mockedJson";
import { emit } from "process";

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
    } else if (commandString.startsWith("search ", 0)) {
      handleSearchFile(commandString);
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

  function handleSearchFile(commandString: string) {
    if (props.loadedCSVMessage == "No CSV Loaded") {
      let output = "Currently there is no CVS loaded.";
      //first and easiest I could think of to let single history classes know if a csv is loaded
      props.setHistory([["search none", [[output]]], ...props.history]);
    } else {
      var searchParams: string[] = [];
      try {
        searchParams = parseSearchInput(commandString.substring(7));
      } catch (error) {
        searchParams = [];
      }
      if (searchParams.length == 0 || searchParams.length > 2) {
        let output = "Search must follow the input instructions.";
        props.setHistory([["search wrong", [[output]]], ...props.history]);
      } else {
        console.log(searchParams);
        var rowsFound: string[][] = [[searchParams[0]]];
        if (searchParams.length == 1) {
          let term = searchParams[0];
          rowsFound = search("", term);
        } else {
          let column = searchParams[0];
          let term = searchParams[1];
          rowsFound = search(column, term);
        }
        props.setHistory([[commandString, rowsFound], ...props.history]);
      }
    }
  }

  /**
   *
   * @param searchParams String of user input after search
   * @returns returns a list of strings of the params. if any structure error,
   *          throw error
   */

  function parseSearchInput(searchParams: string) {
    let termArray: string[] = [];
    var isOpen = false;
    let chars = searchParams.split("");
    var index = 0;
    chars.map((c) => {
      if (c == "<") {
        if (!isOpen) {
          isOpen = true;
          termArray = [...termArray, ""];
        } else {
          //second open arrow
          throw Error;
        }
      } else if (c == ">") {
        if (isOpen) {
          isOpen = false;
          index++;
        } else {
          //second close arrow
          throw Error;
        }
      } else {
        if (isOpen == true) {
          termArray[index] = termArray[index].concat(c);
        } else {
          //characters not in arrows
          if (!(c == " ")) {
            throw Error;
          }
        }
      }
    });
    if (isOpen) {
      //never closed last arrow
      throw Error;
    }
    return termArray;
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
