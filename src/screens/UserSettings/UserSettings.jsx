
import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth.js";
import $api from "../../http/index.js";
import {Input, DatePicker, message } from "antd";
import Button from "../../components/Button/Button.jsx";
import dayjs from "dayjs";
import InputMask from 'react-input-mask';


const UserSettings = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const auth = useSelector(state => state.auth)
    const isAuth = useSelector(selectIsAuth)
    const [name, setName] = useState('')
    const [surname, setSurame] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [phone, setPhone] = useState('')
    const [birthDay, setBirthDay] = useState('')
    useEffect(() => {
        $api
            .get(`api/user/${id}`)
            .then(res => {
                setUser(res.data)
                setName(res.data.name)
                setSurame(res.data.surname)
                setEmail(res.data.email)
                setPhone(res.data.phones[0].number)
                setStatus(res.data.status)
                setBirthDay(res.data.birth_day)
            })
    }, [])
    if (!isAuth) {
        return <Navigate to={'/'}/>
    }
    if (user) {
        if (auth.status === 'loaded') {
            if (auth.item) {
                if (auth.item.id !== user.id) {
                    return<Navigate to={'/'}/>
                }
            }
        }
    }
    const saveValues = () => {
        const values = {
            name,
            surname,
            email,
            status
        }
        $api.put(`http://localhost:8080/api/user/${user.id}`, values).then(() => message.success('Информация успешно обновлена')).catch(() => () => message.error('Ошибка обновления данных. Попробуйте еще раз'))
    }
    const onChangeBirthDay = (date, dateString) => {
        setBirthDay(dateString.toString())
    }
    const otherValues = () => {
        const str = phone.replace(/[\(\)\s]/g,"");
        const formatNumber = parseInt(str)
        const values = {
            birth_day: birthDay,
            phone: formatNumber
        }
        $api.put(`http://localhost:8080/api/user/${user.id}`, values).then(() => message.success('Информация успешно обновлена')).catch(() => () => message.error('Ошибка обновления данных. Попробуйте еще раз'))
    }
    const birth = new Date(birthDay);
    const dateFormat = 'DD.MM.YYYY';
    return (
        <>
            {
                user &&
                <div className={'pb-10'}>
                    <h1 className={'pb-5 font-bold'}> Настройки пользователя {user.name} {user.surname}</h1>
                    <div className={'flex rounded desktop:flex-row mobile:flex-col shadow w-full h-max desktop:p-10 tablet:p-10 mobile:p-5 gap-5'}>
                        <div className={'flex destop:w-1/2 mobile:w-full flex-col h-max gap-5'}>
                            <h1 className={'flex font-bold'}>Основная информация</h1>
                            <div className={'flex flex-col gap-1'}>
                                <label className={'text-xs font-semibold opacity-80'}>Имя</label>
                                <Input placeholder="Укажите Ваше имя" value={name} allowClear onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className={'flex flex-col gap-1'}>
                                <label className={'text-xs font-semibold opacity-80'}>Фамилия</label>
                                <Input placeholder="Укажите Вашу фамилию" value={surname} allowClear onChange={(e) => setSurname(e.target.value)} />
                            </div>
                            <div className={'flex flex-col gap-1'}>
                                <label className={'text-xs font-semibold opacity-80'}>Почта</label>
                                <Input placeholder="Укажите Вашу почту" value={email} allowClear onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className={'flex flex-col gap-1'}>
                                <label className={'text-xs font-semibold opacity-80'}>Статус</label>
                                <Input placeholder="Придумайте свой собственный статус" value={status} allowClear onChange={(e) => setStatus(e.target.value)} />
                            </div>
                            <div className={'flex gap-4 items-center'}>
                                <Button onClick={saveValues}>Сохранить</Button>
                            </div>
                        </div>
                        <div className={'flex desctop:w-1/2 mobile:w-full flex-col h-max gap-5'}>
                            <h1 className={'flex font-bold'}>Прочая информация</h1>
                            <div className={'flex flex-col gap-1'}>
                                <label className={'text-xs font-semibold opacity-80'}>Дата рождения</label>
                                <DatePicker defaultValue={birthDay && dayjs(birth.toLocaleDateString(), dateFormat)} format={dateFormat} onChange={onChangeBirthDay}/>
                            </div>
                            <div className={'flex flex-col gap-1'}>
                                <label className={'text-xs font-semibold opacity-80'}>Номер телефона</label>
                                <InputMask mask="7 (999) 999 99 99" value={phone} onChange={(e) => setPhone(e.target.value)}>
                                    {(inputProps) => <Input {...inputProps} type="tel" allowClear />}
                                </InputMask>
                            </div>
                            <div className={'flex gap-4 items-center justify-between'}>
                                <div className={'mobile:hidden tablet:hidden desktop:block'}/>
                                <Button onClick={otherValues}>Сохранить</Button>
                            </div>
                            <div className={'flex flex-col gap-5'}>
                                <h1 className={'flex font-bold'}>Смена пароля</h1>
                                <label className={'text-xs font-semibold opacity-80'}>Новый пароль</label>
                                <DatePicker defaultValue={birthDay && dayjs(birth.toLocaleDateString(), dateFormat)} format={dateFormat} onChange={onChangeBirthDay}/>
                                <div className={'flex gap-4 items-center justify-between'}>
                                    <div className={'mobile:hidden tablet:hidden desktop:block'}/>
                                    <Button onClick={otherValues}>Сохранить</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </>
    );
};
export default UserSettings