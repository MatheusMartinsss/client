import './globals.css'
import type { Metadata } from 'next'
import Provider from '@/providers/sessionProvider'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeRegistry from './components/ThemeRegistry/ThemeRegistry';
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeRegistry>
          <ToastContainer />
          <Provider >
            {children}
          </Provider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
