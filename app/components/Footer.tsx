import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center mt-12 py-4">
      <p className="text-lg text-black dark:text-white">
        Created by{" "}
        <a
          href="https://raghavbud1597.github.io/web-portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Raghav Budhiraja
        </a>
      </p>
    </footer>
  );
};

export default Footer;
