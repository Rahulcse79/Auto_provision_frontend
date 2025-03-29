import React from "react";
import Navbar from "../../Sidebar";
import Header from '../../cards/header';

export default function Iot_gateway() {

  return (
    <>
      <Navbar />
      <Header 
      Title='IOT Gateway'
      breadcrumb ='/Servers/IOT_Gateway'/>
      <h1>IOT Gateway</h1>
    </>
  );
}
