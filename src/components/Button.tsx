import cx from 'clsx';
import * as React from 'react';

import s0 from './Button.module.scss';
import { LoadingDot } from './shared/Basic';

const { forwardRef, useCallback } = React;

type ButtonInternalProps = {
  children?: React.ReactNode;
  label?: string;
  text?: string;
  start?: React.ReactNode | (() => React.ReactNode);
};

type ButtonProps = {
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => unknown;
  disabled?: boolean;
  kind?: 'primary' | 'minimal';
  className?: string;
  title?: string;
} & ButtonInternalProps;

function Button(props: ButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const {
    onClick,
    disabled = false,
    isLoading,
    kind = 'primary',
    className,
    children,
    label,
    text,
    start,
    ...restProps
  } = props;
  const internalProps = { children, label, text, start };
  const internalOnClick = useCallback(
    (e) => {
      if (isLoading) return;
      onClick && onClick(e);
    },
    [isLoading, onClick]
  );
  const btnClassName = cx(s0.btn, { [s0.minimal]: kind === 'minimal' }, className);
  return (
    <button
      className={btnClassName}
      ref={ref}
      onClick={internalOnClick}
      disabled={disabled}
      {...restProps}
    >
      {isLoading ? (
        <>
          <span style={{ display: 'inline-flex', opacity: 0 }}>
            <ButtonInternal {...internalProps} />
          </span>
          <span className={s0.loadingContainer}>
            <LoadingDot />
          </span>
        </>
      ) : (
        <ButtonInternal {...internalProps} />
      )}
    </button>
  );
}

function ButtonInternal({ children, label, text, start }: ButtonInternalProps) {
  return (
    <div className={s0.btnInternal}>
      {start && (
        <span className={s0.btnStart}>{typeof start === 'function' ? start() : start}</span>
      )}
      {children || label || text}
    </div>
  );
}

export default forwardRef(Button);
