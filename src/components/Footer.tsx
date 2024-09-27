import React from 'react';

export default function Footer() {
  return (
    <footer className=" text-cyan-200/50 py-4">
      <div className="container mx-auto text-center text-sm">
        <p>
          by{' '}
          <a 
            href="https://github.com/natanael-lima" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-cyan-600 hover:text-cyan-500 font-semibold"
          >
            Natanael Lima
          </a>
        </p>
      </div>
    </footer>
  );
}
