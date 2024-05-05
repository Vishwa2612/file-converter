import { Inter } from "next/font/google";
import "./globals.css";
import Home from "./Components/Home";
import Hero from "./Components/Hero";
import Main  from "./Components/Main";
import Review from "./Components/Review";
import Footer from "./Components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Hero/>
        <Main/>
        <Home />
        <Review/>
        <Footer/>
      </body>
    </html>
  );
}