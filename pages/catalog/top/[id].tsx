import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const Project: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof id == "string") raiseRating(id);
  }, [id]);

  const activateBusiness = async () => {
    try {
      const response = await axios.post(`/api/businesses/activateBusiness`, {
        id,
      });

      // console.log(response.data, "response");
    } catch (error) {
      console.log(error, "errer");
    }
  };

  const raiseRating = async (id: string) => {
    try {
      const reqData = {
        id,
      };

      const order = await axios.get(`/api/businesses/getTopOrder`, {
        params: {
          order_id: id,
        },
      });

      if (order.status == 200) {
        if (order.data.status != "Paid") {
          setIsError(true);
        } else {
          activateBusiness();
        }
      }
    } catch (err: any) {
      setIsError(true);
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <section className="reset">
        <div className="container">
          {isLoading ? (
            <Oval
              height={150}
              width={150}
              color="#f22a4e"
              wrapperStyle={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "50vh",
                zIndex: "99999",
              }}
              wrapperClass="oval-loading"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#e95973"
              strokeWidth={3}
              strokeWidthSecondary={3}
            />
          ) : (
            <div className="reset__empty">
              {isError ? (
                <h1 className="title">
                  Упс, щось пішло не так. Повторіть спробу пізніше або напишіть
                  нам на пошту
                </h1>
              ) : (
                <h1 className="title">
                  Дякуємо, оплата пройшла успішно! Тепер ваш бізнес(и) будуть
                  відображатись більшій кількості потенційних покупців
                </h1>
              )}
            </div>
          )}{" "}
        </div>
      </section>
    </>
  );
};

export default Project;
