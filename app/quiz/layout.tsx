import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { QuizContextProvider } from "@/context/QuizContext";

export default function NestedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuizContextProvider>
      <Navbar />
      {children}
      <Footer />
    </QuizContextProvider>
  );
}
