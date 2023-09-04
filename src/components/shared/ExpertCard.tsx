import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosRequestConfig } from "axios";
import { signIn as signInReducer } from "../../../store/actions/auth";

import { MainContext } from "../../contexts/mainContext";
import ModalActive from "../Modals/Modal-active/Modal-active";

const ExpertCard = ({
  image,
  firstname,
  lastname,
  specialization,
  id,
}: {
  image: any;
  firstname: string;
  lastname: string;
  specialization: string[];
  id: string;
}) => {
  const [state, dispatch] = React.useContext(MainContext);
  const dispatchRedux = useDispatch();
  const router = useRouter();
  const [isMyBusinessesPage, setIsMyBusinessesPage] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [clickTime, setClickTime] = useState<number>(0);
  const [clickPos, setClickPos] = useState<any>({});
  // const [rate, setRate] = useState<number>(0);
  const rate = useSelector((state: any) => state.currency.value);
  const [topBusinesses, setTopBusinesses] = useState<any>([]);
  const [isTopBusinesses, setIsTopBusinesses] = useState<boolean>(false);
  // const [isInvestmentBusiness, setIsInvestmentBusiness] =
  //   useState<boolean>(false);

  return (
    <li className={`expert-card`}>
      <Link href={`/experts/${id}`}>
        <a className={`business-card__link`} title={firstname + lastname}></a>
      </Link>
      <div className="expert-card__scales">
        <div className="expert-card__scale"></div>
        <div className="expert-card__scale"></div>
        <div className="expert-card__scale"></div>
        <div className="expert-card__scale"></div>
      </div>
      <div className="expert-card__top-wrapper">
        <div className="expert-card__image">
          {image && (
            <Image
              className=""
              src={image}
              layout="fill"
              objectFit="cover"
              alt="card-image"
            />
          )}
        </div>
        <p className="expert-card__name">
          {firstname} {lastname}
        </p>
      </div>
      <div className="expert-card__specialization">
        {specialization?.map((item, idx) => (
          <span className="expert-card__specialization-item" key={idx}>
            {item}
            {specialization.length == idx + 1 ? "" : ", "}
          </span>
        ))}
      </div>
    </li>
  );
};

export default ExpertCard;
