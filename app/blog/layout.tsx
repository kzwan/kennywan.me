import { headerNavLinks } from 'configs/header-nav-links';
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from 'app/components/header';
import { ScrollToTop } from '../components/scroll-to-top-button'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="flex h-screen flex-col justify-between">
          <Header/>
          <main className="mb-auto w-5xl mx-auto">{children}</main>
          <ScrollToTop />
          <footer className="py-10 text-center text-sm text-gray-500">
            © 2026 Kenny Wan
          </footer>
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  )
}