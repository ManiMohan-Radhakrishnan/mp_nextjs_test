import FlipCountdown from "@rumess/react-flip-countdown";

import { useWindowSize } from "../../utils/useWindowSize";
import style from "./style.module.scss";
const FlipTimer = ({
  classNames,
  endTime,
  handleEndEvent = () => {},
  hideMonth = true,
}) => {
  const windowSize = useWindowSize();
  return endTime ? (
    <div className={classNames}>
      <FlipCountdown
        key={`endtime${endTime}`}
        theme={"dark"}
        size={windowSize.width > 560 ? "medium" : "small"}
        titlePosition="bottom"
        dayTitle="Days"
        hourTitle="Hours"
        minuteTitle="Minutes"
        secondTitle="Seconds"
        endAt={endTime}
        onTimeUp={handleEndEvent}
        endAtZero
        hideYear
        hideMonth={hideMonth}
      />
    </div>
  ) : (
    <>
      <h2 className={`${style["tba"]}`}>TBA</h2>
    </>
  );
};

export default FlipTimer;
