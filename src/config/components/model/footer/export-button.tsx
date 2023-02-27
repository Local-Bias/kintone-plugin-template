import React, { FC, memo, useState } from 'react';
import { useRecoilCallback } from 'recoil';
import { IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { PLUGIN_NAME } from '@/common/static';
import { storageState } from '../../../states/plugin';
import { useSnackbar } from 'notistack';

const Component: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);

  const onClick = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        try {
          setLoading(true);
          const storage = await snapshot.getPromise(storageState);
          const blob = new Blob([JSON.stringify(storage, null)], {
            type: 'application/json',
          });
          const url = (window.URL || window.webkitURL).createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `${PLUGIN_NAME}-config.json`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          enqueueSnackbar('プラグインの設定情報をエクスポートしました', { variant: 'success' });
        } catch (error) {
          enqueueSnackbar(
            'プラグインの設定情報のエクスポートに失敗しました。プラグイン開発者にお問い合わせください。',
            { variant: 'error' }
          );
          throw error;
        } finally {
          setLoading(false);
        }
      },
    []
  );

  return (
    <Tooltip title='プラグイン設定をエクスポート'>
      <IconButton disabled={loading} onClick={onClick}>
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default memo(Component);
