import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Project: NextPage = () => {
  const router = useRouter();
  const { resetKey } = router.query;
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (typeof resetKey == "string") resetUser(resetKey);
  }, [resetKey]);

  const resetUser = async (resetKey: string) => {
    try {
      const reqData = {
        resetKey,
      };

      const response = await axios.post(`/api/reset/userPassword`, reqData);
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
                Оновлення успішне. Пароль надіслано на пошту
              </h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Project;
