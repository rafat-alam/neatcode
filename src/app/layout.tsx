import Header from "@/Components/Header";
import "./globals.css";
import LoadingIndicator from "@/Components/LoadingIndicator";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen flex flex-col">
          <LoadingIndicator />
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
