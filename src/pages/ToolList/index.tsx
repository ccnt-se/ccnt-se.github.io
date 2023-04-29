import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import styles from './styles.less';
import './styles.less';
import {history} from 'umi';
import {Carousel, Col, Image, Row, Typography} from 'antd';
import {useIntl} from '@umijs/max';
import '@/services/tool/typings.d.ts';
import {listInfo} from '@/services/tool/api';
import CustomIcon from "@/components/CustomIcon";

const {Paragraph} = Typography;

const ListItem: React.FC<{ info: API.Tool.Detail }> = ({info}) => {

  return (
    <div className={styles.listItem} onClick={() => history.push(`/tool/${info.name}`)}>
      <Row>
        {/* 内容区域 */}
        <Col lg={16} md={14} sm={24} xs={24} style={{padding: '20px 20px 20px 40px', maxHeight: 240}}>
          <div className={styles.listItemTitle}>{info.name}</div>
          <div className={styles.listItemIconGroup}>
            {info.iconTypes.map((type: string) => (
              <span key={type} className={styles.listItemIcon}><CustomIcon type={type} size='32px' tooltip/></span>
            ))}
          </div>
          <Paragraph className={styles.listItemIntroduction} ellipsis={{rows: 3, expandable: false}}>
            {info.introduction}
          </Paragraph>
        </Col>

        {/* 图片区域 */}
        <Col lg={8} md={10} sm={24} xs={24} onClick={(event) => event.stopPropagation()}>
          <Carousel>
            {
              info.images?.map(img => (
                <div key={img.url}>
                  <Image src={`/data/tools/${info.name}/${img.url}`}/>
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
