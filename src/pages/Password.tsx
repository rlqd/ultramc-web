import loc from '../loc';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type UserManager from '../UserManager';
import { getErrorMessage } from "../utils";
import Window from '../components/Window';
import Input from '../components/Input';

const errorMap: Record<string,string> = {
    missingParameters: loc`Please fill all fields`,
    incorrectPassword: loc`Password does not match`,
    unknownError: loc`Unknown error`,
    newPasswordMismatch: loc`New passwords does not match`,
    newPasswordTooWeak: loc`New password is too easy (min. 8 characters)`,
};

export default function Password({userManager, forceChange}: {userManager: UserManager, forceChange: boolean}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const isFilled = data.get('newPassword') && data.get('newPasswordRepeat')
            && (forceChange || data.get('oldPassword'));
        if (isFilled) {
            setLoading(true);
            userManager.changePassword(
                data.get('newPassword') as string,
                data.get('newPasswordRepeat') as string,
                data.get('oldPassword') as string|null,
            )
            .then(() => !forceChange && navigate('/'))
            .catch(e => setError(getErrorMessage(e, errorMap)))
            .finally(() => setLoading(false));
        } else {
            setError(errorMap.missingParameters);
        }
    };

    return (
        <Window cssMaxWidth='800px' className={loading ? 'loading-overlay' : undefined}>
            <form onSubmit={handleSubmit} inert={loading}>
                { forceChange
                    ? (<center>{loc`Your password was reset!`}<br />{loc`It is required to set a new password.`}</center>)
                    : (<Input label={loc`Old password`} name="oldPassword" type="password" />) }
                <Input label={loc`New password`} name="newPassword" type="password" />
                <Input label={loc`New again`} name="newPasswordRepeat" type="password" />
                <Input type="submit" name="submit" value={loc`Change password`} main />
                { forceChange ? null : (<Input type="route" name={loc`Back`} />) }
                {error && <Input.Hint text={error} />}
            </form>
        </Window>
    );
}
