import "../styles/main.css";

export interface BriefSingleHistoryProps {
  history: [string, string[][]];
}

export function BriefSingleHistory(props: BriefSingleHistoryProps) {
  const command: string = props.history[0];
  const output: string[][] = props.history[1];
  if (command == "mode") {
    return <div>{output[0][0]}</div>;
  }
  if (command.startsWith("load", 0)) {
    return <div>{output[0][0]}</div>;
  }
  return <div>{output}</div>;
}
