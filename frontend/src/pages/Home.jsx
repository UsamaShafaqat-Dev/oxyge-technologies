import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Modern, responsive and high-performance websites.",
      icon: "🌐",
    },
    {
      id: 2,
      title: "Digital Marketing",
      description: "Boost your online presence and grow your brand.",
      icon: "📈",
    },
    {
      id: 3,
      title: "AI Solutions",
      description: "Automate your business with intelligent AI tools.",
      icon: "🤖",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Ahmed Raza",
      company: "TechStart",
      text: "Oxege Technologies ne meri business website bana kar meri sales double kar di!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sara Khan",
      company: "Digital Hub",
      text: "Professional team aur fast delivery. Highly recommended!",
      rating: 5,
    },
  ];

  const goToContact = () => navigate("/contact");
  const goToPortfolio = () => navigate("/portfolio");

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Oxege Technologies
          </h1>
          <p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: "var(--foreground-light)" }}
          >
            Leading Software House in Pakistan providing digital solutions
            including Web Development, AI Services, and Digital Marketing.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={goToContact}
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: "var(--accent)", color: "white" }}
            >
              Get Started
            </button>
            <button
              onClick={goToPortfolio}
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                border: "2px solid var(--accent)",
                color: "var(--accent)",
                backgroundColor: "transparent",
              }}
            >
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* About Summary */}
      <section className="py-16" style={{ backgroundColor: "var(--bg-card)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              About Oxege Technologies
            </h2>
            <p
              className="mb-6 leading-relaxed"
              style={{ color: "var(--foreground-light)" }}
            >
              Oxege Technologies is a professional software house offering
              innovative IT solutions. We help businesses grow through modern
              technologies, smart strategies, and result-driven services.
            </p>
            <button
              onClick={goToContact}
              className="px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ color: "var(--accent)" }}
            >
              Read More →
            </button>
          </div>
        </div>
      </section>

      {/* Services Section - Smooth Animation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--foreground)" }}
          >
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const [isHovered, setIsHovered] = useState(false);
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="p-6 rounded-xl text-center cursor-pointer"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    transform: isHovered
                      ? "translateY(-8px)"
                      : "translateY(0px)",
                    boxShadow: isHovered
                      ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                      : "none",
                    transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                  }}
                >
                  <div
                    className="text-5xl mb-4"
                    style={{
                      transform: isHovered
                        ? "scale(1.1) rotate(3deg)"
                        : "scale(1) rotate(0deg)",
                      transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      color: isHovered ? "#10B981" : "var(--foreground)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p style={{ color: "var(--foreground-light)" }}>
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16" style={{ backgroundColor: "var(--bg-card)" }}>
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--foreground)" }}
          >
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-6 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex mb-3">
                  {"⭐".repeat(testimonial.rating)}
                </div>
                <p
                  className="mb-4 italic leading-relaxed"
                  style={{ color: "var(--foreground-light)" }}
                >
                  "{testimonial.text}"
                </p>
                <div>
                  <p
                    className="font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--foreground-light)" }}
                  >
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Ready to start your project?
          </h2>
          <p
            className="mb-8 text-lg"
            style={{ color: "var(--foreground-light)" }}
          >
            Let's discuss how we can help your business grow.
          </p>
          <button
            onClick={goToContact}
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{ backgroundColor: "var(--accent)", color: "white" }}
          >
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
