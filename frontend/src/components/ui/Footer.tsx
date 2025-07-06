import React from "react";
import Container from "../Container";

const socialIcons = [
  {
    name: "LinkedIn",
    href: "#",
    svg: (
      <svg width="20" height="20" fill="currentColor" className="text-blue-700">
        <circle cx="10" cy="10" r="10" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    svg: (
      <svg width="20" height="20" fill="currentColor" className="text-black">
        <circle cx="10" cy="10" r="10" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    svg: (
      <svg width="20" height="20" fill="currentColor" className="text-pink-500">
        <circle cx="10" cy="10" r="10" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    svg: (
      <svg width="20" height="20" fill="currentColor" className="text-blue-500">
        <circle cx="10" cy="10" r="10" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    svg: (
      <svg width="20" height="20" fill="currentColor" className="text-red-600">
        <circle cx="10" cy="10" r="10" />
      </svg>
    ),
  },
];

const paymentIcons = [
  <svg key="visa" width="24" height="16" className="inline mx-1">
    <rect width="24" height="16" rx="2" fill="#1A1F71" />
  </svg>,
  <svg key="mc" width="24" height="16" className="inline mx-1">
    <rect width="24" height="16" rx="2" fill="#EB001B" />
  </svg>,
  <svg key="paypal" width="24" height="16" className="inline mx-1">
    <rect width="24" height="16" rx="2" fill="#003087" />
  </svg>,
  <svg key="apple" width="24" height="16" className="inline mx-1">
    <rect width="24" height="16" rx="2" fill="#000" />
  </svg>,
];

const Footer: React.FC = () => (
  <footer className="bg-[#f7fafd] border-t border-gray-200 mt-12 pt-12 pb-4 text-sm text-dark-gray">
    <Container>
      {/* Top Cards Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {/* Talent Bridge for Companies Card */}
        <div className="flex-1 bg-[#393f59] rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-2xl font-bold mb-4 text-white">
              TALENT BRIDGE FOR COMPANIES
            </h2>
            <p className="mb-6 text-base font-medium text-white">
              Empower your business with Talent Bridge. Seamlessly manage remote
              teams, create contracts, and handle payments for employees and
              freelancers worldwide—all in one secure platform.
            </p>
          </div>
          <button className="bg-[#00baff] text-white font-semibold px-5 py-2 rounded focus:outline-none hover:bg-[#009fd1] transition w-fit">
            Subscribe now
          </button>
        </div>
        {/* Talent Bridge for Individuals Card */}
        <div className="flex-1 bg-[#d6efff] rounded-2xl p-8 text-[#393f59] flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-2xl font-bold mb-4">
              TALENT BRIDGE FOR INDIVIDUALS
            </h2>
            <p className="mb-6 text-base font-medium">
              Build your professional presence with Talent Bridge. Offer your
              services, manage contracts, and receive payments from clients
              globally through multiple withdrawal options—all with zero
              commission fees.
            </p>
            <p className="mb-6 text-base font-medium">
              Keep 100% of your earnings and grow your freelance career with
              ease!
            </p>
          </div>
          <button className="bg-[#00baff] text-white font-semibold px-5 py-2 rounded focus:outline-none hover:bg-[#009fd1] transition w-fit">
            Subscribe now
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 justify-between">
        {/* About platform */}
        <div className="mb-6 md:mb-0">
          <h4 className="font-semibold mb-2 text-primary-blue">
            About platform
          </h4>
          <ul className="space-y-1">
            <li>Who We Are?</li>
            <li>Terms And Conditions</li>
            <li>Privacy Policy</li>
            <li>Pricing</li>
            <li>Contact Us</li>
          </ul>
        </div>
        {/* Rights/Content/Program */}
        <div className="mb-6 md:mb-0">
          <h4 className="font-semibold mb-2 text-primary-blue"> </h4>
          <ul className="space-y-1">
            <li>Guarantee Your Rights</li>
            <li>Publishing & Content</li>
            <li>Affiliate Program</li>
            <li>Fees And Payments</li>
          </ul>
        </div>
        {/* Help */}
        <div className="mb-6 md:mb-0">
          <h4 className="font-semibold mb-2 text-primary-blue">Help</h4>
          <ul className="space-y-1">
            <li>Blog</li>
            <li>Knowledge Base</li>
            <li>FAQ</li>
          </ul>
        </div>
        {/* Social */}
        <div className="mb-6 md:mb-0">
          <h4 className="font-semibold mb-2 text-primary-blue">Follow Us</h4>
          <div className="flex gap-3">
            {socialIcons.map((icon) => (
              <a
                key={icon.name}
                href={icon.href}
                aria-label={icon.name}
                className="hover:opacity-80"
              >
                {icon.svg}
              </a>
            ))}
          </div>
        </div>
        {/* Company Info */}
        <div className="text-xs text-right md:text-left">
          <div className="font-bold text-primary-blue">Talent Bridge Ltd</div>
          <div>Dubai Silicon Oasis</div>
          <div>B.O.Box: 444281</div>
          <div>Dubai, United Arab Emirates</div>
          <div>info@talentbridge.com</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-gray-200 pt-4">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          {paymentIcons}
        </div>
        <div className="text-xs text-gray-500">© Talent Bridge Ltd 2025</div>
      </div>
    </Container>
  </footer>
);

export default Footer;
