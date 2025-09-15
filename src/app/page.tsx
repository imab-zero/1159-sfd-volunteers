"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [availability, setAvailability] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Animate on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Horizontal scroll tracking
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const sectionWidth = container.clientWidth;
      const currentIndex = Math.round(scrollPosition / sectionWidth);
      setCurrentSection(currentIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      left: index * container.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className=" bg-black text-white pt-16">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-black/80 backdrop-blur-sm z-50 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <Image
              src="/assets/log.png"
              alt="Logo"
              width={20}
              height={20}
              className="w-10 h-10"
              unoptimized
            />
          </div>
          <div className="flex space-x-6">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`px-4 py-2 transition-colors ${
                  currentSection === index
                    ? "text-yellow-600"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {index === 0 ? "Home" : index === 1 ? "About" : "Join"}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Scroll Sections */}
      <div
        ref={scrollContainerRef}
        className="w-screen bg-black overflow-y-hidden flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
      >
        {/* Section 1: Hero */}
        <section className="scroll-item relative min-w-full h-screen snap-center">
          {/* Background Layers */}
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center z-0" />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 z-20">
            <Image
              src="/assets/dots-grid.svg"
              alt="Dots Pattern"
              width={400}
              height={400}
              className="absolute top-20 right-20 opacity-30"
              unoptimized
            />
            <Image
              src="/assets/circle-pattern.svg"
              alt="Circle Pattern"
              width={800}
              height={800}
              className="absolute -bottom-96 -left-96 opacity-20"
              unoptimized
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-30 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 tracking-tight transition-all duration-1000 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <span className="text-yellow-600">SCHOOL</span> FOR THE{" "}
              <span className="text-yellow-600">DARING</span>
            </h1>

            {/* <p
              className={`text-xl md:text-2xl max-w-3xl mb-4 font-light transition-all duration-1000 delay-300 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Unlock Your Potential
            </p> */}

            <p
              className={`text-xl md:text-2xl max-w-3xl mb-6 font-light transition-all duration-1000 delay-500 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Volunteer Registration – The School for the Daring National Tour
            </p>

            <p
              className={`text-lg md:text-xl max-w-2xl mb-12 font-light italic text-gray-300 transition-all duration-1000 delay-700 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              &quot;At 1159 Realty, we believe in pushing boundaries and
              challenging conventions. Join our movement and be part of
              something extraordinary.&quot;
            </p>

            <div
              className={`transition-all duration-1000 delay-600 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={() => scrollToSection(2)}
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
              >
              Volunteer
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: About */}
        <section className="scroll-item relative min-w-full h-screen snap-center">
          <div className="absolute inset-0 overflow-hidden z-0">
            <Image
              src="/hero-bg.jpg"
              alt="Abstract Background"
              fill
              className="object-cover opacity-30"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/0" />
            <Image
              src="/assets/wave.svg"
              alt="Wave"
              width={1440}
              height={320}
              className="absolute bottom-0 left-0 w-full"
              unoptimized
            />
          </div>

          <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col justify-center h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="pt-52 md:pt-0">
                <div className="theme-number animate-fade-in">01</div>
                <h2 className="theme-title animate-slide-up">
                  We Challenge Conventions
                </h2>
                <div className="theme-content animate-slide-up">
                  <p className="mb-6">
                    The School for the Daring is more than just an educational
                    impact. It&apos;s a movement that challenges the status quo
                    and pushes boundaries.
                  </p>
                  <p>
                    We believe in creating an environment where innovation
                    thrives, where taking risks is encouraged, and where the
                    daring are rewarded.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl animate-scale">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-600/10 z-10"></div>
                <Image
                  src="/assets/dots-grid.svg"
                  alt="About Illustration"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Join */}
        <section className="scroll-item relative min-w-full h-screen snap-center">
          {/* Background Layer */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <Image
              src="/hero-bg.jpg"
              alt="Abstract Background"
              fill
              className="object-cover opacity-30"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/0" />
            <Image
              src="/assets/wave.svg"
              alt="Wave"
              width={1440}
              height={320}
              className="absolute bottom-0 left-0 w-full"
              unoptimized
            />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col justify-center h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start overflow-y-auto">
              {/* Left: Text Content */}
              <div className="pt-0">
                <div className="theme-number animate-fade-in">02</div>
                <h2 className="theme-title animate-slide-up">
                  Volunteer Registration – The School for the Daring National
                  Tour
                </h2>
                <div className="theme-content animate-slide-up">
                  <p className="mb-6">
                    Thank you for your interest in volunteering for The School
                    for the Daring National Tour. This movement is empowering
                    young Nigerians with financial literacy, entrepreneurship,
                    technology, and asset ownership.
                  </p>
                  <p>
                    Volunteers are key to making this vision a success. Please
                    fill out this form carefully to indicate your interest and
                    availability.
                  </p>
                </div>
              </div>

              {/* Right Form Content */}
              <div className="animate-scale">
                <div className="w-full p-8 bg-black/80 rounded-lg border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600">
                    VOLUNTEER REGISTRATION
                  </h2>

                  {status === "success" ? (
                    <div className="text-center py-8 animate-fadeIn">
                      <h3 className="text-2xl font-bold mb-4 text-green-500">
                        Registration Successful!
                      </h3>
                      <p>
                        Thank you for volunteering! We will be in touch with
                        more details about your role.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-950 text-white">
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setStatus("loading");
                          setErrorMessage("");

                          try {
                            if (
                              !fullName ||
                              !phone ||
                              !email ||
                              !state ||
                              !city ||
                              !university ||
                              !department ||
                              !availability
                            ) {
                              setStatus("error");
                              setErrorMessage("All fields are required");
                              return;
                            }

                            const formData = new FormData();
                            formData.append("fullName", fullName);
                            formData.append("phone", phone);
                            formData.append("email", email);
                            formData.append("state", state);
                            formData.append("city", city);
                            formData.append("university", university);
                            formData.append("department", department);
                            formData.append("availability", availability);
                            formData.append(
                              "roles",
                              JSON.stringify(selectedRoles)
                            );

                            const res = await fetch("/api/lead", {
                              method: "POST",
                              body: formData,
                            });

                            const data = await res.json();

                            if (!res.ok)
                              throw new Error(
                                data.error || "Registration failed"
                              );

                            setStatus("success");
                            setFullName("");
                            setPhone("");
                            setEmail("");
                            setState("");
                            setCity("");
                            setUniversity("");
                            setDepartment("");
                            setAvailability("");
                            setSelectedRoles([]);
                          } catch (error) {
                            console.error("Submission Error:", error);
                            setStatus("error");
                            setErrorMessage(
                              error instanceof Error
                                ? error.message
                                : "Failed to register"
                            );
                          }
                        }}
                        className="space-y-4 max-w-2xl mx-auto"
                      >
                        <input
                          type="text"
                          placeholder="Full Name *"
                          className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-yellow-600"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />

                        <input
                          type="tel"
                          placeholder="Phone Number *"
                          className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-yellow-600"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />

                        <input
                          type="email"
                          placeholder="Email Address *"
                          className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-yellow-600"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />

                        <input
                          type="text"
                          placeholder="State *"
                          className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-yellow-600"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          required
                        />

                        <input
                          type="text"
                          placeholder="City *"
                          className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-yellow-600"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />

                        <input
                          type="text"
                          placeholder="University/Organization *"
                          className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-yellow-600"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          required
                        />

                        <input
                          type="text"
                          placeholder="Department/Field of Study *"
                          className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-yellow-600"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          required
                        />

                        <div className="space-y-2">
                          <label className="text-gray-300 text-sm font-medium">
                            Availability *
                          </label>
                          <select
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-yellow-600"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            required
                          >
                            <option value="">Select availability</option>
                            <option value="Full Event Day">
                              Full Event Day
                            </option>
                            <option value="Morning Session Only">
                              Morning Session Only
                            </option>
                            <option value="Afternoon Session Only">
                              Afternoon Session Only
                            </option>
                          </select>
                        </div>

                        <h3 className="text-lg font-semibold text-yellow-500 mb-2 mt-6">
                          🛠️ Volunteer Role Preference
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">
                          Which area(s) would you like to volunteer in?
                          (Multiple selections allowed)
                        </p>

                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                          {[
                            "Registration & Guest Reception",
                            "Logistics & Set-Up",
                            "Media & Communications (photo, video, social media)",
                            "Protocol & Hospitality (VIPs, speakers, refreshments)",
                            "Technical Support (sound, lighting, projection)",
                            "Crowd Control & Ushering",
                            "Daring Ideas Pitch Session Support",
                            "Job Portal & Networking Hub Support",
                            "Sponsorship & Exhibition Booths",
                            "Post-Event Clean Up & Feedback Collection",
                          ].map((role) => (
                            <label
                              key={role}
                              className="flex items-center space-x-2 text-gray-300"
                            >
                              <input
                                type="checkbox"
                                checked={selectedRoles.includes(role)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedRoles([...selectedRoles, role]);
                                  } else {
                                    setSelectedRoles(
                                      selectedRoles.filter((r) => r !== role)
                                    );
                                  }
                                }}
                                className="rounded border-gray-600 text-yellow-600 focus:ring-yellow-600"
                              />
                              <span className="text-sm">{role}</span>
                            </label>
                          ))}
                        </div>

                        {status === "error" && (
                          <div className="text-yellow-600 text-sm font-bold p-2 bg-red-100/10 border border-yellow-600 rounded animate-pulse">
                            Error: {errorMessage}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-all duration-300 hover:scale-[1.03] disabled:opacity-50"
                        >
                          {status === "loading"
                            ? "Submitting..."
                            : "SUBMIT VOLUNTEER APPLICATION"}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black py-6 text-center text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} School for the Daring. <br></br>Powered
          by 1159 Realty <br></br>All rights reserved.
        </p>
      </footer>
    </div>
  );
}
