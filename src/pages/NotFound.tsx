
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blog-primary mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-8">عفواً، الصفحة المطلوبة غير موجودة</p>
          <Button asChild size="lg" className="bg-blog-primary hover:bg-blog-secondary">
            <Link to="/">
              العودة للصفحة الرئيسية <ArrowRight className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
