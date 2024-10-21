import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function SocialMediaIcons() {
  return (
    <div className="social-icons">
      <ul>
      <li><a href="https://www.facebook.com"><FaFacebookF /></a></li>
        <li><a href="https://twitter.com"><FaTwitter /></a></li>
        <li><a href="https://www.instagram.com"><FaInstagram /></a></li>
        <li><a href="https://www.linkedin.com"><FaLinkedinIn /></a></li>
      </ul>
    </div>
  );
}

export default SocialMediaIcons;
