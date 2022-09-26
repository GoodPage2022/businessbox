import type { NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Project: NextPage = () => {
  const router = useRouter();
  const { resetKey } = router.query;

  useEffect(()=>{
    if (typeof resetKey == "string")
        resetUser(resetKey)
  },[resetKey])

  const resetUser = async (resetKey: string) => {
    try {
        const reqData = {
            resetKey
        }

        const response = await axios.post(`/api/reset/userPassword`, reqData)
        console.log(response.data)
      } catch (err: any) {
        console.log(err);
      }
  }

  return (
    <>
        <section className="projectInfo">
            <div className="container projectInfo__container">
                Wait
            </div>
        </section>
    </>
  );
};

export default Project;
