import React from "react";
// import Header from "../components/header/Header";
import { Container } from "@mui/material";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Sidebar from "../components/sidebar/Sidebar";
// import Footer from "../components/footer/Footer";
import Header from "../components/wraper/Header";
import Footer from "../components/wraper/Footer";

function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <Container
        className="shadow-lg"
        style={{
          margin: "auto",
          marginTop: "90px",
          width: "85vw",
          padding: "4px 40px 40px",
        }}
      >
        <Row>
          {/* <Col xs={3}>
            <Sidebar></Sidebar>
          </Col> */}
          <Col>{children}</Col>
        </Row>
      </Container>
      {/* <Footer></Footer> */}
    </>
  );
}

export default Layout;
