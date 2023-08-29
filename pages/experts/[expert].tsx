import type { NextPage } from "next";
import React from "react";
import ProjectInfo from "../../src/components/Catalog/ProjectInfo/ProjectInfo";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import HeroExpert from "../../src/components/Experts/Details/Hero";
import Expertise from "../../src/components/Experts/Details/Expertise";
import Video from "../../src/components/Experts/Details/Video";
import ExpertsSlider from "../../src/components/Experts/Details/ExpertsSlider";

const Project: NextPage = ({ expert }: any) => {
  if (!expert || typeof expert?._id != "string") return <></>;
  console.log(expert, "expert");

  return (
    <>
      {/* <Head>
        <title>{`Business Box | ${project.title}`}</title>
        <meta property="og:title" content={`Business Box | ${project.title}`} />
        <meta
          property="og:description"
          content={project.description
            .replace(/(<([^>]+)>)/gi, "")
            .substring(0, 250)}
        />
      </Head> */}
      <HeroExpert data={expert} />
      <Expertise data={expert} />
      <Video video={expert.video} />
      <ExpertsSlider images={expert.images} />
    </>
  );
};

export default Project;

export async function getServerSideProps(context: any) {
  const { expert } = context.params;

  try {
    const response = await axios.post(
      `${process.env.baseUrl}/api/experts/get`,
      { expertId: expert }
    );

    if (response.data) {
      if (response.data.entries.length > 0) {
        return {
          props: {
            expert: response.data.entries[0],
          },
        };
      }
    }

    return {
      notFound: true,
    };
  } catch (error: any) {
    console.log(error.response.status);

    return {
      notFound: true,
    };
  }
}
