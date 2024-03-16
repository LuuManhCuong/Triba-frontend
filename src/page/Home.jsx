import React from "react";

import Layout from "../layout/Layout";
import Post from "../components/post/Post";
import Category from "../components/categories/Category";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function Home() {
  return (
    <Layout>
      <Category></Category>
      <Post></Post>
    </Layout>
  );
}

export default Home;
