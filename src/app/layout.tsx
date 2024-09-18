import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const mfaAPITesterLoginParams = new URLSearchParams({
    returnTo: `${process.env.AUTH0_BASE_URL}/mfa`,
    audience: process.env.MFA_API_AUDIENCE || "",
    scope: "openid profile email enroll read:authenticators remove:authenticators",
  })

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
              <li>
                <a href={"/api/auth/login?" + mfaAPITesterLoginParams}>MFA API Tester</a>
              </li>
            </ul>
          </nav>
        </header>

        {children}
      </body>
    </html>
  )
}
