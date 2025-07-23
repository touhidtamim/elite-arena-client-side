import { useState } from "react";
import CouponForm from "./CouponForm";
import CouponTable from "./CouponTable";

const ManageCoupons = () => {
  const [refreshToggle, setRefreshToggle] = useState(false);
  const triggerRefresh = () => setRefreshToggle((prev) => !prev);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        Manage Coupons
      </h2>

      {/* Add New Coupon */}
      <CouponForm onSuccess={triggerRefresh} />

      {/* Table with Edit/Delete */}
      <CouponTable refreshToggle={refreshToggle} />
    </div>
  );
};

export default ManageCoupons;
