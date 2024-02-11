import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ToolTip = ({ icon, placement, content }) => {
  return (
    <>
      <OverlayTrigger
        key={placement}
        placement={placement}
        overlay={<Tooltip className="tooltip-text">{content}</Tooltip>}
      >
        <span>{icon}</span>
      </OverlayTrigger>
    </>
  );
};

export default ToolTip;
