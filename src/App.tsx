import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/i18n/I18nProvider";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { NewsPage } from "@/pages/NewsPage";
import { ContactPage } from "@/pages/ContactPage";
import { SectionsPage } from "@/pages/SectionsPage";
import { SectionPostsPage } from "@/pages/SectionPostsPage";
import { PostDetailsPage } from "@/pages/PostDetailsPage";
import { AdminPage } from "@/pages/AdminPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <I18nProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sections" element={<SectionsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sections/:slug" element={<SectionPostsPage />} />
            <Route path="/posts/:id" element={<PostDetailsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
