import { useEffect, useState } from "react";

import images from "../../utils/images.json";
import style from "./style.module.scss";
import Image from "next/image";
import { releaseNotesApi } from "../../utils/base-methods";
import InnerHTML from "../InnerHTML";
import useWindowUtils from "../../hooks/useWindowUtils";

const ReleaseNotesComponent = () => {
  const [tab, setTab] = useState("marketplace");
  const [releaseNotesMarketPlace, setreleaseNotesMarketPlace] = useState([]);
  const [releaseNotesMclGame, setreleaseNotesMclGame] = useState([]);

  useEffect(() => {
    getReleaseNotesMarketPlace();
    getReleaseNotesMCL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getReleaseNotesMarketPlace = async () => {
    try {
      const result = await releaseNotesApi("MarketPlace");
      setreleaseNotesMarketPlace(result?.data?.data?.release_notes);
      setTab("marketplace");
    } catch (error) {
      console.log(error);
    }
  };
  const getReleaseNotesMCL = async () => {
    try {
      const result = await releaseNotesApi("MclGame");
      setreleaseNotesMclGame(result?.data?.data?.release_notes);
    } catch (error) {
      console.log(error);
    }
  };
  const window = useWindowUtils();
  const { width: innerWidth } = window;
  return (
    <>
      <div className={`${style["releasenotes-wrapper"]} releasenotes-wrapper`}>
        <Image
          unoptimized={true}
          src={
            innerWidth < 425
              ? images?.releaseNotes_mobile
              : images?.releaseNotes
          }
          alt="Release"
          width={750}
          height={150}
        />

        <div className={style["c-tabs"]}>
          <div
            role="button"
            onClick={() => setTab("marketplace")}
            className={`${style["nav-tab"]} ${
              tab === "marketplace" ? style["active"] : ""
            }`}
          >
            MarketPlace
          </div>
          <div
            role="button"
            onClick={() => setTab("mcl")}
            className={`${style["nav-tab"]} ${
              tab === "mcl" ? style["active"] : ""
            }`}
          >
            Mcl Game
          </div>
        </div>
        <div className={"c-tab-body"}>
          {(() => {
            if (tab === "marketplace") {
              return (
                <div className="row">
                  {releaseNotesMarketPlace.length > 0 ? (
                    releaseNotesMarketPlace?.map((item, i) => (
                      <div className="col-12" key={`marketplace-${i}`}>
                        <article className={` release-notes-card-box`}>
                          <InnerHTML content={item?.release_notes_content} />
                        </article>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center mb-5">
                      <h3 className="my-3">No Release Notes </h3>
                    </div>
                  )}
                </div>
              );
            } else if (tab === "mcl") {
              return (
                <div className="row">
                  {releaseNotesMarketPlace.length > 0 ? (
                    releaseNotesMclGame?.map((item, i) => (
                      <div className="col-12" key={`mcl-${i}`}>
                        <article className={` release-notes-card-box`}>
                          <InnerHTML content={item?.release_notes_content} />
                        </article>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center mb-5">
                      <h3 className="my-3">No Release Notes</h3>
                    </div>
                  )}
                </div>
              );
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default ReleaseNotesComponent;
