import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Piggy Bank",
  description:
    "This is a piggy bank where you can deposite ypur money and withdraw it later. At a time only one bank can be created. You can break the bank and create a new one.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
