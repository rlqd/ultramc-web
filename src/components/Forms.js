import React from 'react';
import IDFactory from '../lib/IDFactory';

import './Forms.scss';

const FormContext = React.createContext();

class Form extends React.Component
{
    formId;

    getFormId() {
        if (this.formId === undefined) {
            this.formId = IDFactory.createId('form');
        }
        return this.formId;
    }

    onInput = function(e) {
        if (!e.target.name) {
            return;
        }
        this.setState({
            [e.target.name]: e.target.value,
        });
    }.bind(this);

    getOnSubmit() {
        if (this.props.onSubmit) {
            return (e) => this.props.onSubmit(e, this.state);
        }
    }

    render() {
        return (
            <FormContext.Provider value={{ formId: this.getFormId(), onInput: this.onInput }}>
                <form id={this.getFormId()} action={this.props.action} method={this.props.method} onSubmit={this.getOnSubmit()}>
                    {this.props.children}
                </form>
            </FormContext.Provider>
        );
    }
}

class InputGroup extends React.Component
{
    static contextType = FormContext;
    inputId;

    getInputId() {
        if (this.inputId === undefined) {
            if (this.props.id) {
                this.inputId = this.props.id;
            } else if(this.props.name) {
                this.inputId = (this.context?.formId ?? 'input') + '-' + this.props.name;
            } else {
                var prefix = this.context?.formId;
                this.inputId = (prefix ? (prefix + '-') : '') + IDFactory.createId('input');
            }
        }
        return this.inputId;
    }

    render() {
        return (
            <div className="input-group">
                {this.renderLabel()}
                {this.renderInput()}
            </div>
        );
    }

    renderLabel() {
        if (this.props.label !== undefined) {
            return (
                <label htmlFor={this.getInputId()}>{this.props.label}</label>
            );
        }
        return null;
    }

    renderInput() {
        var inputType = this.props.type ?? 'text';
        var commonProps = {
            id: this.getInputId(),
            type: inputType,
        };
        if (this.context) {
            commonProps.onChange = this.context.onInput;
        }
        for (var prop of ['name', 'value', 'style', 'onClick']) {
            if (this.props[prop] !== undefined) {
                commonProps[prop] = this.props[prop];
            }
        }

        switch(inputType) {
            case 'hint':
                return (
                    <div className="input-hint">{this.props.value}</div>
                );

            case 'submit':
            case 'button':
                return (
                    <input {...commonProps} className="input-button"/>
                );

            default:
            case 'text':
            case 'password':
                return (
                    <input {...commonProps} className="input-text"></input>
                );
        }
    }
}

export {Form, InputGroup};
