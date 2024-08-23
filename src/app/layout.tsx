import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>Identity Tester</h1>
          <nav>
            <ul>
              <li>
                <a href="/">/</a>
              </li>
              <li>
                <a href="/rwa">Regular Web Application</a>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
