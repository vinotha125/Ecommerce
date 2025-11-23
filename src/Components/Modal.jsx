import React from 'react';

const Modal = ({ isModalOpen, setIsModalOpen, children }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden max-h-[90vh]">
        <button
          className="absolute top-2 right-2 text-gray-400 text-2xl hover:text-gray-600"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </button>
        {/* Added max-height + overflow so content scrolls if too tall */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
