import './global.css';
import Header from './shared/widgets/header';
import { Poppins, Roboto } from 'next/font/google'

export const metadata = {
  title: 'EStore',
  description: 'EStore',
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${roboto.className}`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
