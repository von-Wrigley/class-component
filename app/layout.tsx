import React, { Suspense } from 'react'
import  StoreProvider  from '../app/Storeprovider'
import '../app/globals.css'



interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <StoreProvider >
          <Suspense fallback={<p>sdffffffffffffffffffffff</p>}>
          {children}
          </Suspense>
       
        </StoreProvider>
      </body>
    </html>
  );
}