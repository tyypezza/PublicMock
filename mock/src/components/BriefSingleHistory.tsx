import "../styles/main.css";
import { ViewTable } from "./ViewTable";

export interface BriefSingleHistoryProps {
  history: [string, string[][]];
}

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

  return (
    <div>
      {output}
      <hr></hr>
    </div>
  );
}
