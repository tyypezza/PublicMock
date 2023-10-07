import "../styles/main.css";

export interface VerboseSingleHistoryProps {
  history: [string, string[][]];
}

export function VerboseSingleHistory(props: VerboseSingleHistoryProps) {
  const command: string = props.history[0];
  const output: string[][] = props.history[1];
  if (command == "mode") {
    return <div>{"Command: " + command + ", Output: " + output[0][0]}</div>;
  }
  if (command.startsWith("load", 0)) {
    return <div>{"Command: " + command + ", Output: " + output[0][0]}</div>;
  }
  return <div>{"Command: " + command + ", Output: " + output}</div>;
}
