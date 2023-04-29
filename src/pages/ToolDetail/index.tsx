import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import type {TabsProps} from "antd";
import {Card, Col, Divider, Row, Tabs} from "antd";
import {history} from 'umi';
import {useIntl} from '@umijs/max';

import CustomIcon from "@/components/CustomIcon";
import ImageCarousel from "./components/ImageCarousel";
import {getDetailByName} from "@/services/tool/api";
import '@/services/tool/typings.d.ts';
import styles from './styles.less';
import './styles.less';

const TabItem: React.FC<{ title: string, iconType: string }> = ({title, iconType}) => {
  const {formatMessage} = useIntl();
  return (
    <span style={{fontSize: '18px'}}>
      <CustomIcon type={iconType} size='24px'/>
      {formatMessage({id: title})}
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
              tabs.push({
                label: <TabItem title={'pages.toolDetail.tabs.image'} iconType={'image'}/>,
                key: 'photo',
                children: <ImageCarousel name={resp.name} images={resp.images}/>
              })
            }
            if (resp.video) {
              tabs.push({
                label: <TabItem title={'pages.toolDetail.tabs.video'} iconType={'video'}/>,
                key: 'video',
                children: (
                  <video controls width="100%">
                    <source src={resp.video} type="video/mp4"/>
                  </video>
                )
              })
            }
            if (resp.code) {
              tabs.push({
                label: <TabItem title={'pages.toolDetail.tabs.code'} iconType={'code'}/>,
                key: 'code',
                children: (
                  <Row gutter={[0, 12]}>
                    {
                      resp.code && resp.code.map(item => (
                        <Col key={item.url} span={24}>
                          <Card className={styles.tabCard} onClick={() => window.open(item.url)}>
                            <Card.Meta
                              avatar={<CustomIcon type={item.source} size='48px'/>}
                              title={item.title || item.source}
                              description={item.desc}
                            />
                          </Card>
                        </Col>
                      ))
                    }
                  </Row>
                )
              })
            }
            if (resp.artifacts) {
              tabs.push({
                label: <TabItem title={'pages.toolDetail.tabs.artifact'} iconType={'artifact'}/>,
                key: 'artifact',
                children: (
                  <div>
                    <Row gutter={[12, 10]}>
                      {
                        resp.artifacts && resp.artifacts.map(item => (
                          <Col key={item.title} span={8}>
                            <Card className={styles.tabCard} bodyStyle={{padding: '12px 18px'}}>
                              <Card.Meta
                                avatar={<CustomIcon type={item.type} size='32px'/>}
                                title={<div style={{height: '32px', lineHeight: '32px'}}>{item.title || item.type}</div>}
                              />
                            </Card>
                          </Col>
                        ))
                      }
                    </Row>
                    <Divider/>
                  </div>

                )
              })
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
    <Card className={styles.card} loading={!detail} bodyStyle={{padding: 0}}>
      <Tabs tabPosition={'left'} items={tabs}/>
    </Card>
  </PageContainer>;
};

export default ToolDetail;
