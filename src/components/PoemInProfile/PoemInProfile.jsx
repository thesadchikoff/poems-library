
import React from 'react';
import {Divider} from "antd";
import {AiOutlineEye} from "react-icons/ai";

const PoemInProfile = ({title, category, createdAt, views}) => {
    const dateFormat = new Intl.DateTimeFormat('ru', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    })
    return (
        <div className='w-full rounded border p-3'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold opacity-80'>
                    {title}
                </h1>
                <span className='font-medium opacity-50'>
                    {category}
                </span>
            </div>
            <Divider />
            <div className='flex items-center justify-between'>
                <span className='text-xs font-semibold opacity-70'>
                    {dateFormat.format(createdAt)}
                </span>
                <div className='flex items-center gap-2 text-gray-500 text-xs font-semibold'>
                    <AiOutlineEye />
                    <span>{views}</span>
                </div>
            </div>
        </div>
    );
};

export default PoemInProfile;