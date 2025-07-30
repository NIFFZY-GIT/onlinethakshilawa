// app/admin/layout.tsx
import Link from 'next/link';
import { Shield, LayoutDashboard, BookCopy, Users, Bell } from 'lucide-react';

// In a real app, you'd get the session here and check the user's role.
// This is a server component, so you can do that securely.
// import { getSession } from 'next-auth/react'; // or your auth library
// import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- SECURITY CHECK ---
  // const session = await getSession();
  // if (!session || session.user.role !== 'ADMIN') {
  //   redirect('/login');
  // }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-6 text-2xl font-bold flex items-center gap-2">
            <Shield />
            Admin Panel
        </div>
        <nav className="mt-8">
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
            </Link>
             {/* Add other admin links here */}
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}