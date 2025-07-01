import React, { useState, useRef, useEffect } from "react";

type MoreMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const MoreMenu: React.FC<MoreMenuProps> = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
        onClick={() => setOpen((prev) => !prev)}
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        ...
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: 0,
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            borderRadius: "4px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
            padding: "0.5rem 0",
            minWidth: "100px",
          }}
        >
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              border: "none",
              background: "none",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              border: "none",
              background: "none",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};
