import Window from '../components/Window';
import styles from './Error.module.scss';

export default function Error({message}: {message: string}) {
    return (
        <Window cssMaxWidth='500px'>
            <div className={styles.error}>Ошибка: {message}</div>
        </Window>
    );
}
