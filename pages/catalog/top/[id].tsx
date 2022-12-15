import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Project: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (typeof id == "string") raiseRating(id);
  }, [id]);

  const raiseRating = async (id: string) => {
    try {
      const reqData = {
        id,
      };

      const response = await axios.post(`/api/businesses/raiseRating`, reqData);
      console.log(response.data);
    } catch (err: any) {
      setIsError(true);
      console.log(err);
    }
  };

  return (
    <>
      <section className="reset">
        <div className="container">
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
        </div>
      </section>
    </>
  );
};

export default Project;
