import Image from "next/image";
import { useRouter } from "next/router";

import images from "../../../utils/images.json";
import style from "./style.module.scss";

const OurInvestor = () => {
  const router = useRouter();
  return (
    <section className={`${style["our-investor-section"]}`}>
      <div className="container-fluid">
        <div className="row mt-150">
          <div className="col-sm-12">
            <h2 className={style["sectionHeading"]}>
              INVESTORS &amp; ADVISORS
            </h2>
          </div>
        </div>
      </div>
      <section className={style["investor-box"]}>
        <article className={style["investor-member"]}>
          <div className={style["investor-member-img"]}>
            <Image
              unoptimized={true}
              height="100"
              width="100"
              src={images.invkal}
              alt="Kalaari Capital"
            />
          </div>

          <div className={style["investor-member-name-desc"]}>
            <h3 className={style["investor-member-name"]}>
              Kalaari <br />
              Capital
            </h3>
            <p className={style["investor-member-desc"]}>
              Kalaari Capital is an early-stage, technology-focused venture
              capital firm based out of Bengaluru, India. Kalaari has empowered
              visionary entrepreneurs to build unique solutions that reshape the
              way Indians live, work, consume and transact. The firm has
              provided a launchpad for multiple start-ups with its ethos to
              partner early with founders and work with them to navigate the
              inevitable challenges of fostering ideas into successful
              businesses.
            </p>
          </div>
        </article>

        <article className={style["investor-member"]}>
          <div className={style["investor-member-img"]}>
            <Image
              unoptimized={true}
              height="100"
              width="100"
              src={images.invlog}
              alt="Logan Anjaneyulu"
            />
          </div>

          <div className={style["investor-member-name-desc"]}>
            <h3 className={style["investor-member-name"]}>
              Logan <br />
              Anjaneyulu
            </h3>
            <p className={style["investor-member-desc"]}>
              Alamo - Investor and Ecosystem Fund Partner Logan Anjaneyulu is an
              Indian-born American Private Equity and Venture Capitalist with
              global investments. He is the founder and managing director of
              Alamo Equity, a $1.5 billion private equity firm; and Alamo
              Capital, an early-stage venture capital firm, both headquartered
              in San Antonio, Texas. He has been a Super Angel Investor for
              multiple startups including GuardianLink.
            </p>
          </div>
        </article>

        <article className={style["investor-member"]}>
          <div className={style["investor-member-img"]}>
            <Image
              unoptimized={true}
              height="100"
              width="100"
              src={images.otkp}
              alt="Keyur"
            />
          </div>

          <div className={style["investor-member-name-desc"]}>
            <h3 className={style["investor-member-name"]}>
              Keyur <br />
              Patel
            </h3>
            <p className={style["investor-member-desc"]}>
              He is one of the most dynamic visionaries in the digital realm. He
              incubated, hatched and funded some of the most successful
              companies including Amazon, Netflix, Twitter, PayPal, Sky+, NDTV,
              Yahoo! and Fabrik.
            </p>
          </div>
        </article>

        <article className={style["investor-member"]}>
          <div className={style["investor-member-img"]}>
            <Image
              unoptimized={true}
              height="100"
              width="100"
              src={images.invbar}
              alt="Barrie"
            />
          </div>

          <div className={style["investor-member-name-desc"]}>
            <h3 className={style["investor-member-name"]}>
              Barrie <br />
              M. Osborne
            </h3>
            <p className={style["investor-member-desc"]}>
              A prolific hollywood mogul, producer of Academy Award winning
              titles like Lord of the Rings, The Matrix, The Great Gatsby and
              several such epic media ventures. He is now leading Hollywood to
              adopting blockchain through ventures like GuardianLink.
            </p>
          </div>
        </article>
        <article className={style["investor-member"]}>
          <div className={style["investor-member-img"]}>
            <Image
              unoptimized={true}
              height="100"
              width="100"
              src={images.invrl}
              alt="Ross"
            />
          </div>

          <div className={style["investor-member-name-desc"]}>
            <h3 className={style["investor-member-name"]}>
              Ross
              <br />
              Levinsohn
            </h3>
            <p className={style["investor-member-desc"]}>
              Current CEO of Maven Media which controls Sports Illustrated and
              The History Channel among other media brands. He is best known for
              his roles at Yahoo and Fox, Ross has served as CEO of a number of
              high profile brands -- driving change, culture and results.
            </p>
          </div>
        </article>
        <article className={style["investor-member"]}>
          <div className={style["investor-member-img"]}>
            <Image
              unoptimized={true}
              height="100"
              width="100"
              src={images.invson}
              alt="Sonja"
            />
          </div>

          <div className={style["investor-member-name-desc"]}>
            <h3 className={style["investor-member-name"]}>
              Sonja <br />
              Nuttall
            </h3>
            <p className={style["investor-member-desc"]}>
              Sonja Nuttall is an Advisor, Investor and Excogitation Creator in
              the field of Fashion, Tech/Crypto, and product design globally.
              She is the Founder and CEO of Jyakuen Global LLC and also a
              Co-Founder and Principal Strategist of WEARE8. As an inventive
              fashioner and specialist, she has worked with prominent fashion
              labels like DKNY, Urban Zen, and others. She is an exceptionally
              compelling personality in the New York Fashion design industry.
            </p>
          </div>
        </article>
        <article className={style["investor-member"]}>
          <div className={style["investor-member-img"]}>
            <Image
              unoptimized={true}
              height="100"
              width="100"
              src={images.invkirthiga}
              alt="Kirthiga"
            />
          </div>

          <div className={style["investor-member-name-desc"]}>
            <h3 className={style["investor-member-name"]}>
              Kirthiga <br />
              Reddy
            </h3>
            <p className={style["investor-member-desc"]}>
              Kirthiga Reddy, a venture-partner for SoftBank ventures and the
              former Director of Facebook India, brings a wide spectrum of
              strategic leadership and management experiences from companies
              like Motorola, Silicon Graphics, & Phoenix Technologies.
              Kirthiga&apos;s vision for Web3 and prowess of business
              claoirvoyance guides RADDX and Jump.trade in the most congenial
              direction for our community and company alike.
            </p>
          </div>
        </article>
        <article className={style["investor-member"]}>
          <div className={style["investor-member-img"]}>
            <Image
              unoptimized={true}
              height="100"
              width="100"
              src={images.invvishakha}
              alt="VishakhaSingh"
            />
          </div>

          <div className={style["investor-member-name-desc"]}>
            <h3 className={style["investor-member-name"]}>
              Vishakha <br />
              Singh
            </h3>
            <p className={style["investor-member-desc"]}>
              Vishakha Singh, the co-founder and Ex-Vice President of the WazirX
              NFT Marketplace, has also been an active entrepreneur and an
              investor, having co-founded successful SaaS startups and other
              companies like IconicBot and 4Five app. She is also an independent
              movie producer and is famous for her appearances in the
              &apos;Fukrey&apos; series. An avid champion and advocate of women
              participating in the Web3/NFT space, her experience and
              perspective would be of great value to our Growth team.
            </p>
          </div>
        </article>
      </section>
    </section>
  );
};

export default OurInvestor;
