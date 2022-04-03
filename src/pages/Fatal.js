import React from 'react';
import Window from '../components/Window';

import './Fatal.scss';

export default class Fatal extends React.Component {

    render() {
        return (
            <div className="content" style={{maxWidth: '500px'}}>
                <Window>
                    <div className="app-error">Ошибка: {this.props.error}</div>
                </Window>
            </div>
        );
    }
}
