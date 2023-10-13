import "../styles/main.css";
import { BriefSingleHistory } from "./BriefSingleHistory";
import { VerboseSingleHistory } from "./VerboseSingleHistory";

interface REPLHistoryProps {
  history: [string, string[][]][];
  isBrief: boolean;
}
/**
 * This is the REPLHistory function that returns the maps all the things inside of
 * the history into either a brief or verbose single history depending on the mode.
 * @param props
 * @returns
 */
export function REPLHistory(props: REPLHistoryProps) {
  if (props.isBrief) {
    return (
      <div className="repl-history">
        {props.history.map(([command, output]) => (
          <BriefSingleHistory history={[command, output]} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="repl-history">
        {props.history.map(([command, output]) => (
          <VerboseSingleHistory history={[command, output]} />
        ))}
      </div>
    );
  }
}
