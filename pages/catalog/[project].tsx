import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ProjectInfo from "../../src/components/Catalog/ProjectInfo/ProjectInfo";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import { useSelector } from "react-redux";

const Project: NextPage = () => {
  const router = useRouter();
  const { project } = router.query;
  const [projectInfo, setProjectInfo] = useState<any>(null);
  const user = useSelector((state: any) => state.auth.user);

  const getBusinessInfo = async () => {
    let response;

    try {
      response = await axios.post(`/api/businesses/get`, { user, projectId: project });

      if (response.data) {
        if (response.data.entries.length > 0) {    
          // console.log(response.data.entries[0].description.replace(/(<([^>]+)>)/gi, "").substring(0, 255), "sdfsdf");
                
          setProjectInfo(response.data.entries[0]);
        }
      }
    } catch (error) {
      return false;
    }
  }

  useEffect(()=>{
    if (!projectInfo && project)
      getBusinessInfo()
  },[project])

  if (typeof project != "string") return <></>;

  return (
    <>
      <Head>
        <title>Business Box | {projectInfo?.title}</title>
        <meta property="og:description" content={projectInfo?.description.replace(/(<([^>]+)>)/gi, "").substring(0, 255)} />
      </Head>
      <ProjectInfo projectId={project} />
    </>
  );
};

export default Project;
