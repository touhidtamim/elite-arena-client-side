import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <section className="py-24 px-4 bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 font-serif">
            <span className="text-yellow-400">Privacy</span> Policy
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          <p className="mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              1. Introduction
            </h2>
            <p>
              Elite Arena ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website or use our services.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              2. Information We Collect
            </h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Personal Data:</strong> Name, email, phone number,
                payment information
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, pages
                visited
              </li>
              <li>
                <strong>Health Data:</strong> Medical conditions (for fitness
                programs)
              </li>
              <li>
                <strong>Cookies:</strong> To enhance user experience
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              3. How We Use Your Information
            </h2>
            <p>Your information is used for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Providing and maintaining our service</li>
              <li>Processing transactions</li>
              <li>Personalizing your experience</li>
              <li>Improving our services</li>
              <li>Communicating with you</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              4. Data Security
            </h2>
            <p>
              We implement industry-standard security measures including
              encryption, access controls, and secure servers. However, no
              method of transmission over the Internet is 100% secure.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              5. Third-Party Sharing
            </h2>
            <p>We may share information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Payment processors</li>
              <li>Fitness equipment providers</li>
              <li>Marketing partners (with consent)</li>
              <li>Legal authorities when required</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Opt-out of marketing</li>
              <li>Withdraw consent</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this policy periodically. We will notify you of any
              changes by posting the new policy on this page.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              8. Contact Us
            </h2>
            <p>
              For questions about this policy, contact us at:
              <br />
              <span className="text-yellow-400">privacy@elitearena.com</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
