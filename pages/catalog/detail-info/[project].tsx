import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";

import DetailInfo from "../../../src/components/Catalog/ProjectInfo/DetailInfo";

const Project: NextPage = () => {
  const router = useRouter();
  const { project } = router.query;

  if (typeof project != "string") return <></>;

  return (
    <>
      <DetailInfo projectId={project} />
    </>
  );
};

export default Project;
