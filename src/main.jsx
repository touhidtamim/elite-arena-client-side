import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Router from "./Router/Router";
import AuthProvider from "./Provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const stripePromise = loadStripe(
  "pk_test_51RnpVD081n3h4OeN9KE5FV97d7cNZDtCyF5SSnKPthj1EeaiKe5cepWq0R2JwxDFzZbivwY2mpS5jIbUb7VA4GWC00uoh9BQUF"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <AuthProvider>
          <RouterProvider router={Router} />
          <ToastContainer position="top-center" autoClose={3000} />
        </AuthProvider>
      </Elements>
    </QueryClientProvider>
  </StrictMode>
);
