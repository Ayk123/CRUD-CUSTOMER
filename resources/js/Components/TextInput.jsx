import { forwardRef, useEffect, useRef } from 'react';
import {Input} from "@nextui-org/react";

export default forwardRef(function TextInput({ type = 'text', classNames = '', label, isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <Input
            {...props}
            fullWidth
            variant='bordered'
            label ={label}
            type={type}
            classNames={classNames}
            ref={input}
        />
    );
});
