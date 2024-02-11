import style from "./style.module.scss";

const PrizeBreakup = () => (
  <section className={style["prize-breakup-section"]}>
    <h4 className={style["prize-breakup-section-title"]}>
      <span>PRIZE POOL</span> BREAKDOWN
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
          <td>$105</td>
        </tr>
        <tr>
          <td>2</td>
          <td>$90</td>
        </tr>
        <tr>
          <td>3</td>
          <td>$75</td>
        </tr>
        <tr>
          <td>4</td>
          <td>$55</td>
        </tr>
        <tr>
          <td>5</td>
          <td>$25</td>
        </tr>
        <tr>
          <td>6-10</td>
          <td>$20</td>
        </tr>
        <tr>
          <td>11-50</td>
          <td>$10</td>
        </tr>
        <tr>
          <td>51-200</td>
          <td>$5</td>
        </tr>
        <tr>
          <td>201-500</td>
          <td>$3</td>
        </tr>
        <tr>
          <td>501-1000</td>
          <td>$2</td>
        </tr>
        <tr>
          <td>1001-2500</td>
          <td>$1.30</td>
        </tr>
        <tr>
          <td>2501-4500</td>
          <td>$1</td>
        </tr>
        <tr>
          <td>4501-7000 </td>
          <td>$0.80</td>
        </tr>
        <tr>
          <td>7001-10000</td>
          <td>$0.60</td>
        </tr>
        <tr>
          <td>10001-15000</td>
          <td>$0.45</td>
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
    <p>*TDS applicable for winnings above INR 10,000 for Indian users.</p>
  </section>
);

export default PrizeBreakup;
