import cx from 'clsx';
import * as React from 'react';
import { ChevronDown, Zap } from 'react-feather';
import { useQuery } from 'react-query';

import * as proxiesAPI from '~/api/proxies';
import { fetchVersion } from '~/api/version';
import {
  getCollapsibleIsOpen,
  getHideUnavailableProxies,
  getLatencyTestUrl,
  getProxySortBy,
} from '~/store/app';
import { fetchProxies, getProxies, switchProxy } from '~/store/proxies';

import Button from '../Button';
import CollapsibleSectionHeader from '../CollapsibleSectionHeader';
import { connect, useStoreActions } from '../StateProvider';
import { useFilteredAndSorted } from './hooks';
import s0 from './ProxyGroup.module.scss';
import { ProxyList, ProxyListSummaryView } from './ProxyList';

const { createElement, useCallback, useMemo, useState, useEffect } = React;

function ZapWrapper() {
  return (
    <div className={s0.zapWrapper}>
      <Zap size={16} />
    </div>
  );
}

function ProxyGroupImpl({
  name,
  all: allItems,
  delay,
  hideUnavailableProxies,
  proxySortBy,
  proxies,
  type,
  now,
  isOpen,
  latencyTestUrl,
  apiConfig,
  dispatch,
}) {
  const all = useFilteredAndSorted(allItems, delay, hideUnavailableProxies, proxySortBy, proxies);

  const { data: version } = useQuery(['/version', apiConfig], () =>
    fetchVersion('/version', apiConfig)
  );

  const isSelectable = useMemo(
    () => ['Selector', version.meta && 'Fallback', version.meta && 'URLTest'].includes(type),
    [type, version.meta]
  );

  const {
    app: { updateCollapsibleIsOpen },
    proxies: { requestDelayForProxies },
  } = useStoreActions();

  const toggle = useCallback(() => {
    updateCollapsibleIsOpen('proxyGroup', name, !isOpen);
  }, [isOpen, updateCollapsibleIsOpen, name]);

  const itemOnTapCallback = useCallback(
    (proxyName) => {
      if (!isSelectable) return;
      dispatch(switchProxy(apiConfig, name, proxyName));
    },
    [apiConfig, dispatch, name, isSelectable]
  );
  const [isTestingLatency, setIsTestingLatency] = useState(false);
  const testLatency = useCallback(async () => {
    setIsTestingLatency(true);
    try {
      if (version.meta === true) {
        await proxiesAPI.requestDelayForProxyGroup(apiConfig, name, latencyTestUrl);
        await dispatch(fetchProxies(apiConfig));
      } else {
        await requestDelayForProxies(apiConfig, all);
        await dispatch(fetchProxies(apiConfig));
      }
    } catch (err) {}
    setIsTestingLatency(false);
  }, [all, apiConfig, dispatch, name, version.meta]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  return (
    <div className={s0.group}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: windowWidth > 768 ? 'start' : 'space-between',
        }}
      >
        <CollapsibleSectionHeader name={name} type={type} toggle={toggle} qty={all.length} />
        <div style={{ display: 'flex' }}>
          {windowWidth > 768 ? (
            <>
              <Button
                kind="minimal"
                onClick={toggle}
                className={s0.btn}
                title="Toggle collapsible section"
              >
                <span className={cx(s0.arrow, { [s0.isOpen]: isOpen })}>
                  <ChevronDown size={20} />
                </span>
              </Button>
              <Button
                title="Test latency"
                kind="minimal"
                onClick={testLatency}
                isLoading={isTestingLatency}
              >
                <ZapWrapper />
              </Button>
            </>
          ) : (
            <>
              <Button
                title="Test latency"
                kind="minimal"
                onClick={testLatency}
                isLoading={isTestingLatency}
              >
                <ZapWrapper />
              </Button>
              <Button
                kind="minimal"
                onClick={toggle}
                className={s0.btn}
                title="Toggle collapsible section"
              >
                <span className={cx(s0.arrow, { [s0.isOpen]: isOpen })}>
                  <ChevronDown size={20} />
                </span>
              </Button>
            </>
          )}
        </div>
      </div>
      {createElement(isOpen ? ProxyList : ProxyListSummaryView, {
        all,
        now,
        isSelectable,
        itemOnTapCallback,
      })}
    </div>
  );
}

export const ProxyGroup = connect((s, { name, delay }) => {
  const proxies = getProxies(s);
  const collapsibleIsOpen = getCollapsibleIsOpen(s);
  const proxySortBy = getProxySortBy(s);
  const hideUnavailableProxies = getHideUnavailableProxies(s);
  const latencyTestUrl = getLatencyTestUrl(s);

  const group = proxies[name];
  const { all, type, now } = group;
  return {
    all,
    delay,
    hideUnavailableProxies,
    proxySortBy,
    proxies,
    type,
    now,
    isOpen: collapsibleIsOpen[`proxyGroup:${name}`],
    latencyTestUrl,
  };
})(ProxyGroupImpl);
