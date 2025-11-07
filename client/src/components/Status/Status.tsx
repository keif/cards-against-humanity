import React from 'react'

const Status = ({className, message}: { className?: string, message: string }) => {
    return (
        <div className={`w-4/5 h-10 leading-10 bg-[#D8D8D8] text-[#6F6F6F] text-center rounded-b-lg ${className || ''}`}>
            {message}
        </div>
    );
}

export default Status;
