import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-light flex flex-col items-center justify-center p-4">
      <Link href="/" className="font-heading text-2xl font-bold text-sage mb-8">
        Fresh Prep Sydney
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
