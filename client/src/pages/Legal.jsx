import React, { useState } from "react";
import "../assets/styles/pages/Legal/legal.css";

const Legal = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="legal-page">
      <h1>Legal Information</h1>

      <h2>Terms of Service</h2>
      <p>
        These Terms of Service ('Terms') govern your access to and use of our
        website ('the Site' or 'our Site') operated by [Your Company] ('us',
        'we', or 'our'). By accessing or using the Site, you agree to be bound
        by these Terms. If you disagree with any part of the Terms, then you may
        not access the Site.
      </p>
      <p>
        We reserve the right to update or modify these Terms at any time without
        prior notice. Your continued use of the Site after any changes
        constitutes your acceptance of the new Terms.
      </p>

      <h2>Privacy Policy</h2>
      <p>
        PlotHive ('us', 'we', or 'our') operates the website www.plothive.com
        ('the Site' or 'our Site'). This page informs you of our policies
        regarding the collection, use, and disclosure of personal data when you
        use our Site and the choices you have associated with that data.
      </p>
      <p>
        We use your data to provide and improve the Site. By using the Site, you
        agree to the collection and use of information in accordance with this
        policy.
      </p>

      <div className={`additional-info ${expanded ? "expanded" : ""}`}>
        <h2>Collection of Personal Information:</h2>
        <p>
          We may collect personal information such as name, email address,
          postal address, phone number, and other information voluntarily
          provided by users through contact forms, registration forms, surveys,
          or other interactions with our website. We may also collect certain
          information automatically, such as IP address, browser type, operating
          system, and referring website URLs.
        </p>

        <h2>Use of Personal Information:</h2>
        <p>
          Personal information collected from users may be used for purposes
          including but not limited to:
          <ul>
            <li>Providing and personalizing our services</li>
            <li>
              Communicating with users, including responding to inquiries and
              providing support
            </li>
            <li>
              Sending promotional and marketing materials, updates, and
              newsletters (with user consent)
            </li>
            <li>Analyzing and improving our website and services</li>
            <li>
              Complying with legal requirements and protecting our rights and
              interests
            </li>
          </ul>
        </p>

        <h2>Protection of Personal Information:</h2>
        <p>
          We take appropriate measures to protect personal information from
          unauthorized access, alteration, disclosure, or destruction. These
          measures may include encryption, access controls, secure storage, and
          regular security assessments.
        </p>

        <h2>Sharing of Personal Information:</h2>
        <p>
          We may share personal information with third-party service providers
          who assist us in operating our website, conducting our business, or
          providing services to users. These third parties are required to
          maintain the confidentiality of personal information and are
          prohibited from using it for any other purpose.
        </p>

        <h2>Cookies and Analytics:</h2>
        <p>
          Our website may use cookies, which are small files stored on a user's
          computer to enhance the browsing experience and analyze website usage.
          We may also use web analytics services to collect and analyze data
          about website traffic and user interactions. This information is used
          to improve the website and tailor our services to user preferences.
        </p>

        <h2>Third-Party Services:</h2>
        <p>
          Our website may integrate with third-party services such as social
          media platforms, payment processors, and advertising networks. These
          third parties may collect information about users' interactions with
          their services in accordance with their respective privacy policies.
          Users are encouraged to review the privacy policies of these third
          parties.
        </p>

        <h2>User Rights:</h2>
        <p>
          Users have certain rights regarding their personal information,
          including the right to access, correct, delete, or restrict the
          processing of their data. Users may also have the right to opt-out of
          certain data processing activities, such as marketing communications.
          Requests to exercise these rights should be directed to our designated
          contact person or email address.
        </p>
      </div>

      <button className="toggle-btn" onClick={toggleExpand}>
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
};

export default Legal;
