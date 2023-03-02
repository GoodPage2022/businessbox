import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ProjectInfo from "../../src/components/Catalog/ProjectInfo/ProjectInfo";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import { useSelector } from "react-redux";
import { Helmet } from 'react-helmet'

const Project: NextPage = ({projectInfo}:any) => {
  const router = useRouter();
  const { project } = router.query;

  if (typeof project != "string") return <></>;

  return (
    <>
      <Helmet>
        <title>Business Box | {projectInfo?.title}</title>
        <meta property="og:title" content={`Business Box | ${projectInfo?.title}`} />
        <meta property="og:description" content={projectInfo?.description.replace(/(<([^>]+)>)/gi, "").substring(0, 255)} />
      </Helmet>
      <ProjectInfo projectId={project} />
    </>
  );
};

export default Project;

export async function getServerSideProps(context: any) {
  const { project } = context.params

  try {
    const response = await axios.post(`${process.env.baseUrl}/api/businesses/get`, { user: null, projectId: project });

    if (response.data) {
      if (response.data.entries.length > 0) {    
        console.log(response.data.entries);
        
        return {
          props: {
            projectInfo: response.data.entries[0]
          }
        }         
      }
    }
  } catch (error: any) {
    return {
      props: {}
    }
  }
}