import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import '@/services/tool/typings.d.ts';
import {history} from 'umi';
import {useIntl} from '@umijs/max';
import {useParams} from 'react-router';
import {getDetailByName} from "@/services/tool/api";
import {Card, Carousel, Divider, Image, Tabs} from "antd";
import {FileImageOutlined, PlayCircleFilled} from "@ant-design/icons";
import styles from './styles.less';
import './styles.less';

const ToolDetail: React.FC = () => {

  const {locale} = useIntl();
  const [data, setData] = useState<API.Tool.Detail | undefined>(undefined)
  const params = useParams();

  useEffect(() => {
    if (params.name) {
      getDetailByName(params.name, locale)
        .then(resp => {
          if (resp) {
            setData(resp)
          } else {
            history.replace('/404')
          }
        })
    }
  }, [params.name])

  return <PageContainer breadcrumb={undefined} title={false}>
    <div className={styles.title}>{params.name}</div>
    <Card className={styles.card} loading={!data}>
      <div style={{marginBottom: 5, color: 'rgba(0, 0, 0, 0.4)'}}>
        作者：黄耀华
        <Divider type="vertical" />
        更新时间：2023-4-23 18:00:00
      </div>
      {data?.introduction}
    </Card>
    <Card className={styles.card} loading={!data}>
      <Tabs
        tabPosition={'left'}
        items={[
          {
            label: <span style={{fontSize: '18px'}}>
              <FileImageOutlined style={{fontSize: `24px`}}/>
              图片
            </span>,
            key: 'photo',
            children: <Carousel>
              {
                data?.images?.map(url => (
                  <div key={url}>
                    <Image preview={{mask: false}} src={`/data/tools/${data?.name}/${url}`}/>
                  </div>
                ))
              }
            </Carousel>
          },
          {
            label: <span style={{fontSize: '18px'}}>
              <PlayCircleFilled style={{fontSize: `24px`, color: '#c50000'}}/>
              视频
            </span>,
            key: 'video',
            children: <video controls width="100%">
              <source src={data?.video} type="video/mp4"/>
            </video>
          }
        ]}
      />
    </Card>
  </PageContainer>;
};

export default ToolDetail;
