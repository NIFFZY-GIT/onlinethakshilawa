// components/layout/Footer.tsx
export const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto py-6 text-center text-gray-600">
        <p>© {new Date().getFullYear()} ZEVARONE All rights reserved.</p>
      </div>
    </footer>
  );
};