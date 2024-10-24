"use client";

import React from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  onClose: () => void;
  title: string; // Title for the modal
  children: React.ReactNode; // Content of the modal
}

const Modal: React.FC<ModalProps> = ({ onClose, title, children }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-3/4 max-w-lg p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-black dark:text-white"
          >
            <IoClose className="h-8 w-8"/>
          </button>

          {/* Modal Title */}
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
            {title}
          </h2>

          {/* Modal Content */}
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
