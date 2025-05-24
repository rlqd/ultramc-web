
import styles from './MojangProfile.module.scss';

export default function MojangProfile({uuid}: {uuid: string}) {
    return (
        <div className={styles.profile}>
            <img style={{verticalAlign: 'middle'}} src={`https://crafthead.net/armor/bust/${uuid}/64`}/>
            <div>
                Mojang UUID:<br />
                <a href={`https://mcuuid.net/?q=${uuid}`}>{uuid}</a>
            </div>
        </div>
    );
}
