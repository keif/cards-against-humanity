import React from 'react'

const Status = ({className, message}: { className?: string, message: string }) => {
    // An empty message keeps the bar's space (so the hand below doesn't jump) but hides the empty bar.
    const empty = message.trim() === '';
    return (
        <div aria-hidden={empty || undefined} className={`w-4/5 min-h-10 py-2 leading-snug bg-table text-paper text-center font-bold text-[15px] rounded-b-lg px-3 break-words ${empty ? 'invisible' : ''} ${className || ''}`}>
            {message}
        </div>
    );
}

export default Status;
