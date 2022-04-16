import React from 'react';
import { InputGroup } from '../components/Forms';
import SkinPreview from '../components/SkinPreview';
import Window, { Tab } from '../components/Window';
import FooterDownload from './elements/FooterDownload';
import SkinSelector from './elements/SkinSelector';

import './Profile.scss';

export default class Profile extends React.Component {

    getActiveTab() {
        if (this.props.user.data.passwordResetRequired) {
            return 'account';
        }
        return 'skin';
    }

    render() {
        return (
            <div className="content content-profile">
                <Window activeTab={this.getActiveTab()}>
                    <Tab id="account" header="Аккаунт">
                        <div>Привет, {this.props.user.data.name}!</div>
                        <InputGroup type="button" value="Выйти" style={{maxWidth: '100%'}} onClick={this.props.user.logout} />
                    </Tab>
                    <Tab id="skin" header="Скин">
                        <div className="profile-panel" style={{flexShrink: 0}}>
                            <SkinPreview skinUrl={this.props.user.selectedSkin?.url} />
                        </div>
                        <div className="profile-panel" style={{flexShrink: 1}}>
                            <SkinSelector user={this.props.user} />
                        </div>
                    </Tab>
                </Window>
                <FooterDownload />
            </div>
        );
    }
}
