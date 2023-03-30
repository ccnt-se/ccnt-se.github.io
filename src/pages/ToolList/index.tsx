import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import styles from './styles.less';
import {GithubFilled, PlayCircleFilled} from "@ant-design/icons";
import {Tooltip} from "antd";
import {createFromIconfontCN} from '@ant-design/icons';
import {useIntl} from '@umijs/max';
import '@/services/tool/typings.d.ts'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3985552_irhwiutnyrp.js',
});

const ListItem: React.FC<{ info: API.Tool.Info }> = ({info}) => {
  const {formatMessage} = useIntl();

  const iconSize: string = '32px';
  const icons: { [key: string]: API.Tool.TagIcon } = {
    github: {
      tooltip: formatMessage({id: 'pages.toolList.githubIcon'}),
      icon: <GithubFilled style={{fontSize: iconSize, color: '#000'}}/>
    },
    video: {
      tooltip: 'Video Demo',
      icon: <PlayCircleFilled style={{fontSize: iconSize, color: '#c50000'}}/>
    },
    docker: {
      tooltip: 'Docker Image Available',
      icon: <IconFont type="icon-docker" style={{fontSize: iconSize, color: '#0db7ed'}}/>
    },
    ideaPlugin: {
      tooltip: 'Idea Plugin Available',
      icon: <IconFont type="icon-Idea" style={{fontSize: iconSize}}/>
    }
  }

  return (
    <div className={styles.listItem}>
      <div className={styles.listItemTitle}>{info.name}</div>
      <div className={styles.listItemIconGroup}>
        {
          info.tagIcons.map((key: string) => {
            const icon = icons[key];
            return (
              <Tooltip title={icon.tooltip} key={key}>
                <span className={styles.listItemIcon}>{icon.icon}</span>
              </Tooltip>
            );
          })
        }
      </div>
      <div className={styles.listItemContent}>{info.description}</div>
    </div>
  );
};


const ToolList: React.FC = () => {

  const [data, setData] = useState<API.Tool.JSONData>({tools: []});

  useEffect(() => {
    fetch('/data/tools.json')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);


  return (
    <PageContainer title={false}>
      {
        data.tools.map((item: any) => {
          return <ListItem key={item.name} info={item}/>;
        })
      }
    </PageContainer>
  );
};

export default ToolList;
