import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ContactPageContent from "@/components/sections/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact — 1LaunchLayer",
  description:
    "Get in touch with 1LaunchLayer. Book a free discovery call or send an enquiry — we respond within 1 business day.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactPageContent />
      </main>
      <Footer />
    </>
  );
}
