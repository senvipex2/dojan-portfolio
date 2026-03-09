import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Code,
  MessageSquare,
  PenTool,
  Rocket,
  LifeBuoy,
  CheckCircle2,
  Zap,
  Shield,
  Layout,
  Smartphone,
  Headphones,
  ExternalLink,
  Mail,
  User,
  Star,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import { useProjects } from "@/hooks/use-projects";
import { useTestimonials } from "@/hooks/use-testimonials";
import { useContact } from "@/hooks/use-contact";

import { PreviewModal } from "@/components/PreviewModal";
import { SectionHeading } from "@/components/SectionHeading";

// Local schema for form since we can't easily import from backend schema directly here if types diverge,
// but we will use standard zod matching the API requirement.
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  content: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Home() {
  const { data: projects, isLoading: isLoadingProjects } = useProjects();
  const { data: testimonials, isLoading: isLoadingTestimonials } =
    useTestimonials();
  const contactMutation = useContact();
  const { toast } = useToast();

  const [previewData, setPreviewData] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", content: "" },
  });

  const onSubmit = async (data: any) => {
    try {
      await fetch("https://formsubmit.co/ajax/dojanschool@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.content,
        }),
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      contactForm.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-x-0 border-t-0 border-b-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            className="text-2xl font-display font-bold gradient-text cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            Dojan Carvalho
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["About", "Portfolio", "Process", "Pricing"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition-all duration-300 hover:box-glow text-sm"
          >
            Let's Talk
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-24">
        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full glass-panel text-primary text-sm font-medium mb-8 border-primary/20">
                🚀 Available for new projects
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold text-white leading-tight mb-6">
                I Build{" "}
                <span className="gradient-text text-glow">
                  Professional Websites
                </span>{" "}
                <br />
                For Businesses & Brands
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Elevate your online presence with stunning, high-converting
                websites designed specifically to grow your audience and
                revenue.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-lg box-glow hover:scale-105 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  View My Work
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-4 rounded-xl font-semibold glass-panel glass-panel-hover text-white flex items-center justify-center w-full sm:w-auto"
                >
                  Contact Me
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary blur-2xl opacity-20 rounded-3xl"></div>
                {/* placeholder portrait of an energetic professional man */}
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D12AQEHPkbBY-TEQg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1678731197567?e=2147483647&v=beta&t=yYid9z8wFJPT0zpdIaF4xhX1xiDLoG2N0DaanD_AgWk"
                  alt="Dojan Carvalho"
                  className="relative z-10 w-full h-auto rounded-3xl object-cover border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <SectionHeading title="About Me" subtitle="" />
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Hi, I'm Dojan Carvalho. I specialize in transforming visions
                  into digital reality. With a keen eye for modern aesthetics
                  and a deep understanding of functional user experiences, I
                  build websites that don't just look good—they perform.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Whether you're a startup looking to make a splash or an
                  established business needing a digital facelift, my
                  agency-level workflow ensures a seamless process from concept
                  to launch. Let's create an unforgettable digital footprint
                  together.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="glass-panel p-4 rounded-xl">
                    <h4 className="text-primary font-display font-bold text-3xl mb-1">
                      50+
                    </h4>
                    <p className="text-sm text-gray-400">Projects Delivered</p>
                  </div>
                  <div className="glass-panel p-4 rounded-xl">
                    <h4 className="text-secondary font-display font-bold text-3xl mb-1">
                      100%
                    </h4>
                    <p className="text-sm text-gray-400">Client Satisfaction</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section
          id="portfolio"
          className="py-24 px-4 sm:px-6 bg-white/[0.02] border-y border-white/5"
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              title="Live Website Demos"
              subtitle="Explore a handpicked selection of my recent works. Click 'Live Preview' to interact with the full experience."
              centered
            />

            {isLoadingProjects ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[400px] rounded-2xl bg-white/5 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : projects?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Projects are currently being updated. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects?.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-panel rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,172,254,0.15)] flex flex-col"
                  >
                    <div className="h-60 overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <span className="bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium rounded-full text-white border border-white/10">
                          Demo
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 flex-1">
                        {project.description}
                      </p>
                      <button
                        onClick={() =>
                          setPreviewData({
                            url: project.demoUrl,
                            title: project.title,
                          })
                        }
                        className="w-full py-3 rounded-lg font-medium bg-white/10 hover:bg-primary hover:text-black transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={18} />
                        Live Preview
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* WORK PROCESS SECTION */}
        <section id="process" className="py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              title="My Work Process"
              subtitle="A structured approach to ensure perfect execution from idea to launch."
              centered
            />

            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  icon: MessageSquare,
                  title: "Consultation",
                  desc: "Understanding your goals and requirements.",
                },
                {
                  icon: PenTool,
                  title: "Design",
                  desc: "Crafting the visual identity and layout.",
                },
                {
                  icon: Code,
                  title: "Development",
                  desc: "Writing clean, scalable code.",
                },
                {
                  icon: Rocket,
                  title: "Launch",
                  desc: "Testing and deploying to live servers.",
                },
                {
                  icon: LifeBuoy,
                  title: "Support",
                  desc: "Ongoing maintenance and updates.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-6 rounded-2xl text-center relative group"
                >
                  {index !== 4 && (
                    <div className="hidden md:block absolute top-12 -right-3 w-6 border-t-2 border-dashed border-white/20 z-0"></div>
                  )}
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                    <step.icon
                      className="text-primary group-hover:text-secondary transition-colors"
                      size={28}
                    />
                  </div>
                  <h4 className="text-white font-bold mb-2">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="py-24 px-4 sm:px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Fast Delivery",
                  desc: "Rapid turnaround without compromising quality.",
                },
                {
                  icon: Smartphone,
                  title: "Mobile-Friendly",
                  desc: "Perfectly responsive designs for all devices.",
                },
                {
                  icon: Layout,
                  title: "Clean UI/UX",
                  desc: "Modern, intuitive, and user-centric interfaces.",
                },
                {
                  icon: Shield,
                  title: "Professional Design",
                  desc: "Agency-level aesthetics that build trust.",
                },
                {
                  icon: Headphones,
                  title: "Reliable Support",
                  desc: "I'm always here to help you post-launch.",
                },
                {
                  icon: CheckCircle2,
                  title: "Affordable Pricing",
                  desc: "Premium quality at accessible rates.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:bg-white/5 transition-colors flex gap-4 items-start"
                >
                  <div className="p-3 bg-white/5 rounded-xl text-primary">
                    <benefit.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              title="Transparent Pricing"
              subtitle="Choose the perfect plan for your business needs."
              centered
            />

            <div className="grid md:grid-cols-3 gap-8 items-center mt-12">
              {/* Plan 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel p-8 rounded-3xl"
              >
                <h3 className="text-xl font-bold text-gray-300 mb-2">
                  Rookie Site
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-display font-bold text-white">
                    ₹5,000
                  </span>
                  <span className="text-muted-foreground text-sm">/setup</span>
                </div>
                <div className="text-sm font-medium text-primary mb-8 pb-8 border-b border-white/10">
                  + ₹1,000 / month maintenance
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "1 Page Landing Site",
                    "Mobile Responsive",
                    "Contact Form",
                    "Basic SEO",
                    "1 Week Delivery",
                  ].map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <CheckCircle2 size={16} className="text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
                >
                  Get Started
                </button>
              </motion.div>

              {/* Plan 2 - Highlighted */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-b from-primary/10 to-secondary/10 p-1 rounded-3xl relative z-10 box-glow md:scale-105"
              >
                <div className="bg-[#0a0a0a] p-8 rounded-[1.4rem] h-full">
                  <div className="absolute top-0 right-8 transform -translate-y-1/2">
                    <span className="bg-gradient-to-r from-primary to-secondary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Multi-Web
                  </h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                      ₹8,000
                    </span>
                    <span className="text-muted-foreground text-sm">
                      /setup
                    </span>
                  </div>
                  <div className="text-sm font-medium text-primary mb-8 pb-8 border-b border-white/10">
                    + ₹1,000 / month maintenance
                  </div>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Up to 5 Pages",
                      "Premium Design",
                      "Mobile Responsive",
                      "Advanced SEO",
                      "CMS Integration",
                      "2 Weeks Delivery",
                    ].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-gray-200"
                      >
                        <CheckCircle2 size={16} className="text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>

              {/* Plan 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-8 rounded-3xl"
              >
                <h3 className="text-xl font-bold text-gray-300 mb-2">
                  Professional Site
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-display font-bold text-white">
                    ₹10,000
                  </span>
                  <span className="text-muted-foreground text-sm">/setup</span>
                </div>
                <div className="text-sm font-medium text-secondary mb-8 pb-8 border-b border-white/10">
                  + ₹1,000 / month maintenance
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Unlimited Pages",
                    "E-commerce Ready",
                    "Custom Features",
                    "Priority Support",
                    "Payment Gateway",
                    "3 Weeks Delivery",
                  ].map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <CheckCircle2 size={16} className="text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
                >
                  Get Started
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 px-4 sm:px-6 bg-white/[0.02] border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              title="Client Feedback"
              subtitle="Don't just take my word for it."
              centered
            />

            {isLoadingTestimonials ? (
              <div className="flex gap-6 overflow-x-auto pb-8 snap-x mt-12">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="min-w-[300px] h-[200px] bg-white/5 rounded-2xl animate-pulse shrink-0"
                  ></div>
                ))}
              </div>
            ) : testimonials?.length === 0 ? null : ( // Hide if no data yet
              <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory mt-12 custom-scrollbar">
                {testimonials?.map((t, index) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-panel p-8 rounded-3xl min-w-[320px] md:min-w-[400px] snap-center shrink-0"
                  >
                    <div className="flex gap-1 mb-6 text-yellow-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-6 leading-relaxed">
                      "{t.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      {t.avatarUrl ? (
                        <img
                          src={t.avatarUrl}
                          alt={t.clientName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                          {t.clientName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h5 className="text-white font-bold">{t.clientName}</h5>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-4 sm:px-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full z-0 pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 glass-panel rounded-3xl overflow-hidden border border-white/20">
            <div className="grid md:grid-cols-5 h-full">
              <div className="p-10 md:col-span-2 bg-black/60 border-r border-white/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">
                    Let's work together.
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    Ready to start your next project? Fill out the form and I'll
                    get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  <a
                    href="https://wa.me/919960951026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors border border-white/10">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        WhatsApp
                      </p>
                      <p className="font-medium">+91 9960951026</p>
                    </div>
                  </a>
                  <a
                    href="https://instagram.com/carvalhodojan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 group-hover:text-secondary transition-colors border border-white/10">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Instagram
                      </p>
                      <p className="font-medium">@carvalhodojan</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-10 md:col-span-3">
                <form
                  onSubmit={contactForm.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Your Name
                    </label>
                    <input
                      {...contactForm.register("name")}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
                      placeholder="John Doe"
                    />
                    {contactForm.formState.errors.name && (
                      <p className="text-destructive text-xs mt-2">
                        {contactForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email Address
                    </label>
                    <input
                      {...contactForm.register("email")}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
                      placeholder="john@example.com"
                    />
                    {contactForm.formState.errors.email && (
                      <p className="text-destructive text-xs mt-2">
                        {contactForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Project Details
                    </label>
                    <textarea
                      {...contactForm.register("content")}
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-gray-600"
                      placeholder="Tell me about your website goals..."
                    />
                    {contactForm.formState.errors.content && (
                      <p className="text-destructive text-xs mt-2">
                        {contactForm.formState.errors.content.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                    {!contactMutation.isPending && <ArrowRight size={18} />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#050505] py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <div className="text-2xl font-display font-bold text-white mb-2">
              Dojan Carvalho
            </div>
            <p className="text-muted-foreground text-sm">
              Elevating brands through premium digital experiences.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://wa.me/919960951026"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/carvalhodojan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Dojan Carvalho. All rights reserved.
        </div>
      </footer>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={!!previewData}
        onClose={() => setPreviewData(null)}
        demoUrl={previewData?.url || ""}
        title={previewData?.title || ""}
      />
    </div>
  );
}
