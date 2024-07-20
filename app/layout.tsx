import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbars/navbar";
import Footer from "@/components/footer";
// import { usePathname } from "next/navigation";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AjAy SHEOKAND",
  description: "Dive into my tech portal where I showcase projects, articles, and tutorials in Web Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar showOnPages={["/", "/about", "/projects", "contact", "home"]}/> */}
        {children}
        <Footer/>
        </body>
    </html>
  );
}
