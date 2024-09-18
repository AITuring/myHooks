import React, { forwardRef } from "react";

interface CardProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
    content?: React.ReactNode;
    operation?: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ children, title, content, operation }, ref) => {
        const cardContent = (
            <div ref={ref} className="flex flex-col items-center justify-between p-5 w-90 h-125 rounded-lg border border-zinc-200 text-black overflow-y-auto cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300">
                {children ? (
                    children
                ) : (
                    <>
                        {title && <div className="font-bold text-2xl">{title}</div>}
                        {content && <div className="flex-grow my-4">{content}</div>}
                        {operation && <div className="">{operation}</div>}
                    </>
                )}
            </div>
        );

        return cardContent;
    }
);

Card.displayName = 'Card';

export default Card;
