"use client";

import React, { useState } from "react";
import { Button } from "./ui/Button";

const TABS = [
  {
    key: "companies",
    label: "Companies",
    content: [
      "Create legal contracts for employees and freelancers remotely",
      "Electronic signature",
      "Multiple payment methods for contracts",
      "Payroll system for employees",
      "Multiple withdrawal channels for employees to receive their salaries",
    ],
    image: "/images/Company.png",
    cta: "Start Hiring Now",
  },
  {
    key: "employees",
    label: "Employees",
    content: [
      "0% commission on your contracts",
      "Create your contract remotely with companies",
      "Receive one-time and monthly payments",
      "Various payment solutions for the company you contract with",
      "Multiple withdrawal channels in USD and local currencies",
    ],
    image: "/images/Employee.png",
    cta: "Join as Employee",
  },
  {
    key: "freelancers",
    label: "Freelancers",
    content: [
      "0% commission on sales and contracts",
      "Integrated digital identity",
      "Create your own platform",
      "Create contracts and sell digital services and products",
      "Receive payments from clients",
      "Multiple withdrawal channels in USD and local currencies",
    ],
    image: "/images/Freelancer.png",
    cta: "Join as Freelancer",
  },
];

const BusinessSolutionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("companies");
  const tab = TABS.find((t) => t.key === activeTab) || TABS[0];

  return (
    <section className="bg-light-gray py-12 rounded-tr-4xl rounded-tl-4xl">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-dark-gray">
          Contract, Manage, Pay
        </h2>
        <p className="text-lg text-center text-text-secondary mb-8">
          We provide tailored solutions for companies, employees, and
          freelancers to manage their transactions remotely from anywhere in the
          world.
        </p>
        <div className="flex justify-center mb-8">
          <div
            className="flex rounded-full border border-border-medium overflow-hidden"
            style={{ direction: "ltr" }}
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-8 py-2 text-base font-medium focus:outline-none transition-colors duration-150 ${
                  activeTab === t.key
                    ? "bg-primary-blue text-white rounded-full"
                    : "bg-white text-dark-gray hover:bg-light-gray rounded-none"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-1 w-full">
            <ul className="space-y-4 text-left">
              {tab.content.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-text-secondary text-base"
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-lg">
                    ✓
                  </span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center md:justify-start">
              <Button variant="primary" size="lg">
                {tab.cta}
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <img
              src={tab.image}
              alt={tab.label}
              className="rounded-xl object-cover w-full max-w-md h-64"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutionsSection;
