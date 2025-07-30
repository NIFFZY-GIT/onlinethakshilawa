// app/(dashboard)/dashboard/page.tsx

'use client'; // This page requires state for the modal, so it must be a client component.

import { useState } from 'react';
import Link from 'next/link';
import { Book, Video, CheckSquare, Upload, CreditCard, Clock, CircleCheck } from 'lucide-react';

// --- Mock Data (In a real app, this would come from your API) ---
const mockCourses = [
  {
    id: 1,
    title: 'Next.js for Beginners',
    instructor: 'Jane Doe',
    progress: 75,
    status: 'active', // The student is enrolled and can access content.
    meetingLink: 'https://zoom.us/j/1234567890',
  },
  {
    id: 2,
    title: 'Mastering PostgreSQL',
    instructor: 'John Smith',
    progress: 25,
    status: 'active',
    meetingLink: 'https://meet.google.com/xyz-abc-def',
  },
  {
    id: 3,
    title: 'Advanced Tailwind CSS',
    instructor: 'Alex Johnson',
    progress: 0,
    status: 'payment_pending', // Student uploaded a receipt, waiting for admin approval.
  },
  {
    id: 4,
    title: 'Introduction to Prisma',
    instructor: 'Sam Wilson',
    progress: 0,
    status: 'requires_payment', // Student has selected the course but not paid.
  },
];

// --- Sub-Components for Readability ---

// A single course card
const CourseCard = ({ course, onPay }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-4">By {course.instructor}</p>

        {/* --- Conditional UI based on course status --- */}
        {course.status === 'active' && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{course.progress}% Complete</p>
            <div className="flex flex-col space-y-2">
              <Link href={`/courses/${course.id}`} className="flex items-center justify-center gap-2 w-full text-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                <Book className="h-4 w-4" /> Continue Learning
              </Link>
              <a href={course.meetingLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full text-center rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600">
                <Video className="h-4 w-4" /> Join Live Session
              </a>
              <Link href={`/courses/${course.id}/quiz`} className="flex items-center justify-center gap-2 w-full text-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-200">
                <CheckSquare className="h-4 w-4" /> Take Quiz
              </Link>
            </div>
          </>
        )}

        {course.status === 'payment_pending' && (
          <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <Clock className="mx-auto h-8 w-8 text-yellow-500" />
            <p className="mt-2 font-semibold text-yellow-800">Payment Pending</p>
            <p className="text-sm text-yellow-600">Your payment is being verified by an admin.</p>
          </div>
        )}
        
        {course.status === 'requires_payment' && (
          <div className="text-center p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="font-semibold text-red-800">Action Required</p>
            <p className="text-sm text-red-600 mb-4">Complete your payment to access this course.</p>
            <button
              onClick={() => onPay(course)}
              className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
            >
              Complete Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Payment Modal
const PaymentModal = ({ course, onClose }) => {
  if (!course) return null;

  const handleReceiptUpload = (e) => {
    e.preventDefault();
    // In a real app:
    // 1. Get the file from e.target.elements.receipt.files[0]
    // 2. Use FormData to send the file to your API endpoint
    // 3. The backend saves the file and updates the course enrollment status to 'payment_pending'
    console.log('Receipt submitted for course:', course.title);
    alert('Receipt submitted for verification!');
    onClose();
  };
  
  const handleStripePayment = () => {
    // In a real app:
    // 1. Make an API call to your backend to create a Stripe Checkout Session for this course.
    // 2. Your backend returns a session URL.
    // 3. Redirect the user to the Stripe Checkout page: window.location.href = sessionUrl;
    console.log('Redirecting to Stripe for course:', course.title);
    alert('Redirecting to payment gateway...');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-2">Complete Payment For</h2>
        <p className="text-xl text-blue-600 mb-6">{course.title}</p>

        {/* Option 1: Payment Gateway (Stripe, etc.) */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Pay Instantly Online</h3>
          <button
            onClick={handleStripePayment}
            className="w-full flex items-center justify-center gap-3 rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            <CreditCard className="h-5 w-5"/>
            Pay with Credit Card
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
          <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">OR</span></div>
        </div>

        {/* Option 2: Manual Receipt Upload */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Pay via Bank Transfer</h3>
          <div className="text-sm bg-gray-50 p-4 rounded-md border">
            <p><strong>Account Name:</strong> My Awesome LMS Inc.</p>
            <p><strong>Account Number:</strong> 123-456-7890</p>
            <p><strong>Bank:</strong> Learning Bank</p>
            <p className="mt-2">After transferring, please upload the receipt below for verification.</p>
          </div>
          <form onSubmit={handleReceiptUpload} className="mt-4">
            <label htmlFor="receipt" className="block text-sm font-medium text-gray-700 mb-1">Upload Receipt</label>
            <input 
              type="file" 
              id="receipt" 
              name="receipt"
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
            />
            <div className="mt-6 flex justify-end gap-4">
              <button type="button" onClick={onClose} className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300">
                Cancel
              </button>
              <button type="submit" className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                <Upload className="h-4 w-4" /> Submit for Verification
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


// --- The Main Dashboard Page Component ---
export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState(null);

  // In a real app, 'studentName' would come from the user's session
  const studentName = "Alex";
  const activeCourses = mockCourses.filter(c => c.status === 'active');

  const handleOpenPaymentModal = (course) => {
    setSelectedCourseForPayment(course);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourseForPayment(null);
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {studentName}!</h1>
            <p className="text-lg text-gray-600">You have {activeCourses.length} active courses. Keep up the great work!</p>
          </div>

          {/* Main Content: Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCourses.map((course) => (
              <CourseCard key={course.id} course={course} onPay={handleOpenPaymentModal} />
            ))}
          </div>

          {/* Call to Action for new courses */}
          <div className="mt-12 text-center">
             <Link href="/courses" className="inline-block rounded-md bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg ring-1 ring-inset ring-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all">
                Explore New Courses
              </Link>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      {isModalOpen && <PaymentModal course={selectedCourseForPayment} onClose={handleCloseModal} />}
    </>
  );
}