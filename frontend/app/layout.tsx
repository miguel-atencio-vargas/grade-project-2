import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";
import GoToPage from "./components/GoToPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notepad",
  description: "Notepad app created with Next JS by Miguel Atencio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex items-center justify-center flex-col`} >
        <header className="text-4xl">
          <GoToPage href={''} text={'Notepad App'} />
        </header>
        {children}
      </body>
    </html>
  );
}
