import Image from "next/image";

import HeartSVG from "../../../assets/svg/heart.svg";
import ArrowSVG from "../../../assets/svg/arrow-project.svg";
import ContactInfo from "./ContactInfo";

const Account = () => {
  return (
    <section className="account">
      <div className="container account__container">
        <ContactInfo />
      </div>
    </section>
  );
};

export default Account;
