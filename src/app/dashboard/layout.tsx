import '../globals.css'
import { Inter } from 'next/font/google'
import Main from '@/components/layout/admin/main'

export const metadata = {
  title: 'Dashboard',
  description: 'System Management System Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Main title="School Management System">
        {children}
    </Main>
  )
}
