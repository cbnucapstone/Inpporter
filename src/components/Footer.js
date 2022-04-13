import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedIncon from "@material-ui/icons/LinkedIn";
import '../styles/Footer.css';

function Footer(){
    return (
    <div className="footer">
        <div className="socialMedia">
        <InstagramIcon/><TwitterIcon/><FacebookIcon/><LinkedIncon/>
        </div>
        <p>&copy; 2022 Inpporter.com</p>
    </div>
    );
}

export default Footer;