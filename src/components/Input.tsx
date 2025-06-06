import { Link } from 'react-router';
import styles from './Input.module.scss';

const defaultIdPrefix = 'form-input-';

type InputType = 'text' | 'password' | 'button' | 'submit' | 'link' | 'route';
const inputElements: Record<InputType, React.ComponentType<InputProps>> = {
    text: Text,
    password: Text,
    button: Button,
    submit: Button,
    link: AnchorLink,
    route: RouteLink,
};

interface InputProps {
    name: string;
    type: InputType;
    label?: string;
    value?: string;
    id?: string;
    style?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    main?: boolean;
}

export default function Input(props: InputProps) {
    const InputElement = inputElements[props.type];
    const inputId = props.id ?? (defaultIdPrefix + props.name);

    return (
        <div className={styles.inputGroup} style={props.containerStyle}>
            {props.label && <Label inputId={inputId} labelText={props.label} />}
            <InputElement {...props} />
        </div>
    );
}

Input.Hint = function Hint({text}: {text: string}) {
    return (
        <div className={styles.inputGroup}>
            <div className={styles.hint}>{text}</div>
        </div>
    );
}

function Label({inputId, labelText}: {inputId: string, labelText: string}) {
    return <label htmlFor={inputId}>{labelText}</label>;
}

function Button(props: InputProps) {
    return createHtmlInput(styles.button, props);
}

function Text(props: InputProps) {
    return createHtmlInput(styles.text, props);
}

function AnchorLink(props: InputProps) {
    return (
        <a href={props.value} className={styles.button} style={props.style}>{props.name}</a>
    );
}

function RouteLink(props: InputProps) {
    return (
        <Link className={styles.button} to={props.value ?? "/"} style={props.style}>{props.name}</Link>
    );
}

function createHtmlInput(className: string, props: InputProps) {
    const inputId = props.id ?? (defaultIdPrefix + props.name);

    return <input
        id={inputId}
        type={props.type}
        name={props.name}
        value={props.value}
        style={props.style}
        className={className + (props.main ? ` ${styles.main}` : '')}
    />;
}
