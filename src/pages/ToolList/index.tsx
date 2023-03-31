import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import styles from './styles.less';
import { history } from 'umi';
import { createFromIconfontCN, GithubFilled, PlayCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useIntl } from '@umijs/max';
import '@/services/tool/typings.d.ts';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3985552_xhu21628atl.js',
});

const ListItem: React.FC<{ info: API.Tool.Info }> = ({ info }) => {
  const { formatMessage, locale } = useIntl();

  const iconSize = 32;
  const icons: { [key: string]: API.Tool.TagIcon } = {
    github: {
      tooltip: formatMessage({ id: 'pages.toolList.githubIcon' }),
      icon: <GithubFilled style={{ fontSize: `${iconSize}px`, color: '#000' }} />,
    },
    video: {
      tooltip: formatMessage({ id: 'pages.toolList.videoIcon' }),
      icon: <PlayCircleFilled style={{ fontSize: `${iconSize}px`, color: '#c50000' }} />,
    },
    docker: {
      tooltip: formatMessage({ id: 'pages.toolList.dockerIcon' }),
      icon: <IconFont type="icon-docker" style={{ fontSize: `${iconSize}px`, color: '#0db7ed' }} />,
    },
    ideaPlugin: {
      tooltip: formatMessage({ id: 'pages.toolList.ideaPluginIcon' }),
      icon: <IconFont type="icon-Idea" style={{ fontSize: `${iconSize}px` }} />,
    },
    compiledProduct: {
      tooltip: formatMessage({ id: 'pages.toolList.compiledProduct' }),
      icon: (
        <IconFont
          type="icon-product-checked-fill"
          style={{ fontSize: `${iconSize}px`, color: '#008600' }}
        />
      ),
    },
  };

  const getIntroduction = (introduction: API.Tool.Info['introduction']): string => {
    console.log(typeof introduction);
    if (typeof introduction === 'string') {
      return introduction;
    } else if (typeof introduction === 'object') {
      const key = locale.replace('-', '_');
      console.log(key);
      switch (key) {
        case 'zh_CN':
          if (introduction.zh_CN) return introduction.zh_CN;
        case 'en_US':
          if (introduction.en_US) return introduction.en_US;
        default:
          return '';
      }
    }
    return '';
  };

  return (
    <div className={styles.listItem} onClick={() => history.push(`/tool/${info.name}`)}>
      <div className={styles.listItemTitle}>{info.name}</div>
      <div className={styles.listItemIconGroup}>
        {info.tagIcons.map((key: string) => {
          const icon = icons[key];
          return (
            <Tooltip title={icon.tooltip} key={key}>
              <span className={styles.listItemIcon}>{icon.icon}</span>
            </Tooltip>
          );
        })}
      </div>
      <div className={styles.listItemContent}>{getIntroduction(info.introduction)}</div>
    </div>
  );
};

const ToolList: React.FC = () => {
  const [data, setData] = useState<API.Tool.JSONData>({ tools: [] });

  useEffect(() => {
    fetch('/data/tools.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <PageContainer title={false}>
      {data.tools.map((item: any) => {
        return <ListItem key={item.name} info={item} />;
      })}
    </PageContainer>
  );
};

export default ToolList;
