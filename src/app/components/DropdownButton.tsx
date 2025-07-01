"use client";

import React, {
  useState,
  useRef,
  useEffect,
  PropsWithChildren,
  ReactNode,
} from "react";

interface DropdownButtonProps {
  data: { title: ReactNode | string; onClick: () => void }[];
  preventClickBubbling?: boolean;
}

export const DropdownButton: React.FC<
  PropsWithChildren<DropdownButtonProps>
> = ({ data, preventClickBubbling = false, children }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (preventClickBubbling) {
      e.stopPropagation();
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      ref={menuRef}
    >
      <button
        onClick={handleClick}
        className="border-none bg-none cursor-pointer text-2xl"
      >
        {children}
      </button>
      {open && (
        <div className="absolute top-[30px] right-0 border border-gray-300 bg-white rounded-md shadow-md z-1000 p-2 min-w-40">
          {data.map(({ title, onClick }, index) => (
            <button
              key={index}
              onClick={(e) => {
                if (preventClickBubbling) e.stopPropagation();
                onClick();
              }}
              className="w-full p-2 text-left cursor-pointer"
            >
              {title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
