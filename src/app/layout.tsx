import Header from "@/Components/Header";
import "./globals.css";
import LoadingIndicator from "@/Components/LoadingIndicator";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
