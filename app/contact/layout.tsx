import { Header } from "app/components/header"
import { Footer } from "app/components/footer"

export default function ContactLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-3xl] xl:px-0">
        <div className="flex h-screen flex-col justify-between">
          <Header/>
          <main className="mb-auto w-[743px] mx-auto">{children}</main>
          <Footer/>
        </div>
      </div>
    )
  }