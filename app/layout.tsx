import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/src/components/Navigation/Navigation'
import { ThemeProvider } from '@/components/theme-provider'
import Provider from '@/app/context/client-provider'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={`${inter.className} pb-8 w-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Provider session={session}>
            <Navigation />
            <div className="md:px-14 px-6">{children}</div>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
