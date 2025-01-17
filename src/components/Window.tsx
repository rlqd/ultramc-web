import React from "react";
import { useState } from "react";
import { isExpectedElement } from "../utils";

import styles from "./Window.module.scss";

interface WindowProps {
    activeTab?: string;
    cssMaxWidth: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

interface TabProps {
    id: string;
    children: React.ReactNode;
    header?: string;
    className?: string;
}

export default function Window(props: WindowProps) {
    const [activeTab, setActiveTab] = useState(props.activeTab);

    const tabHeaders = React.Children.map(props.children, child => {
        if (!isExpectedElement(child, Tab)) {
            return null;
        }
        return (
            <div
                key={child.props.id}
                data-id={child.props.id}
                data-active={child.props.id === activeTab ? 'true' : 'false'}
                className={styles.tab}
                onClick={e => setActiveTab(e.currentTarget.dataset.id)}
            >
                {child.props.header ?? child.props.id}
            </div>
        );
    });

    const content = React.Children.map(props.children, child => {
        if (!isExpectedElement(child, Tab)) {
            return child;
        }
        if (child.props.id !== activeTab) {
            return null;
        }
        return child;
    });

    return (
        <div className="content" style={{maxWidth: props.cssMaxWidth}}>
            <div className={styles.tabs}>{tabHeaders}</div>
            <div className={styles.window}>{content}</div>
            {props.footer}
        </div>
    );
}

function Tab(props: TabProps) {
    return <div className={props.className}>
        {props.children}
    </div>;
}
Window.Tab = Tab;
