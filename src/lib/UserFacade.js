import axios from 'axios';

export default class UserFacade {

    constructor(appComponent, user, requestCallbacks = null) {
        this.app = appComponent;
        this.data = user;
        this.requestCallbacks = requestCallbacks;
    }

    _syncState() {
        this.app.setState({
            loggedIn: !!this.data,
            user: this.data,
        });
    }

    authenticate = async function(username, password) {
        var result = true;
        this.requestCallbacks && this.requestCallbacks.start();
        try {
            var resp = await axios.post('/api/web/login.php', {username, password});
            if (resp.data.success) {
                this.data = resp.data.user;
                this._syncState();
            } else {
                result = resp.data.error;
            }
        } catch(e) {
            result = String(e);
        }
        this.requestCallbacks && this.requestCallbacks.done();
        return result;
    }.bind(this);

    logout = async function() {
        this.requestCallbacks && this.requestCallbacks.start();
        try {
            axios.post('/api/web/logout.php');
            this.data = null;
            this._syncState();
        } catch(e) {
            alert(String(e));
        }
        this.requestCallbacks && this.requestCallbacks.done();
    }.bind(this);

    get selectedSkin() {
        var selected = this.data.skins.filter(s => s.selected);
        return selected.length > 0 ? selected[0] : null;
    }

    uploadSkin = async function(file) {
        var result = true;
        this.requestCallbacks && this.requestCallbacks.start();
        try {
            var form = new FormData();
            form.append('skin', file);
            var resp = await axios.post('/api/web/update-skin.php', form);
            if (resp.data.success) {
                if (resp.data.skin.selected) {
                    for (var skin of this.data.skins) {
                        skin.selected = false;
                    }
                }
                this.data.skins.unshift(resp.data.skin);
                this._syncState();
            } else {
                result = resp.data.error;
            }
        } catch(e) {
            result = String(e);
        }
        this.requestCallbacks && this.requestCallbacks.done();
        return result;
    }.bind(this);

    selectSkin = async function(skinId) {
        var result = true;
        this.requestCallbacks && this.requestCallbacks.start();
        try {
            var form = new FormData();
            if (skinId) {
                form.append('skinId', skinId);
            } else {
                form.append('deselect', 1);
            }
            var resp = await axios.post('/api/web/update-skin.php', form);
            if (resp.data.success) {
                for (var skin of this.data.skins) {
                    skin.selected = skin ? skin.id == skinId : false;
                }
                this._syncState();
            } else {
                result = resp.data.error;
            }
        } catch(e) {
            result = String(e);
        }
        this.requestCallbacks && this.requestCallbacks.done();
        return result;
    }.bind(this);
}
