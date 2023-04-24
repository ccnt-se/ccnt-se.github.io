import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import styles from './styles.less';
import './styles.less';
import {history} from 'umi';
import {createFromIconfontCN, GithubFilled, PlayCircleFilled} from '@ant-design/icons';
import {Carousel, Col, Image, Row, Tooltip, Typography} from 'antd';
import {useIntl} from '@umijs/max';
import '@/services/tool/typings.d.ts';
import {listInfo} from '@/services/tool/api';

const {Paragraph} = Typography;

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3985552_xhu21628atl.js',
});

const ListItem: React.FC<{ info: API.Tool.Detail }> = ({info}) => {
  const {formatMessage} = useIntl();

  const iconSize = 32;
  const icons: { [key: string]: API.Tool.TagIcon } = {
    github: {
      tooltip: formatMessage({id: 'pages.toolList.githubIcon'}),
      icon: <GithubFilled style={{fontSize: `${iconSize}px`, color: '#000'}}/>,
    },
    video: {
      tooltip: formatMessage({id: 'pages.toolList.videoIcon'}),
      icon: <PlayCircleFilled style={{fontSize: `${iconSize}px`, color: '#c50000'}}/>,
    },
    docker: {
      tooltip: formatMessage({id: 'pages.toolList.dockerIcon'}),
      icon: <IconFont type="icon-docker" style={{fontSize: `${iconSize}px`, color: '#0db7ed'}}/>,
    },
    ideaPlugin: {
      tooltip: formatMessage({id: 'pages.toolList.ideaPluginIcon'}),
      icon: <IconFont type="icon-Idea" style={{fontSize: `${iconSize}px`}}/>,
    },
    compiledProduct: {
      tooltip: formatMessage({id: 'pages.toolList.compiledProduct'}),
      icon: (
        <IconFont
          type="icon-product-checked-fill"
          style={{fontSize: `${iconSize}px`, color: '#008600'}}
        />
      ),
    },
  };

  return (
    <div className={styles.listItem} onClick={() => history.push(`/tool/${info.name}`)}>
      <Row>
        {/* 内容区域 */}
        <Col lg={16} md={14} sm={24} xs={24} style={{padding: '20px 20px 20px 40px', maxHeight: 240}}>
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
          <Paragraph className={styles.listItemIntroduction} ellipsis={{rows: 3, expandable: false}}>
            {info.introduction}
          </Paragraph>
        </Col>

        {/* 图片区域 */}
        <Col lg={8} md={10} sm={24} xs={24} onClick={(event) => event.stopPropagation()}>
          <Carousel>
            {
              info.images?.map(url => (
                <div key={url}>
                  <Image src={`/data/tools/${info.name}/${url}`}/>
                </div>
              ))
            }
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};


const ToolList: React.FC = () => {
  const {locale} = useIntl();
  const [data, setData] = useState<API.Tool.ListInfo[]>([]);

  useEffect(() => {
    listInfo(locale)
      .then((data) => setData(data));
  }, []);

  return (
    <PageContainer title={false}>
      {data.map((item: any) => {
        return <ListItem key={item.name} info={item}/>;
      })}
    </PageContainer>
  );
};

export default ToolList;
