import { headerNavLinks } from 'configs/header-nav-links';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex h-screen flex-col justify-between">
        <header className="py-10">
          <nav className="text-xl font-semibold">
            <a href="/blog">My Blog</a>
          </nav>
        </header>
        <main className="mb-auto">{children}</main>
        <footer className="py-10 text-center text-sm text-gray-500">
          © 2026 Kenny Wan
        </footer>
      </div>
    </div>
  )
}