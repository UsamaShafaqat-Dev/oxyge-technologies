import React from "react";

const About = () => {
  // Team Members Data
  const teamMembers = [
    {
      id: 1,
      name: "Ahmed Raza",
      role: "CEO & Founder",
      bio: "10+ years of experience in software development and business strategy.",
      icon: "👨‍💼",
    },
    {
      id: 2,
      name: "Sara Khan",
      role: "CTO",
      bio: "Expert in MERN stack and cloud architecture.",
      icon: "👩‍💻",
    },
    {
      id: 3,
      name: "Ali Hassan",
      role: "Lead Developer",
      bio: "Full-stack developer with 7+ years of experience.",
      icon: "👨‍💻",
    },
  ];

  // Core Values Data
  const values = [
    {
      id: 1,
      title: "Innovation",
      description: "Cutting-edge solutions for modern problems",
      icon: "💡",
    },
    {
      id: 2,
      title: "Quality",
      description: "Excellence in every delivery",
      icon: "⭐",
    },
    {
      id: 3,
      title: "Integrity",
      description: "Trust and transparency with clients",
      icon: "🤝",
    },
    {
      id: 4,
      title: "Customer First",
      description: "Your success is our priority",
      icon: "🎯",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Heading */}
      <h1
        className="text-4xl font-bold text-center mb-8"
        style={{ color: "var(--foreground)" }}
      >
        About Us
      </h1>

      {/* Company Intro */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p
          className="text-lg leading-relaxed"
          style={{ color: "var(--foreground-light)" }}
        >
          Oxege Technologies is a professional software house offering
          innovative IT solutions. We help businesses grow through modern
          technologies, smart strategies, and result-driven services.
        </p>
      </div>

      {/* CEO INTRO SECTION - NEW */}
      <div
        className="max-w-4xl mx-auto mb-16 p-6 rounded-xl"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="text-8xl">👨‍💼</div>
          <div className="text-center md:text-left">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Ahmed Raza - CEO & Founder
            </h2>
            <p className="mb-3" style={{ color: "var(--accent)" }}>
              10+ Years of Industry Experience
            </p>
            <p style={{ color: "var(--foreground-light)" }}>
              "Our mission is to deliver quality software solutions that drive
              business growth. We believe in innovation, integrity, and putting
              our clients first."
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
        <div
          className="p-6 rounded-xl text-center"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="text-5xl mb-3">👁️</div>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: "var(--foreground)" }}
          >
            Our Vision
          </h2>
          <p style={{ color: "var(--foreground-light)" }}>
            To become a leading technology partner for businesses worldwide.
          </p>
        </div>
        <div
          className="p-6 rounded-xl text-center"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="text-5xl mb-3">🎯</div>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: "var(--foreground)" }}
          >
            Our Mission
          </h2>
          <p style={{ color: "var(--foreground-light)" }}>
            To deliver quality software solutions that drive business growth.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <h2
        className="text-3xl font-bold text-center mb-8"
        style={{ color: "var(--foreground)" }}
      >
        Our Core Values
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
        {values.map((value) => (
          <div
            key={value.id}
            className="p-6 rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="text-5xl mb-3">{value.icon}</div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "var(--foreground)" }}
            >
              {value.title}
            </h3>
            <p style={{ color: "var(--foreground-light)" }}>
              {value.description}
            </p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <h2
        className="text-3xl font-bold text-center mb-8"
        style={{ color: "var(--foreground)" }}
      >
        Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="p-6 rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="text-6xl mb-3">{member.icon}</div>
            <h3
              className="text-xl font-bold mb-1"
              style={{ color: "var(--foreground)" }}
            >
              {member.name}
            </h3>
            <p className="text-sm mb-2" style={{ color: "var(--accent)" }}>
              {member.role}
            </p>
            <p className="text-sm" style={{ color: "var(--foreground-light)" }}>
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
