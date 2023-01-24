
import React from 'react';
import {Avatar} from "antd";

const UserInfo = ({id, avatar, name}) => {
    return (
        <a href={`/users/${id}`}>
            <div className='flex items-center gap-2'>
                <Avatar src={avatar ? avatar : ''}>
                    {name}
                </Avatar>
                <h1>{name}</h1>
            </div>
        </a>
    );
};

export default UserInfo;