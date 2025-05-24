import { useState } from 'react';
import { useNavigate } from 'react-router';
import type UserManager from '../UserManager';
import { getErrorMessage } from "../utils";
import Window from '../components/Window';
import Input from '../components/Input';

const errorMap: Record<string,string> = {
    missingParameters: 'Заполните все поля',
    unknownError: 'Неизвестная ошибка',
};

export default function Mojang({userManager}: {userManager: UserManager}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('mojangUsername')) {
            setLoading(true);
            userManager.linkMojang(data.get('mojangUsername') as string)
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
                <center>Введите никнейм лицензионного аккаунта. Этот аккаунт сможет заходить на сервера Ultra из стороннего лаунчера.</center>
                <Input label="Никнейм" name="mojangUsername" type="text" />
                <Input type="submit" name="submit" value="Привязать аккаунт" main />
                { userManager.userData.passwordResetRequired ? null : (<Input type="route" name="Назад" />) }
                {error && <Input.Hint text={error} />}
            </form>
        </Window>
    );
}
