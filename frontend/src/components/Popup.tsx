import { ReactNode } from "react";

interface PopupProps {
  children: ReactNode;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ children, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="mt-2 bg-white p-6 w-96 relative">
        {children}
        <button
              className="w-full flex justify-center bg-neutral-700 px-4 py-3 font-semibold text-black hover:bg-black"
              onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
