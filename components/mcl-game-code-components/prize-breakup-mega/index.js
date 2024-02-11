import style from "./style.module.scss";

const PrizeBreakupMega = () => (
  <section className={style["prize-breakup-section"]}>
    <h4 className={style["prize-breakup-section-title"]}>
      <span>APT TOKEN PRIZE POOL</span> BREAKDOWN IN $
    </h4>
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>
            Winnings<sup>*</sup>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>$100</td>
        </tr>
        <tr>
          <td>2</td>
          <td>$75</td>
        </tr>
        <tr>
          <td>3</td>
          <td>$60</td>
        </tr>
        <tr>
          <td>4</td>
          <td>$40</td>
        </tr>
        <tr>
          <td>5</td>
          <td>$32</td>
        </tr>
        <tr>
          <td>6-10</td>
          <td>$19</td>
        </tr>
        <tr>
          <td>11-30</td>
          <td>$10</td>
        </tr>
        <tr>
          <td>31-80</td>
          <td>$7.00</td>
        </tr>
        <tr>
          <td>81-280</td>
          <td>$3.00</td>
        </tr>
        <tr>
          <td>281-1000</td>
          <td>$1.40</td>
        </tr>
        <tr>
          <td>1001-3000</td>
          <td>$1.20</td>
        </tr>
        <tr>
          <td>3001-5000</td>
          <td>$1.10</td>
        </tr>
        <tr>
          <td>5001-7000 </td>
          <td>$1.05</td>
        </tr>
        <tr>
          <td>7001-9000</td>
          <td>$1.00</td>
        </tr>
        <tr>
          <td>9001-11000</td>
          <td>$0.98</td>
        </tr>
        <tr>
          <td>11001-13000</td>
          <td>$0.95</td>
        </tr>
        <tr>
          <td>13001-15000</td>
          <td>$0.90</td>
        </tr>
        <tr>
          <td>15001-17000</td>
          <td>$0.85</td>
        </tr>
        <tr>
          <td>17001-19000</td>
          <td>$0.82</td>
        </tr>
        <tr>
          <td>19001-22000</td>
          <td>$0.80</td>
        </tr>
        <tr>
          <td>22001-25000</td>
          <td>$0.78</td>
        </tr>
        {/* <tr>
          <td>
            <strong>TOTAL</strong>
          </td>
          <td>
            <strong>$5000.00</strong>
          </td>
        </tr> */}
      </tbody>
    </table>
    <p>*TDS applicable to winnings for Indian users.</p>
  </section>
);

export default PrizeBreakupMega;
