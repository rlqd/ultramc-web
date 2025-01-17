import { useEffect, useState, useRef } from 'react';
import {
    SkinViewer,
    IdleAnimation,
    WalkingAnimation,
    RunningAnimation,
    FlyingAnimation,
} from 'skinview3d';

import styles from './SkinPreview.module.scss';

const animations = {
    idle: IdleAnimation,
    walk: WalkingAnimation,
    run: RunningAnimation,
    fly: FlyingAnimation,
};
type animationType = keyof typeof animations;
const animationNames: Record<string, string> = {
    idle: 'Стоит',
    walk: 'Идет',
    run: 'Бежит',
    fly: 'Летит',
};

export default function SkinPreview({skinUrl}: {skinUrl?: string}) {
    const [currentAnimation, setAnimation] = useState<animationType>('idle');
    const [paused, setPaused] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sv = useRef<SkinViewer>(null);

    useEffect(() => {
        if (sv.current) {
            sv.current.loadSkin(skinUrl || '/default_skin.png')
                .catch(e => console.warn(e));
            if (!(sv.current.animation instanceof animations[currentAnimation])) {
                sv.current.animation = new animations[currentAnimation]();
            }
            if (sv.current.animation) {
                sv.current.animation.paused = paused;
            }
        } else if (canvasRef.current) {
            sv.current = new SkinViewer({
                canvas: canvasRef.current,
                width: 350,
                height: 350,
                skin: skinUrl || '/default_skin.png',
                animation: new animations[currentAnimation](),
            });
        }
    }, [skinUrl, currentAnimation, paused]);

    const runAnimation = function(e: React.MouseEvent<HTMLDivElement>) {
        const targetAnimation = e.currentTarget.dataset.key as animationType;
        setAnimation(targetAnimation);
        setPaused(false);
    };

    const toggleAnimation = function() {
        setPaused(!paused);
    };

    const buttons: React.ReactNode[] = [];
    for (const key in animations) {
        let className = styles.animationButton;
        if (currentAnimation === key) {
            className += ` ${styles.active}`;
        }
        buttons.push(
            <div
                key={'anim-btn-' + key}
                className={className}
                onClick={runAnimation}
                data-key={key}
            >{animationNames[key]}</div>
        );
    }
    buttons.push(
        <div
            key="anim-btn-pause"
            className={styles.animationButton + (paused ? ` ${styles.active}` : '')}
            onClick={toggleAnimation}
        >Пауза</div>
    );

    return (
        <div className={styles.preview}>
            <canvas ref={canvasRef} id="skin-container"></canvas>
            <div className={styles.buttons}>
                {buttons}
            </div>
        </div>
    );
}
