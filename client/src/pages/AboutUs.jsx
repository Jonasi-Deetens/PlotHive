import "../assets/styles/pages/About/about.css";
import typewritter from "../assets/img/typewritter.jpg";
import laptop from "../assets/img/laptop.jpg";
import bookAuthors from "../assets/img/book-authors.jpg";

import alex from "../assets/img/portraits/portrait2.jpeg";
import dante from "../assets/img/portraits/portrait1.jpeg";
import jonasi from "../assets/img/portraits/portrait3.jpeg";
import kilian from "../assets/img/portraits/portrait4.jpeg";

import github from "../assets/svgs/github.png";
import linkedin from "../assets/svgs/linkedin.png";

const AboutUs = () => {
  return (
    <main className="aboutUs">
      <section className="about">
        <h1>About Us</h1>
        <p>
          At <a href="/">Plot Hive</a>, we believe that storytelling is a
          collaborative art form that thrives on diversity, creativity, and
          community. Our platform empowers writers from all walks of life to
          come together, share their imagination, and co-create captivating
          stories.
        </p>
      </section>
      <section className="our-mission">
        <article>
          <h1>Our Mission</h1>
          <p>
            Our mission is to democratize storytelling by providing a platform
            where everyone&apos;s voice can be heard. We strive to foster a
            supportive and inclusive environment where writers of all skill
            levels can unleash their creativity.
          </p>
        </article>
        <div className="images">
          <div className="top-images">
            <img className="typewritter" src={typewritter} alt="picture" />
            <img className="laptop" src={laptop} alt="picture" />
          </div>
          <img className="authors" src={bookAuthors} alt="picture" />
        </div>
      </section>
      <section className="meet-our-team">
        <h1>Meet our Team</h1>
        <div className="portraits">
          <div className="portrait">
            <img className="img-alex" src={alex} alt="portrait" />
            <p className="name">Alex</p>
            <div className="social-media-links">
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={linkedin} alt="linkedin logo" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={github} alt="github" />
              </a>
            </div>
          </div>
          <div className="portrait">
            <img className="img-dante" src={dante} alt="portrait" />
            <p className="name">Dante</p>
            <div className="social-media-links">
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={linkedin} alt="linkedin logo" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={github} alt="github" />
              </a>
            </div>
          </div>
          <div className="portrait">
            <img className="img-jonasi" src={jonasi} alt="portrait" />
            <p className="name">Jonasi</p>
            <div className="social-media-links">
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={linkedin} alt="linkedin logo" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={github} alt="github" />
              </a>
            </div>
          </div>
          <div className="portrait">
            <img className="img-kilian" src={kilian} alt="portrait" />
            <p className="name">Kilian</p>
            <div className="social-media-links">
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={linkedin} alt="linkedin logo" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={github} alt="github" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="contactUs">
        <article className="hiring">
          <h1>We&apos;re Hiring!</h1>
          <p>
            Whether you&apos;re a seasoned writer or just starting your
            storytelling journey, we invite you to join our community and become
            part of the adventure. Together, le&apos;s create something truly
            magical!
          </p>
          <a href="/contact">
            <button className="contact-us">Contact Us</button>
          </a>
        </article>
      </section>
    </main>
  );
};

export default AboutUs;
