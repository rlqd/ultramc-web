import React, { type JSXElementConstructor } from "react";

export function isExpectedElement<P>(
    obj: unknown,
    expected: JSXElementConstructor<P>
): obj is React.ReactElement<P> {
    if (!React.isValidElement<P>(obj)) {
        return false;
    }
    if (obj.type === expected) {
        return true;
    }
    // In DEV mode compare function names due to proxy types in hot reload
    if (import.meta.env.DEV && (obj.type as JSXElementConstructor<P>).name === expected.name) {
        return true;
    }
    return false;
}

export function getErrorMessage(err: unknown, map: Record<string,string> = {}): string {
    if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
        return map[err.message] ?? err.message;
    }
    return String(err) || 'Неизвестная ошибка';
}
