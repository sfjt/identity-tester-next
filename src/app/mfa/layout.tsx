export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <h2>MFA API Tester</h2>
      {children}
    </main>
  )
}
