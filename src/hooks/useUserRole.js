import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const useUserRole = (email) => {
  const {
    data: role,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userRole", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await api.get(`/users/role/${email}`);
      return res.data.role;
    },
  });

  return { role, isLoading, error };
};

export default useUserRole;
