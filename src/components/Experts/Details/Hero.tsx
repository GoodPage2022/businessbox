import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import FilterSVG from "../../assets/svg/filter.svg";
import DotsSVG from "../../../assets/svg/dots1.svg";
import LinesSVG from "../../../assets/svg/lines.svg";
import React from "react";
import Image from "next/image";

import { useSession, signOut as signOutGoogle } from "next-auth/react";
import { Oval } from "react-loader-spinner";

const HeroExpert = ({ data }: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const rate = useSelector((state: any) => state.currency.value);
  const [cards, setCards] = useState<any>([]);
  const [countCards, setCountCards] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [filtersObj, setFiltersObj] = useState<any>({});
  const [isRowsActive, setIsRowsActive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="heroExpert">
      <div className="heroExpert__container container">
        <div className="heroExpert__image">
          <Image
            className=""
            src={`https://admin.bissbox.com/storage/uploads${data.avatar.path}`}
            layout="fill"
            objectFit="cover"
            alt="avatar"
          />
        </div>
        <div className="heroExpert__info">
          <div className="heroExpert__city section__primary-text">
            {data.location}
          </div>
          <div className="heroExpert__name">
            {data.firstname} {data.lastname}
          </div>
          <div className="heroExpert__specialization section__primary-text">
            {data.specialization}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroExpert;
