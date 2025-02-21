import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3 select-none">
      <img
        src="/lumaa-indigo.svg"
        alt="Lumaa Logo"
        width="40"
        height="40"
        className="w-10 h-10"
      />
      <h3 className="text-primary text-2xl font-bold">Lumaa</h3>
    </div>
  );
};

export default Logo;
