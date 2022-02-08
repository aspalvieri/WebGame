import React from "react";
import { config } from "../../utils/configs";

function Footer() {
  return (
    <footer className="center">
      &copy; 2022 - Alex Spalvieri&nbsp;&nbsp;&nbsp;
      <small>(version: {config.VERSION})</small>
    </footer>
  );
}
export default Footer;