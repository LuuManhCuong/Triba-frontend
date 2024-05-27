import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import Project from "../components/project/Project";
import { useNavigate } from "react-router-dom";

function Personal() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, [token]);
  return (
    <>
      <Layout>
        <div>
          {/* Personnal */}
          {/* <FromCreateJob></FromCreateJob> */}
          <Project></Project>
        </div>
      </Layout>
    </>
  );
}

export default Personal;
