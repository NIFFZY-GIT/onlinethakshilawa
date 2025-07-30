// app/courses/page.tsx

'use client'; // This component is interactive, so it must be a client component.

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Search, Book, BarChart, DollarSign, GraduationCap, CheckCircle } from 'lucide-react';

// You can define metadata even in a Client Component.
// Next.js will handle it correctly during server rendering.
/*
export const metadata: Metadata = {
  title: 'Explore Courses',
  description: 'Browse our full catalog of expert-led courses.',
};
*/
// Note: As of Next.js 13.4, static metadata is better placed in a layout or a dedicated `metadata` export if the page was a Server Component. 
// For a Client Component, you'd typically manage the title dynamically if needed. For simplicity, we'll assume a parent layout sets a base title.


// --- Mock Data (Replace with API fetch in a real app) ---
const allCourses = [
  { id: 1, title: 'Next.js for Beginners', description: 'Learn the fundamentals of building modern web apps with Next.js.', instructor: 'Jane Doe', category: 'Web Development', level: 'Beginner', price: 49.99, isEnrolled: true },
  { id: 2, title: 'Mastering PostgreSQL', description: 'A deep dive into advanced PostgreSQL features for scalable databases.', instructor: 'John Smith', category: 'Databases', level: 'Advanced', price: 99.99, isEnrolled: false },
  { id: 3, title: 'Advanced Tailwind CSS', description: 'Unlock the full potential of Tailwind CSS with utility-first design patterns.', instructor: 'Alex Johnson', category: 'Web Development', level: 'Intermediate', price: 79.99, isEnrolled: false },
  { id: 4, title: 'Introduction to Prisma', description: 'The best way to work with databases in your Node.js & TypeScript apps.', instructor: 'Sam Wilson', category: 'Databases', level: 'Beginner', price: 49.99, isEnrolled: false },
  { id: 5, title: 'React State Management', description: 'Compare and master different state management libraries in React.', instructor: 'Jane Doe', category: 'Web Development', level: 'Intermediate', price: 89.99, isEnrolled: false },
  { id: 6, title: 'Data Science with Python', description: 'Learn data analysis and visualization with Pandas, Matplotlib, and Scikit-learn.', instructor: 'Emily White', category: 'Data Science', level: 'Beginner', price: 129.99, isEnrolled: false },
  { id: 7, title: 'DevOps Fundamentals', description: 'An introduction to CI/CD, Docker, and Kubernetes.', instructor: 'Chris Green', category: 'DevOps', level: 'Intermediate', price: 109.99, isEnrolled: true },
];

const uniqueCategories = ['All', ...new Set(allCourses.map(c => c.category))];
const uniqueLevels = ['All', ...new Set(allCourses.map(c => c.level))];

// --- Sub-Component for a Single Course Card ---
const CourseCard = ({ course }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
    <div className="h-40 bg-gray-200 flex items-center justify-center">
      <GraduationCap className="w-16 h-16 text-gray-400" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
          {course.category}
        </span>
        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${course.level === 'Beginner' ? 'text-green-600 bg-green-200' : course.level === 'Intermediate' ? 'text-yellow-600 bg-yellow-200' : 'text-red-600 bg-red-200'}`}>
          {course.level}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{course.description}</p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <p className="text-lg font-bold text-gray-800">
          {course.price > 0 ? `$${course.price}` : 'Free'}
        </p>
        {course.isEnrolled ? (
          <Link href={`/dashboard`} className="flex items-center gap-2 rounded-md bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 cursor-default">
            <CheckCircle className="h-4 w-4" /> Enrolled
          </Link>
        ) : (
          <Link href={`/courses/${course.id}`} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
            View Details
          </Link>
        )}
      </div>
    </div>
  </div>
);

// --- The Main Courses Page Component ---
export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredCourses = useMemo(() => {
    return allCourses
      .filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(course => selectedCategory === 'All' || course.category === selectedCategory)
      .filter(course => selectedLevel === 'All' || course.level === selectedLevel);
  }, [searchTerm, selectedCategory, selectedLevel]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Course Catalog</h1>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-600">Find the perfect course to advance your skills.</p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="relative col-span-1 md:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="col-span-1 md:col-span-1">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {uniqueLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">No Courses Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter settings to find what you&apos;re looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}