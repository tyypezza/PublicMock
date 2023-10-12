import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
// import { path_to_data, search } from "../data/mockedJson";
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

/**
 * this is the REPLInput function that returns that actual input components with
 * functionality
 * 
 * @param props 
 * @returns 
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  
  /**
   * this function handles when the submit button is pressed. and parses the command
   * for whether or not it's load, search, etc. 
   * @param commandString 
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
    } else if (commandString.startsWith("load_file", 0)) {
      handleLoadFile(commandString);
    } else if (commandString == "view") {
      handleViewFile(commandString);
    } else if (commandString.startsWith("search", 0)) {
      handleSearchFile(commandString);
    } else if (commandString.length !== 0) {
      output = "Invalid command";
      props.setHistory([[commandString, [[output]]], ...props.history]);
    }
    //don't have props.setHistory here bc we want nothing to happen if we submit with empty input
    setCommandString("");
  }

  /**
   * this function handles loading the file command, prints the proper messages
   * and stores the 2d array in the backend. 
   * @param commandString 
   */
  function handleLoadFile(commandString: string) {
    var output = "";
    const path = commandString.substring(10);
    const csv = path_to_data.get(path);
    if (csv) {
      // this line checks if the csv exists and if so add it
      props.setLoadedCSVMessage(path);
      output = "Successfully loaded " + path;
      props.setHistory([[commandString, [[output]]], ...props.history]);
      props.setCurrCSV(csv);
    } else {
      // if the csv does not exist, return error message
      output = "Path to file does not exist!";
      props.setHistory([[commandString, [[output]]], ...props.history]);
    }
  }

  function handleViewFile(commandString: string) {
    if (props.loadedCSVMessage == "No CSV Loaded") {
      let output = "Currently there is no CSV loaded.";
      //first and easiest I could think of to let single history classes know if a csv is loaded
      props.setHistory([
        [commandString + "none", [[output]]],
        ...props.history,
      ]);
    } else {
      props.setHistory([[commandString, props.currCSV], ...props.history]);
    }
  }


  /**
   * this handles the searching functionality if the command starts with "search"
   * and adds the rows found. 
   * @param commandString 
   */
  function handleSearchFile(commandString: string) {
    if (props.loadedCSVMessage == "No CSV Loaded") {
      let output = "Currently there is no CSV loaded.";
      //first and easiest I could think of to let single history classes know if a csv is loaded
      props.setHistory([[commandString, [[output]]], ...props.history]);
    } else {
      var searchParams: string[] = [];
      try {
        searchParams = parseSearchInput(commandString.substring(7));
      } catch (error) {
        searchParams = [];
      }
      if (searchParams.length !== 2 ) {
        let output = "Search must follow the input instructions. Format: search <column> <value>";
        props.setHistory([["search wrong", [[output]]], ...props.history]);
      } else {

        var rowsFound: string[][] = [[searchParams[0]]];
        
        let column = searchParams[0]
        let term = searchParams[1]

        //this checks if it's an integer or can be parsed as an integer
        if (!isNaN(parseInt(column))) {
          rowsFound = search(parseInt(column), term)
        } else {
          rowsFound = search(column, term)
        }

        // if nothing is found, then return a proper error message
        if (rowsFound.length !== 0) {
          props.setHistory([[commandString, rowsFound], ...props.history]);
        } else {
          props.setHistory([[commandString, [["No Results Found!"]]], ...props.history]);
        }
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

  /**
   * this is a mocked search that can handle taking in a column idenfitier
   * as either a string or a number. 
   * @param column 
   * @param term 
   * @returns 
   */
  function search(column: string | number, term: string) {
    var rowsFound: string[][] = [];
    if (typeof(column) === "string") {
      // type checking but this was also used in the livecode, since either a string or number
      // can be taken in 

      // the following if statements are mocked searches
      if (column === "Data Type" && term === "Multiracial" && props.loadedCSVMessage === "csv1") {
        rowsFound = [props.currCSV[6]];
      }

      if (column === "IPEDS" && term === "Asian" && props.loadedCSVMessage === "csv3") {
        rowsFound = [props.currCSV[1], props.currCSV[9]];
      }

      if (column === "ID Race" && term === "0" && props.loadedCSVMessage === "csv2") {
        rowsFound = [
          props.currCSV[1],
          props.currCSV[2],
          props.currCSV[3],
          props.currCSV[4],
          props.currCSV[5]
        ];
      }

    } else if (typeof(column) === "number") {
      // type checking but this was also used in the livecode, since either a string or number
      // can be taken in

      // the following if statements are mocked searches
      if (
        column === 1 &&
        term === "Multiracial" &&
        props.loadedCSVMessage === "csv1"
      ) {
        rowsFound = [props.currCSV[6]];
      }
      if (
        column === 0 &&
        term === "Asian" &&
        props.loadedCSVMessage === "csv3"
      ) {
        rowsFound = [props.currCSV[1], props.currCSV[9]];
      }

      if (column === 0 && term === "0" && props.loadedCSVMessage === "csv2") {
        rowsFound = [
          props.currCSV[1],
          props.currCSV[2],
          props.currCSV[3],
          props.currCSV[4],
          props.currCSV[5],
        ];
      }
    }

    return rowsFound;
  }


  return (
    //actually returning the input html dev thing
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
