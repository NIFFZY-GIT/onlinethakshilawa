// components/layout/Navbar.tsx
import Link from 'next/link';

export const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          LMS
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/courses" className="text-gray-600 hover:text-blue-600">
            Courses
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};