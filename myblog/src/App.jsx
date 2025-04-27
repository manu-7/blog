import React from "react";
import Footer from "./ui_components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui_components/AppLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUpPage from "./pages/SignUpPage";

// ❌ Incorrect: const queryClient = newQueryClient
// ✅ Correct:
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="blogs/:slug" element={<DetailPage />} />
            <Route path="signup" element={<SignUpPage />} />
            {/* <Route path="profile" element={<ProfilePage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
