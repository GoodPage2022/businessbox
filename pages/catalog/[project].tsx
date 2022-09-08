import type { NextPage } from "next";
import React from "react";
import ProjectInfo from "../../src/components/Project/ProjectInfo/ProjectInfo";
import { useRouter } from 'next/router'

const Project: NextPage = () => {
  const router = useRouter()
  const { project } = router.query
  
  if (typeof project != "string") return (
    <></>
  )

  return (
    <>
      <ProjectInfo projectId={project} />
    </>
  );
};

export default Project;
