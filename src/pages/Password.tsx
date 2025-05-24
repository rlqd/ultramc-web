import { useState } from 'react';
import { useNavigate } from 'react-router';
import type UserManager from '../UserManager';
import { getErrorMessage } from "../utils";
import Window from '../components/Window';
import Input from '../components/Input';

const errorMap: Record<string,string> = {
    missingParameters: 'Заполните все поля',
    incorrectPassword: 'Пароль не совпадает',
    unknownError: 'Неизвестная ошибка',
    newPasswordMismatch: 'Новые пароли не совпадают',
    newPasswordTooWeak: 'Новый пароль слишком простой (мин. 8 символов)',
};

export default function Password({userManager}: {userManager: UserManager}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const isFilled = data.get('newPassword') && data.get('newPasswordRepeat')
            && (userManager.userData.passwordResetRequired || data.get('oldPassword'));
        if (isFilled) {
            setLoading(true);
            userManager.changePassword(
                data.get('newPassword') as string,
                data.get('newPasswordRepeat') as string,
                data.get('oldPassword') as string|null,
            )
            .then(() => navigate('/'))
            .catch(e => setError(getErrorMessage(e, errorMap)))
            .finally(() => setLoading(false));
        } else {
            setError(errorMap.missingParameters);
        }
    };

    return (
        <Window cssMaxWidth='800px' className={loading ? 'loading-overlay' : undefined}>
            <form onSubmit={handleSubmit} inert={loading}>
                { userManager.userData.passwordResetRequired
                    ? (<center>Ваш пароль был сброшен!<br />Необходимо установить новый пароль.</center>)
                    : (<Input label="Старый пароль" name="oldPassword" type="password" />) }
                <Input label="Новый пароль" name="newPassword" type="password" />
                <Input label="Новый еще раз" name="newPasswordRepeat" type="password" />
                <Input type="submit" name="submit" value="Сменить пароль" main />
                { userManager.userData.passwordResetRequired ? null : (<Input type="route" name="Назад" />) }
                {error && <Input.Hint text={error} />}
            </form>
        </Window>
    );
}
