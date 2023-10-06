import "../styles/main.css";
import { BriefSingleHistory } from "./BriefSingleHistory";
import { VerboseSingleHistory } from "./VerboseSingleHistory";

interface REPLHistoryProps {
  history: [string, string[][]][];
  isBrief: boolean;
}
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
