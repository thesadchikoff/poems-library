
import React from 'react';

const UserInfoItem = ({icon, val1, val2, date, styles, array}) => {
    const birth_day = new Date(date)
    const formatDate = new Intl.DateTimeFormat('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    })
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    let yo = (y) => /\d*1\d$/.test(y) || /[05-9]$/.test(y) ? ' лет' : ( /1$/.test(y) ? ' год' : ' года');
    return (
        <span className={`flex items-center gap-2`}>
            {icon}
            <b>{val1}:</b>{' '}
            <article>
                {array && array.map((item) => {
                    return item.number
                })}
            </article>
            <article className={`opacity-70 font-semibold ${styles}`}>
                {val2 ? val2 : `${formatDate.format(birth_day)} ( ${getAge(date) + yo(getAge(date))} )`}
            </article>
        </span>
    );
};

export default UserInfoItem;