// components/LazyToast.jsx
import { lazy, Suspense } from "react";


const ToastContainer = lazy(() =>
  import("react-toastify").then((mod) => ({
    default: mod.ToastContainer,
  }))
);

const LazyToast = () => (
  <Suspense fallback={null}>
    <ToastContainer position="top-right" autoClose={3000} />
  </Suspense>
);

export default LazyToast;
