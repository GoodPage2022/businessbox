import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import BusinessCard from "../../shared/BusinessCard";
import Sidebar from "./Sidebar";
import Pagination from "../../shared/Pagination/Pagination";
import { useRouter } from "next/router";

const CatalogView = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([])
  const [countCards, setCountCards] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [filtersObj, setFiltersObj] = useState<any>({})
  const router = useRouter();
  const { filters } = router.query;
  const cardsPerPage = 6

  // const getBusinessesCount = async () => {
  //   const response = await axios.post(`/api/businesses/getList`);

  //   if (response.data) {
  //     setCountCards(response.data.entries.length);
  //     return response.data.entries.length;
  //   }
  // }

  const buildFiltersObj = () => {
    let filtersObjB: any = {}

    if (filters && Array.isArray(filters)) {
      filters.map((f: string, i: number)=>{
        if (i % 2 == 1) {
          filtersObjB[filters[i - 1]] = (filters[i - 1] == "category") ? f.split(",") : f
        }
      })
    }

    setFiltersObj(filtersObjB)
  }

  const getBusinesses = async (resetLimit?: boolean) => {
    let filterSetOfExp:any = []

    Object.keys(filtersObj).map((f: any) => {
      switch (f) {
        case "page":
          break
        case "priceFrom":
          if (parseFloat(filtersObj[f]) > 0)
            filterSetOfExp.push({
              "$expr": {
                  "$gte": [
                      {
                          "$toDouble": "$price"
                      },
                      parseFloat(filtersObj[f])
                  ]
              }
            })
          break
        case "priceTo":
          if (parseFloat(filtersObj[f]) > 0)
            filterSetOfExp.push({
              "$expr": {
                  "$lte": [
                      {
                          "$toDouble": "$price"
                      },
                      parseFloat(filtersObj[f])
                  ]
              }
            })
          break
        case "category":
          if (filtersObj[f].length > 0) {
              let param:any = {}
              param["area"] = {
                "$in": filtersObj[f]
              }
              filterSetOfExp.push(param)
          }
          break
        default: 
          let param:any = {}
          param[f] = filtersObj[f]
          filterSetOfExp.push(param)
          break
      }
    })

    let requestBody: any = {
      user,
      sort: {
        _created: -1
      },
    }

    if (!resetLimit) {
      requestBody["skip"] = (filtersObj.page && filtersObj.page > 1) ? (cardsPerPage * (parseInt(filtersObj.page) - 1)) : 0
      requestBody["limit"] = cardsPerPage
    }

    if (filterSetOfExp.length) {
      requestBody['filter'] = {
        "$and": filterSetOfExp
      }
    }

    const response = await axios.post(`/api/businesses/getList`, requestBody);

    if (response.data) {
      if (resetLimit) {
        setCountCards(response.data.entries.length)
        return response.data.entries.length
      } else {
        setCards(response.data.entries);
        return response.data.entries;
      }
    }

    setCards([]);
    return [];
  };

  useEffect(() => {
    buildFiltersObj()
  }, [filters]);
  
  useEffect(() => {
    getBusinesses(true);
  }, [cards]);

  useEffect(() => {
    getBusinesses();
    // getBusinessesCount();
    setPageNumber(filtersObj.page ?? 1)
  }, [filtersObj]);

  const changeFilter = (e: any) => {
    const filtersObjFirstPage = {
      ...filtersObj,
      page: undefined,
      [e.target.name]: e.target.value
    }

    console.log(filtersObjFirstPage);
    
    setFiltersObj(filtersObjFirstPage)

    let filtersObjFirstPageString = ""
    Object.keys(filtersObjFirstPage).map((f: any) => {
      if (filtersObjFirstPage[f] != undefined && filtersObjFirstPage[f] != '')
        filtersObjFirstPageString += '/' + f + '/' + filtersObjFirstPage[f]
    })

    router.replace(`/catalog${filtersObjFirstPageString}`)
  }

  return (
    <section className="catalogView">
      <div className="container catalogView__container">
            <h2 className="title catalogView__title">Назва категорії</h2>
            <div className="catalogView__wrapper">
              <Sidebar changeFilter={changeFilter} filtersObj={filtersObj} />
              {cards.length > 0 ? (
              <ul className="catalogView__cards">
                {cards.map(
                  ({
                    _id,
                    title,
                    description,
                    images,
                    view_count,
                    price,
                    is_verified,
                  }: any) => (
                    <BusinessCard
                      key={_id}
                      alias={_id}
                      title={title}
                      description={description}
                      image={
                        images == null || !images.length
                          ? ""
                          : `${images[0].meta.assets == "" ? `` : `http://157.230.99.45:8082`}${images[0].path}`
                      }
                      price={price}
                      views={view_count ?? 0}
                      isVerified={is_verified}
                    />
                    ),
                )}
              </ul>
              ) : (
                <div className="catalogView__empty">
                  <h1 className="title">На жаль, бізнесів поки що немає</h1>
                </div>
              )}
            </div>
                {Math.ceil(countCards / cardsPerPage)}
            {Math.ceil(countCards / cardsPerPage) > 1 && 
              <Pagination cardsPerPage={cardsPerPage} pageNumber={pageNumber} countCards={countCards} />
            }
      </div>
    </section>
  );
};

export default CatalogView;