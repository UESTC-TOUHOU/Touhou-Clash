import React, { PureComponent } from 'react';
import { Zap } from 'react-feather';

import Loading from '~/components/Loading';

import Button from './Button';
import Input from './Input';
import SwitchThemed from './SwitchThemed';
import ToggleSwitch from './ToggleSwitch';

const noop = () => {
  /* empty */
};

const paneStyle = {
  padding: '20px 0',
};

const optionsRule = [
  { label: 'Global', value: 'Global' },
  { label: 'Rule', value: 'Rule' },
  { label: 'Direct', value: 'Direct' },
];

const Pane = ({ children, style }) => <div style={{ ...paneStyle, ...style }}>{children}</div>;

function useToggle(initialState = false) {
  const [onoff, setonoff] = React.useState(initialState);
  const handleChange = React.useCallback(() => {
    setonoff((x) => !x);
  }, []);
  return [onoff, handleChange];
}

function SwitchExample() {
  const [checked, handleChange] = useToggle(false);
  return <SwitchThemed checked={checked} onChange={handleChange} />;
}

class StyleGuide extends PureComponent {
  render() {
    return (
      <div>
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'style' is missing in type '{ children: E... Remove this comment to see the full error message */}
        <Pane>
          <SwitchExample />
        </Pane>
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'style' is missing in type '{ children: E... Remove this comment to see the full error message */}
        <Pane>
          <Input />
        </Pane>
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'style' is missing in type '{ children: E... Remove this comment to see the full error message */}
        <Pane>
          <ToggleSwitch name="test" options={optionsRule} value="Rule" onChange={noop} />
        </Pane>
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'style' is missing in type '{ children: E... Remove this comment to see the full error message */}
        <Pane>
          <Button text="Test Latency" start={<Zap size={16} />} />
          <Button text="Test Latency" start={<Zap size={16} />} isLoading />
          <Button label="Test Latency" />
          <Button label="Button Plain" kind="minimal" />
        </Pane>
        <Pane style={{ paddingLeft: 20 }}>
          <Loading />
        </Pane>
      </div>
    );
  }
}

export default StyleGuide;
