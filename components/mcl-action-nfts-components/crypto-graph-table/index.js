import { Line } from "peity-react";

import style from "./style.module.scss";

const CryptoGraphTable = ({}) => {
  return (
    <section className={style["crypto-graph-table"]}>
      <table>
        <tr className={style["head-row"]}>
          <th>COINS</th>
          <th>PRICE (USD)</th>
          <th>CHANGE</th>
          <th></th>
        </tr>
        <tr className={style["data-row"]}>
          <td>ETH</td>
          <td>1,268.13</td>
          <td>+22.72</td>
          <td>
            <Line
              values={[5, 3, 9, 6, 5, 9, 7, 3, 5, 2]}
              strokeColor="#1DFF00"
              fillColor="#1dff0090"
            />
          </td>
        </tr>
      </table>
    </section>
  );
};

export default CryptoGraphTable;
