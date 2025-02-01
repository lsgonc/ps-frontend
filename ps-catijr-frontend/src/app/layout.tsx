import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Notification from "@/components/Notification";


const poppinsFont = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-poppins",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "CatiJr - Frontend",
  description: "Aplicativo desenvolvido para o processo seletivo de frontend na catijr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppinsFont.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col justify-bewteen max-sm:mt-4">
          <Notification /> {/* Render the notification globally */}
          <div className="sm:block hidden">
            <Header></Header>
          </div>
          <section className="flex-grow">
            {children}
          </section>
          <div className="sm:hidden block">
            <Header></Header>
          </div>
        </div>
      </body>
    </html>
  );
}
