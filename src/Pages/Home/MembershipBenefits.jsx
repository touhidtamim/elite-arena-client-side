import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { Link } from "react-router";

const MembershipBenefits = () => {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const benefitsPerPage = 6;

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const res = await api.get("/coupons");
        const data = res.data.map((coupon, i) => ({
          title: coupon.title || `Benefit ${i + 1}`,
          description: coupon.description || "Exclusive benefit",
          coupon: coupon.coupon,
          icon: getIconByIndex(i),
        }));
        setBenefits(data);
      } catch (err) {
        toast.error("Failed to load membership benefits");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const getIconByIndex = (index) => {
    const icons = [
      "⏱️",
      "💰",
      "💪",
      "✨",
      "👥",
      "🎉",
      "🏅",
      "🎽",
      "📞",
      "📈",
      "🎁",
    ];
    return icons[index % icons.length];
  };

  // Calculate pagination indices
  const indexOfLast = currentPage * benefitsPerPage;
  const indexOfFirst = indexOfLast - benefitsPerPage;
  const currentBenefits = benefits.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(benefits.length / benefitsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          Loading benefits...
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Elite <span className="text-yellow-500">Membership</span> Perks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock premium benefits and exclusive discounts
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentBenefits.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No benefits available currently.
            </p>
          ) : (
            currentBenefits.map((benefit, index) => (
              <motion.div
                key={indexOfFirst + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12 shadow-sm">
                  USE CODE: {benefit.coupon}
                </div>

                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-6">{benefit.description}</p>

                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">DISCOUNT CODE</p>
                  <p className="font-mono font-bold text-yellow-600 text-lg tracking-widest">
                    {benefit.coupon}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 mb-20">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500"
              } text-black font-semibold`}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded font-semibold ${
                  currentPage === i + 1
                    ? "bg-yellow-600 text-white"
                    : "bg-yellow-400 text-black hover:bg-yellow-500"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500"
              } text-black font-semibold`}
            >
              Next
            </button>
          </div>
        )}

        {/* Special Offer Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-8 md:p-10 text-center shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
            Limited Time Offer!
          </h3>
          <p className="text-lg text-gray-900 mb-6">
            Get <span className="font-bold">50% OFF</span> your first month—join
            today and save big!
          </p>
          <Link
            to="/courts#premium-courts"
            className="inline-block bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all transform hover:scale-105"
          >
            Claim Your Discount
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipBenefits;
