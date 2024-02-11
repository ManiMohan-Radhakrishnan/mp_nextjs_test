// import style from "./style.module.scss";
import Image from "next/image";
import { hurleyLevels, level } from "../../utils/common";

const NFTPlayerStats = ({ nftData, stats = [], core }) => {
  const playerStyle = [
    { type: "LH", value: "Left Hand" },
    { type: "RH", value: "Right Hand" },
    { type: "LA", value: "Left Arm" },
    { type: "RA", value: "Right Arm" },
  ];

  const style = playerStyle.find(
    (obj) => obj.type === core?.dominant_hand?.value
  );
  return (
    <>
      {core?.role?.value === "Batsman" && (
        <h5 className="stats-hint">
          Batsman performance against different bowler type
        </h5>
      )}
      <section className="player-stats">
        {level(core?.level?.value) && (
          <div className="heading-block">
            <h3>
              {nftData?.game_name === "hurley" ? "Stats" : "Player Stats"}
              {/* {style?.value && <span className="player">({style?.value})</span>} */}
              {style?.value && (
                <span className={"player"}>
                  ( {style?.value}{" "}
                  {core?.role?.value === "Bowler"
                    ? core?.bowling_style?.value
                    : ""}{" "}
                  )
                </span>
              )}
            </h3>

            <div className="player-level">
              <h6>
                {nftData?.game_name === "hurley"
                  ? hurleyLevels(core?.level?.value).name
                  : level(core?.level?.value).name}
              </h6>
              <Image
                unoptimized={true}
                height={64}
                width={68}
                src={
                  nftData?.game_name === "hurley"
                    ? hurleyLevels(core?.level?.value).value
                    : level(core.level?.value).value
                }
                alt="Player_level"
                loading="lazy"
              />
            </div>
          </div>
        )}

        <div className="player-stats-list">
          <ul>
            {stats.map((stat, i) => (
              <li key={`stat-${i}`}>
                <span className="key">{stat.name}</span>
                <span className="value">
                  <span>{stat.value} </span> / {stat.maximum}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default NFTPlayerStats;
