import React from 'react';

import './Fatal.scss';

export default class Fatal extends React.Component {

    render() {
        return (
            <div className="content" style={{maxWidth: '500px'}}>
                <div className="app-error">Ошибка: {this.props.error}</div>
            </div>
        );
    }
}
