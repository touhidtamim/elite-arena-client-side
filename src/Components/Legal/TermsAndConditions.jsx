import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <section className="py-24  px-4 bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 font-serif">
            <span className="text-yellow-400">Terms</span> & Conditions
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
              1. Membership Terms
            </h2>
            <p>By registering for an Elite Arena membership, you agree to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Pay all fees on time</li>
              <li>Follow all facility rules and regulations</li>
              <li>Use equipment properly and safely</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              2. Payments & Cancellations
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Membership fees are non-refundable</li>
              <li>Auto-renewal can be canceled 7 days before renewal date</li>
              <li>Late payments may result in service suspension</li>
              <li>Annual memberships require 30-day notice for cancellation</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              3. Facility Use
            </h2>
            <p>Members must:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Wipe down equipment after use</li>
              <li>Use proper athletic attire</li>
              <li>Not misuse or damage equipment</li>
              <li>Follow staff instructions at all times</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              4. Health & Safety
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Consult a physician before beginning any exercise program</li>
              <li>Use equipment at your own risk</li>
              <li>Report any injuries immediately</li>
              <li>Elite Arena is not liable for personal injuries</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              5. Code of Conduct
            </h2>
            <p>Prohibited behaviors include:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Harassment of other members or staff</li>
              <li>Use of performance-enhancing substances</li>
              <li>Unauthorized personal training</li>
              <li>Commercial photography without permission</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              6. Intellectual Property
            </h2>
            <p>
              All Elite Arena logos, training programs, and content are
              proprietary and may not be reproduced without written permission.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              7. Limitation of Liability
            </h2>
            <p>
              Elite Arena is not responsible for lost or stolen items. We
              reserve the right to refuse service to anyone violating these
              terms.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              8. Changes to Terms
            </h2>
            <p>
              We may modify these terms at any time. Continued use of our
              services constitutes acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              9. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of Bangladesh. Any disputes
              will be resolved in Dhaka courts.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
