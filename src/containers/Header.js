import { Typography } from "@mui/material";
import React from "react";
import Connected from "../components/Connected";
import CountryFlag from "./CountryDropdown";
import Logo from "../components/Logo";

export default function Header() {
  return (
    <header
      className="py-3 px-1 d-flex align-items-center justify-content-between"
      style={{ height: "100px", borderBottom: "solid 1px blue" }}
    >
      <Logo />
      <Typography
        color="primay"
        variant="h1"
        style={{ fontSize: "30px", fontWeight: "500" }}
      >
        Macroeconomic Time Series Dashboard
      </Typography>
      <div style={{ width: "160px" }}>
        <Connected />
        <CountryFlag />
      </div>
    </header>
  );
}
