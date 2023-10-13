import "../styles/main.css";
import { ViewTable } from "./ViewTable";

/**
 * Interface for VerboseSingleHistory
 * Takes in a history state
 */
export interface VerboseSingleHistoryProps {
  history: [string, string[][]];
}

/**
 * Function for designing the individual verbose history
 * @param props a history state, a tuple, which has the
 * command and output to be displayed
 * @returns A div with the output in "verbose" style
 */
export function VerboseSingleHistory(props: VerboseSingleHistoryProps) {
  const command: string = props.history[0];
  const output: string[][] = props.history[1];
  if (command == "mode") {
    return (
      <div>
        {"Command: " + command}
        <br></br>
        {"Output: " + output[0][0]}
        <hr></hr>
      </div>
    );
  }

  if (command.startsWith("load", 0)) {
    return (
      <div>
        {"Command: " + command}
        <br></br>
        {"Output: " + output[0][0]}
        <hr></hr>
      </div>
    );
  }

  if (command.startsWith("view", 0)) {
    if (command == "viewnone") {
      return (
        <div>
          {"Command: view"}
          <br></br>
          {"Output: " + output[0][0]}
          <hr></hr>
        </div>
      );
    } else {
      return (
        <div>
          {"Command: " + command}
          <br></br>
          {"Output: "}
          <br></br>
          <ViewTable history={props.history} />
          <hr></hr>
        </div>
      );
    }
  }

  if (command.startsWith("search ", 0)) {
    if (command == "search none" || command == "search wrong") {
      return (
        <div>
          {"Command: search"}
          <br></br>
          {"Output: " + output[0][0]}
          <hr></hr>
        </div>
      );
    } else {
      return (
        <div>
          {"Command: " + command}
          <br></br>
          {"Output: "}
          <br></br>
          <ViewTable history={props.history} />
          <hr></hr>
        </div>
      );
    }
  }

  return (
    <div>
      {"Command: " + command}
      <br></br>
      {"Output: " + output}
      <hr></hr>
    </div>
  );
}
