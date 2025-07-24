import React from 'react';
import { FaGithub, FaDiscord, FaLinux, FaBitcoin } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-page p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>
      <p className="mb-4">
        {/* User's brief introduction */}
        [Brief introduction about yourself, your journey, and your interests]
      </p>

      <section className="career-goals mb-6">
        <h2 className="text-3xl font-semibold mb-3">Career Goals</h2>
        <p>
          {/* User's career goals and aspirations */}
          [Talk about your career goals, aspirations, and what you are looking for in your professional life]
        </p>
      </section>

      <section className="hobbies-interests mb-6">
        <h2 className="text-3xl font-semibold mb-3">Hobbies & Interests</h2>
        <p>
          {/* User's hobbies and interests */}
          [Share your hobbies and interests here]
        </p>
      </section>

      <section className="connect-with-me">
        <h2 className="text-3xl font-semibold mb-3">Let's Connect</h2>
        <p className="mb-4">
          {/* Invitation for connections and discussions */}
          [Invite visitors to connect with you for discussions, collaborations, or just a friendly chat]
        </p>
        <div className="social-links flex justify-center gap-4">
          {/* Social Media Icons and Links */}
          <a href="[GitHub Link]" className="text-2xl">
            <FaGithub title="GitHub" />
          </a>
          <a href="[Discord Link]" className="text-2xl">
            <FaDiscord title="Discord" />
          </a>
          <a href="[LinkedIn/Twitter/Other Profile Link]" className="text-2xl">
            <FaLinux title="LinkedIn/Twitter/Other" />
          </a>
          <a href="[Cryptocurrency/Blockchain Related Link]" className="text-2xl">
            <FaBitcoin title="Cryptocurrency/Blockchain" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
