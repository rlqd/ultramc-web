import React from 'react';
import { SkinViewer, IdleAnimation, WalkingAnimation, RunningAnimation, FlyingAnimation, createOrbitControls } from 'skinview3d';

import './SkinPreview.scss';

export default class SkinPreview extends React.Component {

    skinViewer;
    animations = {
        idle: ['Стоит', IdleAnimation],
        walk: ['Идет', WalkingAnimation],
        run: ['Бежит', RunningAnimation],
        fly: ['Летит', FlyingAnimation],
    };
    currentAnimation;

    constructor(props) {
        super(props);
        this.state = {
            animation: 'idle',
            paused: false,
        };
    }

    componentDidMount() {
        this.skinViewer = new SkinViewer({
            canvas: document.getElementById('skin-container'),
            width: 350,
            height: 350,
            skin: this.props.skinUrl || '/default_skin.png',
        });
        let control = createOrbitControls(this.skinViewer);
	    control.enableRotate = true;

        this.skinViewer.animations.speed = 0.6;
        this.currentAnimation = this.skinViewer.animations.add(this.animations[this.state.animation][1]);
    }

    componentDidUpdate(prevProps) {
        if (this.props.skinUrl !== prevProps.skinUrl) {
            this.skinViewer.loadSkin(this.props.skinUrl || '/default_skin.png');
        }
    }

    runAnimation = function(e) {
        this.setState({
            animation: e.target.dataset.key,
            paused: false,
        });
        this.currentAnimation.resetAndRemove();
        this.currentAnimation = this.skinViewer.animations.add(this.animations[e.target.dataset.key][1]);
        this.skinViewer.animations.paused = false;
    }.bind(this);

    pauseAnimation = function() {
        var paused = !this.state.paused;
        this.setState({ paused });
        this.skinViewer.animations.paused = paused;
    }.bind(this);

    renderAnimationButtons() {
        var buttons = [];
        for (var key in this.animations) {
            var className = 'animation-button';
            if (this.state.animation === key) {
                className += ' active';
            }
            buttons.push(
                <div key={'anim-btn-' + key} className={className} onClick={this.runAnimation} data-key={key}>{this.animations[key][0]}</div>
            );
        }
        var classNamePause = 'animation-button';
        if (this.state.paused) {
            classNamePause += ' active';
        }
        buttons.push(
            <div key="anim-btn-pause" className={classNamePause} onClick={this.pauseAnimation}>Пауза</div>
        );
        return buttons;
    }

    render() {
        return (
            <div className="skin-preview">
                <canvas id="skin-container"></canvas>
                <div className="skin-buttons">
                    {this.renderAnimationButtons()}
                </div>
            </div>
        );
    }
}
