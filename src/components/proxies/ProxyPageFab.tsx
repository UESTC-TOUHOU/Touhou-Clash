import * as React from 'react';
import { Zap } from 'react-feather';
import { useTranslation } from 'react-i18next';

import { useUpdateProviderItems } from '~/components/proxies/proxies.hooks';
import { Action, Fab, IsFetching, position as fabPosition } from '~/components/shared/Fab';
import { RotateIcon } from '~/components/shared/RotateIcon';
import { requestDelayAll } from '~/store/proxies';
import { DispatchFn, FormattedProxyProvider } from '~/store/types';
import { ClashAPIConfig } from '~/types';

const { useState, useCallback } = React;

function StatefulZap({ isLoading }: { isLoading: boolean }) {
  return isLoading ? (
    <IsFetching>
      <Zap width={16} height={16} />
    </IsFetching>
  ) : (
    <Zap width={16} height={16} />
  );
}

function useTestLatencyAction({
  dispatch,
  apiConfig,
}: {
  dispatch: DispatchFn;
  apiConfig: ClashAPIConfig;
}): [() => unknown, boolean] {
  const [isTestingLatency, setIsTestingLatency] = useState(false);
  const requestDelayAllFn = useCallback(() => {
    if (isTestingLatency) return;

    setIsTestingLatency(true);
    dispatch(requestDelayAll(apiConfig)).then(
      () => setIsTestingLatency(false),
      () => setIsTestingLatency(false)
    );
  }, [apiConfig, dispatch, isTestingLatency]);
  return [requestDelayAllFn, isTestingLatency];
}

export function ProxyPageFab({
  dispatch,
  apiConfig,
  proxyProviders,
}: {
  dispatch: DispatchFn;
  apiConfig: ClashAPIConfig;
  proxyProviders: FormattedProxyProvider[];
}) {
  const { t } = useTranslation();
  const [requestDelayAllFn, isTestingLatency] = useTestLatencyAction({
    dispatch,
    apiConfig,
  });

  const [updateProviders, isUpdating] = useUpdateProviderItems({
    apiConfig,
    dispatch,
    names: proxyProviders.map((item) => item.name),
  });

  return (
    <Fab
      icon={<StatefulZap isLoading={isTestingLatency} />}
      onClick={requestDelayAllFn}
      text={t('Test Latency')}
      style={fabPosition}
    >
      {proxyProviders.length > 0 ? (
        <Action text={t('update_all_proxy_provider')} onClick={updateProviders}>
          <RotateIcon isRotating={isUpdating} />
        </Action>
      ) : null}
    </Fab>
  );
}
