import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import '@/services/tool/typings.d.ts';
import {history} from 'umi';
import {useIntl} from '@umijs/max';
import {useParams} from 'react-router';
import {getDetailByName} from "@/services/tool/api";
import type {TabsProps} from "antd";
import {Card, Carousel, Divider, Image, Tabs, Tooltip} from "antd";
import {FileImageOutlined, PlayCircleFilled} from "@ant-design/icons";
import styles from './styles.less';
import './styles.less';

const ImageCarousel: React.FC<{ name: string, images: API.Tool.Image[] }> = ({name, images}) => {
  return (
    <Carousel
      appendDots={(dots: any[]) =>
        <ul style={{margin: 0}}>
          {
            dots && dots.map(dot => {
                const title = images[dot.key].title;
                return title ? <Tooltip title={title} key={dot.key}>
                  {dot}
                </Tooltip> : dot
              }
            )
          }
        </ul>
      }
    >
      {
        images.map(img => (
          <div key={img.url}>
            <Image preview={{mask: false}} src={`/data/tools/${name}/${img.url}`}/>
          </div>
        ))
      }
    </Carousel>
  )
}

const TabItem: React.FC<{ title: string, color?: string, Icon: any }> = ({title, color, Icon}) => {
  return (
    <span style={{fontSize: '18px'}}>
      <Icon style={{fontSize: '24px', color}}/>
      {title}
    </span>
  );
};

const ToolDetail: React.FC = () => {

  const params = useParams();
  const {formatMessage, locale} = useIntl();
  const [detail, setDetail] = useState<API.Tool.Detail | undefined>(undefined)
  const [tabs, setTabs] = useState<TabsProps['items']>([])

  useEffect(() => {
    if (params.name) {
      getDetailByName(params.name, locale)
        .then(resp => {
          if (resp) {
            setDetail(resp)

            const tabs: TabsProps['items'] = []
            if (resp.images) {
              tabs.push(
                {
                  label: <TabItem title={formatMessage({id: 'pages.toolDetail.tabs.image'})} Icon={FileImageOutlined}/>,
                  key: 'photo',
                  children: <ImageCarousel name={resp.name} images={resp.images}/>
                })
            }
            if (resp.video) {
              tabs.push(
                {
                  label: <TabItem title={formatMessage({id: 'pages.toolDetail.tabs.video'})}
                                  color={'#c50000'} Icon={PlayCircleFilled}/>,
                  key: 'video',
                  children: (
                    <video controls width="100%">
                      <source src={resp.video} type="video/mp4"/>
                    </video>
                  )
                }
              )
            }
            setTabs(tabs)
          } else {
            history.replace('/404')
          }
        })
    }
  }, [params.name])

  return <PageContainer breadcrumb={undefined} title={false}>
    <div className={styles.title}>{params.name}</div>
    <Card className={styles.card} loading={!detail}>
      <div style={{marginBottom: 5, color: 'rgba(0, 0, 0, 0.4)'}}>
        {formatMessage({id: 'pages.toolDetail.author'})}：{detail?.authors.join(',')}
        <Divider type="vertical"/>
        {formatMessage({id: 'pages.toolDetail.updated'})}：{detail?.updated}
      </div>
      {detail?.introduction}
    </Card>
    <Card className={styles.card} loading={!detail}>
      <Tabs tabPosition={'left'} items={tabs}/>
    </Card>
  </PageContainer>;
};

export default ToolDetail;
