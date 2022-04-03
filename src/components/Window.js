import React from 'react';

import './Window.scss';

const WindowContext = React.createContext();

class Window extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(props, state) {
        if (state.activeTab) {
            return null;
        }
        return {
            activeTab: props.activeTab,
        };
    }

    switchTab = function(e) {
        this.setState({
            activeTab: e.target.dataset.id,
        });
    }.bind(this);

    renderTabHeader() {
        var tabs = [];
        React.Children.forEach(this.props.children, function(child, i) {
            if (child.type?.name === 'Tab') {
                var className = 'tab';
                if (this.state.activeTab === child.props.id) {
                    className += ' active';
                }
                tabs.push(
                    <div key={child.props.id} data-id={child.props.id} className={className} onClick={this.switchTab}>{child.props.header ?? child.props.id}</div>
                );
            }
        }.bind(this));
        return (
            <div className="window-tabs">
                {tabs}
            </div>
        );
    }

    render() {
        return (
            <WindowContext.Provider value={{activeTab: this.state.activeTab}}>
                <div className="window-container">
                    {this.renderTabHeader()}
                    <div className="window">
                        {this.props.children}
                    </div>
                </div>
            </WindowContext.Provider>
        );
    }
}

class Tab extends React.Component {
    static contextType = WindowContext;

    render() {
        if (this.context?.activeTab !== this.props.id) {
            return null;
        }
        return (
            <div className={'tab-' + this.props.id}>
                {this.props.children}
            </div>
        );
    }
}

export { Window as default, Tab };
