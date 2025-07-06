import React from "react";
import Title from "./Title";
import Button from "./Button";
import Container from "./Container";
import BusinessSolutionsSection from "./BusinessSolutionsSection";

const Banner: React.FC = () => {
  return (
    <>
      <section className="w-full py-16 md:py-24">
        <Container>
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
            {/* Left: Text */}
            <div className="flex-1 text-center md:text-left">
              <Title size="xl" className="mb-4">
                To and From Anywhere in the World
              </Title>
              <h2 className="text-2xl md:text-3xl font-semibold text-dark-gray mb-4">
                Talent Bridge, the integrated management platform designated for
                contracting and remote employment.
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto md:mx-0">
                Whether you have remote employees or you are contracting with
                freelancers, Talent Bridge provides you with all management and
                financial tools you need to manage your contracts, and pay
                salaries and dues remotely in more than 150 countries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button to="/signup-company" variant="outline">
                  Open a free account for companies
                </Button>
                <Button to="/signup-individual" variant="primary">
                  Open a free account for individuals
                </Button>
              </div>
            </div>
            {/* Right: Banner Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <img
                src="/images/banner.png"
                alt="Banner dashboard preview"
                className="w-full max-w-xl md:max-w-2xl rounded-xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>
      <BusinessSolutionsSection />
    </>
  );
};

export default Banner;
