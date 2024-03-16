import React from "react";
import Header from "../components/header/Header";
import { Container } from "@mui/material";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <Container>
        <Row>
          <Col xs={3}>
            <Sidebar></Sidebar>
          </Col>
          <Col>{children}</Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default Layout;
