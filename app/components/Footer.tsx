/**
 * Footer.tsx
 *
 * This component renders a footer element displaying the creator's name, "Raghav Budhiraja,"
 * as a clickable link. The link directs users to Raghav's web portfolio and opens in a new tab.
 *
 * Features:
 * - Text styled in a large, gray font with spacing above.
 * - Creator's name appears as a gradient text link.
 * - External link opens in a new tab with appropriate security measures (`noopener noreferrer`).
 *
 * The component is styled using Tailwind CSS classes for text color, font size, and spacing.
 */

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-lg text-gray-500 mt-12">
        Created by{" "}
        <a
          href="https://raghavbud1597.github.io/web-portfolio/"
          className="text-gradient"
          target="_blank"
          rel="noopener noreferrer"
        >
          Raghav Budhiraja
        </a>
    </footer>
  );
};

export default Footer;
