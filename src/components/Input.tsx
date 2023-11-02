import React from 'react';

import s0 from './Input.module.scss';

const { useState, useRef, useEffect, useCallback } = React;

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={s0.input} {...props} />;
}

export function SelfControlledInput({ value, ...restProps }) {
  const [internalValue, setInternalValue] = useState(value);
  const refValue = useRef(value);
  useEffect(() => {
    if (refValue.current !== value) {
      // ideally we should only do this when this input is not focused
      setInternalValue(value);
    }
    refValue.current = value;
  }, [value]);
  const onChange = useCallback((e) => setInternalValue(e.target.value), [setInternalValue]);

  return <input className={s0.input} value={internalValue} onChange={onChange} {...restProps} />;
}
