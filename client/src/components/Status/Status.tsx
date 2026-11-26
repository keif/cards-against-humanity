import React from 'react'

const Status = ({className, message}: { className?: string, message: string }) => {
    return (
        <div className={`w-4/5 h-10 leading-10 bg-table text-paper text-center font-bold text-[15px] rounded-b-lg px-3 truncate ${className || ''}`}>
            {message}
        </div>
    );
}

export default Status;
