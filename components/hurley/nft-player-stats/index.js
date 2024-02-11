// import style from "./style.module.scss";
import Image from "next/image";
import { hurleyLevels, level } from "../../../utils/common";

const NFTPlayerStats = ({ stats = [], core }) => {
  return (
    <>
      <section className="player-stats">
        {level(core?.level?.value) && (
          <div className="heading-block">
            <h3>Stats </h3>

            <div className="player-level">
              <h6>{hurleyLevels(core?.level?.value).name}</h6>
              <Image
                unoptimized={true}
                height={64}
                width={68}
                src={hurleyLevels(core?.level?.value).value}
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
