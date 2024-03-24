import { createPortal } from "react-dom";

function Modal({ children, className }) {
  return createPortal(
    <div className="fixed inset-0 bg-gray-200/20 flex items-center backdrop-blur-sm justify-center z-[99999]">
      <div
        className={`flex flex-col gap-4 bg-[#2b1346] rounded-2xl w-[22rem] md:min-w-[47rem] overflow-y-auto md:min-h-[36rem] md:overflow-hidden ${className}`}
      >
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}

export default Modal;
