import * as React from 'react';
import ReactSwitch from 'react-switch';

import { State } from '~/store/types';

import { getTheme } from '../store/app';
import { connect } from './StateProvider';

// workaround https://github.com/vitejs/vite/issues/2139#issuecomment-802981228
// @ts-ignore
const Switch = ReactSwitch.default ? ReactSwitch.default : ReactSwitch;

function SwitchThemed({ checked = false, onChange, theme, name }) {
  const offColor = theme === 'dark' ? '#393939' : '#e9e9e9';
  const onColor = theme === 'dark' ? '#306081' : '#005caf';
  return (
    <Switch
      onChange={onChange}
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      offColor={offColor}
      onColor={onColor}
      offHandleColor="#fff"
      onHandleColor="#fff"
      handleDiameter={24}
      height={28}
      width={44}
      className="rs"
      name={name}
    />
  );
}

export default connect((s: State) => ({ theme: getTheme(s) }))(SwitchThemed);
