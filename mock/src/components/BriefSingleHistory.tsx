import "../styles/main.css";
import { ViewTable } from "./ViewTable";

/**
 * Interface for BriefSingleHistory
 * Takes in a history state
 */
export interface BriefSingleHistoryProps {
  history: [string, string[][]];
}

/**
 * Function for designing the individual brief history
 * @param props a history state, a tuple, which has the
 * command and output to be displayed
 * @returns A div with the output in "brief" style
 */
export function BriefSingleHistory(props: BriefSingleHistoryProps) {
  const command: string = props.history[0];
  const output: string[][] = props.history[1];
  if (command == "mode") {
    return (
      <div>
        {output[0][0]}
        <hr></hr>
      </div>
    );
  }
  if (command.startsWith("load", 0)) {
    return (
      <div>
        {output[0][0]}
        <hr></hr>
      </div>
    );
  }
  if (command.startsWith("view", 0)) {
    //first and easiest I could think of to let single history classes know if a csv is loaded
    if (command == "viewnone") {
      return (
        <div>
          {output[0][0]}
          <hr></hr>
        </div>
      );
    } else {
      return <ViewTable history={props.history} />;
    }
  }

  if (command.startsWith("search ", 0)) {
    //first and easiest I could think of to let single history classes know if a csv is loaded
    if (command == "search none" || command == "search wrong") {
      return (
        <div>
          {output[0][0]}
          <hr></hr>
        </div>
      );
    } else {
      return <ViewTable history={props.history} />;
    }
  }

  return (
    <div className="single-history-result">
      {output}
      <hr></hr>
    </div>
  );
}
