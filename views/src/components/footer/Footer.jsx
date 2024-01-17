import React from "react";
import "./footer.css";
import image from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="left-column">
        <img
          src={image}
          alt="Logo"
          className="logo-f"
        />
        <p style={{textAlign:'center',width:'90%'}}>
          The first-ever platform for former ALC students to connect over
          networking events and concerts.
        </p>
      </div>
      <div className="right-column">
        <p>
          Address: ALC Campus, Powdermill Road,
        
        </p>
        <p>Phone: +230 5443 4951</p>
      </div>
    </footer>
  );
};

export default Footer;
