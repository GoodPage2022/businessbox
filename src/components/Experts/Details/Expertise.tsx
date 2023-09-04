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

const Expertise = ({ data }: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const rate = useSelector((state: any) => state.currency.value);
  const [cards, setCards] = useState<any>([]);
  const [countCards, setCountCards] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [filtersObj, setFiltersObj] = useState<any>({});
  const [isRowsActive, setIsRowsActive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(data, "datadata");

  return (
    <div className="expertise">
      <div className="expertise__container container">
        {data && data.expertise ? (
          <div className="expertise__description">
            {" "}
            <h3 className="expertise__title">Експертиза</h3>{" "}
            <div dangerouslySetInnerHTML={{ __html: data.expertise }} />
          </div>
        ) : null}
        {data && data.examinationForm ? (
          <div className="expertise__form">
            <h3 className="expertise__title">Формати надання експертизи</h3>{" "}
            <ul className="expertise__list">
              {data &&
                data.examinationForm?.map((item: any, idx: number) => (
                  <li className="expertise__list-item" key={idx}>
                    {item.value}
                  </li>
                ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Expertise;
