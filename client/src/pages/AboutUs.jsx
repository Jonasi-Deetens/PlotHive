
import "../assets/styles/pages/About/about.css";
import typewritter from "../assets/img/typewritter.jpg";
import laptop from "../assets/img/laptop.jpg";
import bookAuthors from "../assets/img/book-authors.jpg";

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
            levels can unleash their creativity and
          </p>
        </article>
        <div className="images">
          <img className="typewritter" src={typewritter} alt="picture" />
          <img className="laptop" src={laptop} alt="picture" />
          <img className="authors" src={bookAuthors} alt="picture" />
        </div>
      </section>
      <section className="meet-our-team">
        <h1>Meet our Team</h1>
        <div className="portraits">
          <div className="portrait">
            <img src="" alt="portrait" />
            <p className="name">Alex</p>
            <div className="social-media-links">
              <img src="" alt="linkedin" />
              <img src="" alt="github" />
            </div>
          </div>
        </div>
      </section>
      <section className="contactUs">
        <button>
          <a href="/contact">Contact Us</a>
        </button>
        <article className="hiring">
          <h1>We&apos;re Hiring!</h1>
          <p>
            Whether you&apos;re a seasoned writer or just starting your
            storytelling journey, we invite you to join our community and become
            part of the adventure. Together, le&apos;s create something truly
            magical!
          </p>
        </article>
      </section>
    </main>
  );
};

export default AboutUs;
