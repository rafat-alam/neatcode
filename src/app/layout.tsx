import Header from "@/Components/top-nav/Header";
import "./globals.css";
import LoadingIndicator from "@/Components/LoadingIndicator";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';

  return (
    <html lang="en">
      <body>
        <div className={`h-screen flex flex-col ${theme}`}>
          <LoadingIndicator />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
