'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <html>
      <body>
        <div className="flex min-h-screen bg-white text-gray-900">
          <div className="w-64 min-h-screen bg-gray-100 p-6 border-r border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/"
                className={`p-3 rounded-lg transition-colors ${
                  pathname === '/' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Iteration 1
              </Link>
              <Link 
                href="/iteration2"
                className={`p-3 rounded-lg transition-colors ${
                  pathname === '/iteration2' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Iteration 2
              </Link>
            </nav>
          </div>
          
          <div className="flex-1 bg-white text-gray-900">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
