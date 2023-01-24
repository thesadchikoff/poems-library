
import React, {useEffect} from 'react';
import styles from './Premium.module.scss'
import {seo} from "../../helpers/seo.js";
const Premium = () => {
    useEffect(() => {
        seo({
            title: 'Премиум подписка',
        })
    }, [])
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.premiumInfoBlock} desktop:w-[600px] w-full`}>
                <h1>Premium</h1>
                <div>

                </div>
            </div>
        </div>
    );
};


export default Premium;