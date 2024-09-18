import React from "react";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, ref }) => {
    return (
        <button
            ref={ref}
            onClick={onClick}
            className="block mb-2.5 px-4 py-2.5 text-base cursor-pointer rounded bg-[#002F21] text-gray-200 hover:bg-[#099d71] hover:text-[#F1F2F5] transition-colors duration-300"
        >
            {children}
        </button>
    );
};

export default Button;
