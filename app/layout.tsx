import './globals.css'
import { Karla } from 'next/font/google'
import { Header } from './components/header'

const karla = Karla({ subsets: ['latin'] })

export const metadata = {
  title: 'Kenny Wan',
  description: 'Personal Site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${karla.className}`}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
