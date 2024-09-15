import React from 'react';

export default function Footer() {
  return (
    <footer className=" text-teal-700/50 py-4">
      <div className="container mx-auto text-center text-sm">
        <p>
          by{' '}
          <a 
            href="https://github.com/natanael-lima" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-teal-700 hover:text-teal-900 font-semibold"
          >
            Natanael Lima
          </a>
        </p>
      </div>
    </footer>
  );
}
