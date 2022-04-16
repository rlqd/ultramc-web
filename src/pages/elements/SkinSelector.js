import React from 'react';

import './SkinSelector.scss';

export default class SkinSelector extends React.Component {

    selectSkin = async function(e) {
        var currentId = this.props.user.selectedSkin?.id || '';
        var newId = e.currentTarget.dataset.skin;
        if (currentId == newId) {
            return;
        }
        var res = await this.props.user.selectSkin(newId);
        if (res !== true) {
            alert('Ошибка: ' + res);
        }
    }.bind(this);

    uploadSkin = async function(e) {
        if (e.target.files.length !== 1) {
            return;
        }
        var res = await this.props.user.uploadSkin(e.target.files[0]);
        if (res !== true) {
            alert('Ошибка: ' + res);
        }
    }.bind(this);

    renderSkinButtons() {
        var buttons = [];

        var hasSelected = false;
        for (var skin of this.props.user.data.skins) {
            if (skin.selected) {
                hasSelected = true;
            }
            buttons.push(
                <div key={'skin' + skin.id} className={'skin-button' + (skin.selected ? ' active' : '')} data-skin={skin.id} onClick={this.selectSkin}>
                    <div className="skin-face" style={{backgroundImage: 'url(' + skin.url + ')'}}></div>
                </div>
            );
        }

        buttons.push(
            <div key="skin-default" className={'skin-button' + (hasSelected ? '' : ' active')} data-skin="" onClick={this.selectSkin}>
                <div className="skin-face" style={{backgroundImage: 'url(/default_skin.png)'}}></div>
            </div>
        );
        return buttons;
    }

    render() {
        return (
            <div className="skin-selector">
                {this.renderSkinButtons()}
                <label className="skin-button" htmlFor="skin-upload" accept=".png">
                    <div className="skin-add">+</div>
                    <input type="file" id="skin-upload" onChange={this.uploadSkin} />
                </label>
            </div>
        );
    }
}
