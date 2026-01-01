import { BuiltinRenderProps } from '@lobechat/types';
import { ActionIcon, PreviewGroup } from '@lobehub/ui';
import { Download } from 'lucide-react';
import { memo, useCallback } from 'react';
import { Flexbox } from 'react-layout-kit';

import { fileService } from '@/services/file';
import { DallEImageItem } from '@/types/tool/dalle';

import GalleyGrid from './GalleyGrid';
import ImageItem from './Item';

const DallE = memo<BuiltinRenderProps<DallEImageItem[]>>(({ content, messageId }) => {
  const handleDownload = useCallback(
    async (current: number) => {
      const id = content[current]?.imageId;
      if (!id) return;
      const { url, name } = await fileService.getFile(id);
      const link = document.createElement('a');
      link.href = url;
      link.download = name;
      link.click();
    },
    [content],
  );

  return (
    <Flexbox gap={16}>
      <PreviewGroup
        preview={{
          actionsRender: (_, info) => (
            <ActionIcon
              color={'#fff'}
              icon={Download}
              onClick={() => handleDownload(info.current)}
            />
          ),
        }}
      >
        <GalleyGrid items={content.map((c) => ({ ...c, messageId }))} renderItem={ImageItem} />
      </PreviewGroup>
    </Flexbox>
  );
});

export default DallE;
