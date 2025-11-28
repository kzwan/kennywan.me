import { Header } from "app/components/header"
export default function ProjectLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-3xl xl:px-0">
        <div className="flex h-screen flex-col justify-between">
          <Header/>
          <main className="mb-auto w-[743px] mx-auto">{children}</main>
          <footer className="py-10 text-center text-sm text-gray-500">
            © 2026 Kenny Wan
          </footer>
        </div>
      </div>
    )
  }