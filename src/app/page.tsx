// src/app/page.tsx

import Link from 'next/link';
import { BookOpen, Target, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white text-center py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Unlock Your Potential.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            Join thousands of learners on our platform to master new skills, from programming and design to business and beyond.
          </p>
          <div className="mt-8">
            <Link href="/courses" className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why LearnSphere?</h2>
            <p className="mt-2 text-gray-600">Everything you need to succeed on your learning journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <BookOpen className="mx-auto h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Expert-Led Courses</h3>
              <p className="mt-2 text-gray-600">Learn from industry professionals with real-world experience.</p>
            </div>
            {/* Feature 2 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Target className="mx-auto h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Interactive Learning</h3>
              <p className="mt-2 text-gray-600">Engage with quizzes, assignments, and hands-on projects.</p>
            </div>
            {/* Feature 3 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Users className="mx-auto h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Supportive Community</h3>
              <p className="mt-2 text-gray-600">Connect with peers and instructors in our forums.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Ready to Start Learning?</h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Create an account today and get access to our entire library of courses. Your new career is just a click away.
          </p>
          <div className="mt-8">
            <Link href="/signup" className="bg-green-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition-colors duration-300">
              Sign Up for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}