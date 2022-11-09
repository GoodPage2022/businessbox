import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ActivateUser: NextPage = () => {
  const router = useRouter();
  const { key } = router.query;
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (typeof key == "string") activateUser(key);
  }, [key]);

  const activateUser = async (key: string) => {
    try {
      const reqData = {
        key,
      };

      const response = await axios.post(`/api/account/activate`, reqData);
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
              <h1 className="title">Вітаємо! Реєстрація пройшла успішно</h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivateUser;
