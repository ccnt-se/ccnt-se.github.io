import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import '@/services/tool/typings.d.ts';
import { useParams } from 'react-router';

const ToolDetail: React.FC = () => {
  const params = useParams();

  return <PageContainer title={params.name}></PageContainer>;
};

export default ToolDetail;
