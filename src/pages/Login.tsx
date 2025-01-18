import { useState } from 'react';
import type UserManager from '../UserManager';
import { getErrorMessage } from "../utils";
import Window from '../components/Window';
import Input from '../components/Input';
import FooterDownload from './elements/FooterDownload';

import styles from './Login.module.scss';

const errorMap: Record<string,string> = {
    missingParameters: 'Заполните поля Логин и Пароль',
    userNotFound: 'Пользователь не найден',
    incorrectPassword: 'Пароль не совпадает',
    unknownError: 'Неизвестная ошибка',
};

export default function Login({userManager}: {userManager: UserManager}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('name') && data.get('password')) {
            setLoading(true);
            userManager.authenticate(data.get('name') as string, data.get('password') as string)
                .catch(e => setError(getErrorMessage(e, errorMap)))
                .finally(() => setLoading(false));
        } else {
            setError(errorMap.missingParameters);
        }
    };

    return (
        <Window cssMaxWidth='560px' footer={<FooterDownload />} className={loading ? 'loading-overlay' : undefined}>
            <div className={styles.hello}>Добро пожаловать</div>
            <form onSubmit={handleSubmit} inert={loading}>
                <Input label="Логин" name="name" type="text" />
                <Input label="Пароль" name="password" type="password" />
                <Input type="submit" name="submit" value="Войти" />
                {error && <Input.Hint text={error} />}
            </form>
        </Window>
    );
}
