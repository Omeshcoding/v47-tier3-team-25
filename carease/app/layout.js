import Navbar from '@/components/Navbar';
import './globals.css';
import AuthSessionProvider from './providers/SessionProvider';

export const metadata = {
  title: 'CarEase',
  description: 'Car Comparision Webapp',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <Navbar />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
