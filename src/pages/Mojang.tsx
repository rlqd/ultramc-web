import loc from '../loc';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type UserManager from '../UserManager';
import { getErrorMessage } from "../utils";
import Window from '../components/Window';
import Input from '../components/Input';

const errorMap: Record<string,string> = {
    missingParameters: loc`Please fill all fields`,
    unknownError: loc`Unknown error`,
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
                <center>{loc`Enter nickname of your license Minecraft account. This account will be able to join Ultra servers using any launcher.`}</center>
                <Input label={loc`Nickname`} name="mojangUsername" type="text" />
                <Input type="submit" name="submit" value={loc`Link account`} main />
                { userManager.userData.passwordResetRequired ? null : (<Input type="route" name={loc`Back`} />) }
                {error && <Input.Hint text={error} />}
            </form>
        </Window>
    );
}
