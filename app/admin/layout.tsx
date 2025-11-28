import { Header } from "app/components/header"

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Header/>
          {children}
        </div>
      </div>
    )
  }