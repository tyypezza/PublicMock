import "../styles/main.css";

export interface ViewTableProps {
  history: [string, string[][]];
}

export function ViewTable(props: ViewTableProps) {
  const command: string = props.history[0];
  const output: string[][] = props.history[1];
  return (
    <div>
      <table className="Output-Table">
        <tbody>
          {output.map((row) => (
            <tr>
              {row.map((datum) => (
                <td className="Output-Datum">{datum}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <hr></hr>
    </div>
  );
}
