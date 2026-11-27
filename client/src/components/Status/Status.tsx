import React from 'react'

const Status = ({className, message}: { className?: string, message: string }) => {
    return (
        <div className={`w-4/5 min-h-10 py-2 leading-snug bg-table text-paper text-center font-bold text-[15px] rounded-b-lg px-3 break-words ${className || ''}`}>
            {message}
        </div>
    );
}

export default Status;
