import React from 'react'

export default function Footer() {
    return (
        <footer className="fixed bottom-0 w-full bg-gray-200 p-4">
          <p className="text-center text-gray-600">
            Website by Monisha &copy; {new Date().getFullYear()}
          </p>
        </footer>
      );
}
