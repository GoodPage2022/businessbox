import type { NextPage } from "next";
import React from "react";
import ProjectInfo from "../../src/components/Catalog/ProjectInfo/ProjectInfo";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

const Project: NextPage = ({project}:any) => {
  if (!project || typeof project?._id != "string") return <></>;

  return (
    <>
      <Head>
          <title>{`Business Box | ${project.title}`}</title>
          <meta property="og:title" content={`Business Box | ${project.title}`} />
          <meta property="og:description" content={project.description.replace(/(<([^>]+)>)/gi, "").substring(0, 250)} />
      </Head>
      <ProjectInfo projectId={project._id} />
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
        return {
            props: {
              project: response.data.entries[0]
            },
        }
      }
    }
  
    return {
      notFound: true
    }
  } catch (error: any) {
    console.log(error.response.status);
    
    return {
      notFound: true
    }
  }
}