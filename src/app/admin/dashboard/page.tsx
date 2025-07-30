// app/admin/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { Users, BookCopy, DollarSign, Clock, Check, X, Eye } from 'lucide-react';

// --- Mock Data (Replace with API calls) ---
const mockStats = {
  totalRevenue: 12550,
  totalStudents: 780,
  totalCourses: 45,
  pendingApprovals: 3,
};

const mockPendingPayments = [
  { id: 1, student: 'Charlie Brown', course: 'Advanced Tailwind CSS', date: '2023-10-27', receiptUrl: '#' },
  { id: 2, student: 'Lucy van Pelt', course: 'Data Science with Python', date: '2023-10-26', receiptUrl: '#' },
  { id: 3, student: 'Linus van Pelt', course: 'Mastering PostgreSQL', date: '2023-10-25', receiptUrl: '#' },
];

const mockCourses = [
    { id: 1, title: 'Next.js for Beginners', students: 150, price: 49.99 },
    { id: 2, title: 'Mastering PostgreSQL', students: 85, price: 99.99 },
    { id: 7, title: 'DevOps Fundamentals', students: 120, price: 109.99 },
];

const mockStudents = [
    { id: 101, name: 'Snoopy', email: 'snoopy@example.com', joined: '2023-01-15', courses: 3 },
    { id: 102, name: 'Woodstock', email: 'woodstock@example.com', joined: '2023-02-20', courses: 1 },
];

// --- Sub-Components for Readability ---

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
    <div className={`rounded-full p-3 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ActionButton = ({ onClick, icon, text, color }) => (
    <button onClick={onClick} className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md ${color}`}>
        {icon} {text}
    </button>
);


// --- Main Dashboard Component ---
export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleApprove = (paymentId) => {
    // API Call to approve payment
    console.log(`Approving payment ${paymentId}`);
    alert(`Payment ${paymentId} approved!`);
  };

  const handleReject = (paymentId) => {
    // API Call to reject payment
    console.log(`Rejecting payment ${paymentId}`);
    alert(`Payment ${paymentId} rejected.`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'payments':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Pending Payment Approvals</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-3">Student</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPendingPayments.map(p => (
                    <tr key={p.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{p.student}</td>
                      <td className="p-3">{p.course}</td>
                      <td className="p-3">{p.date}</td>
                      <td className="p-3 flex justify-center items-center gap-2">
                          <a href={p.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1"><Eye size={16}/> View Receipt</a>
                          <ActionButton onClick={() => handleApprove(p.id)} icon={<Check size={16}/>} text="Approve" color="bg-green-100 text-green-800 hover:bg-green-200" />
                          <ActionButton onClick={() => handleReject(p.id)} icon={<X size={16}/>} text="Reject" color="bg-red-100 text-red-800 hover:bg-red-200" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'courses':
         return <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-xl font-bold mb-4">Manage Courses (UI Placeholder)</h3>{/* Table for courses */}</div>;
      case 'students':
        return <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-xl font-bold mb-4">Manage Students (UI Placeholder)</h3>{/* Table for students */}</div>;
      default: // overview
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<DollarSign className="text-green-600" />} title="Total Revenue" value={`$${mockStats.totalRevenue.toLocaleString()}`} color="bg-green-100" />
                <StatCard icon={<Users className="text-blue-600" />} title="Total Students" value={mockStats.totalStudents} color="bg-blue-100" />
                <StatCard icon={<BookCopy className="text-purple-600" />} title="Total Courses" value={mockStats.totalCourses} color="bg-purple-100" />
                <StatCard icon={<Clock className="text-yellow-600" />} title="Pending Approvals" value={mockStats.pendingApprovals} color="bg-yellow-100" />
            </div>
        );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          <button onClick={() => setActiveTab('overview')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            Overview
          </button>
          <button onClick={() => setActiveTab('payments')} className={`relative py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'payments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            Pending Payments
            {mockStats.pendingApprovals > 0 && <span className="absolute top-3 right-[-10px] ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{mockStats.pendingApprovals}</span>}
          </button>
          <button onClick={() => setActiveTab('courses')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'courses' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            Courses
          </button>
          <button onClick={() => setActiveTab('students')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'students' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            Students
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>{renderContent()}</div>
    </div>
  );
}