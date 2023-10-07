import "../styles/Header.css";

interface REPLHeader {
  loadedCSV: string;
  isBrief: boolean;
}

export function REPLHeader(props: REPLHeader) {
  var mode = "Brief";
  if (!props.isBrief) {
    mode = "Verbose";
  }
  return (
    <div className="Header">
      <table className="Header-Table">
        <tr>
          <td>
            <p className="REPL-header">
              <b>Mode:</b> {mode}
            </p>
          </td>
          <td>
            <p className="REPL-header">
              <b>Loaded CSV:</b> {props.loadedCSV.substring(0, 20)}
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
}
