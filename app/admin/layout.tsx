
export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
          {children}
        </div>
      </div>
    )
  }