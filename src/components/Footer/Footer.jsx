
import "./Footer.css";


export default function Footer() {
  return (
    <footer className="footer__container">
      <p className="footer__text">©2025 PowerSpot -  Arthur Oliveira. All rights reserved.</p>
      <div className="footer__links-container">
        <a href="#" className="footer__link">
          <img src= "../../public/linkedin.svg" alt="LinkedIn" className="footer__icon" />
          Linkedin
        </a>
        <a href="#" className="footer__link">
          <img src= "../../public/github.svg" alt="Github" className="footer__icon" />
          Github
        </a>
      </div>
    </footer>
  );
}