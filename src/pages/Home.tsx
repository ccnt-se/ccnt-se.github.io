import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import useWindowSize from '@/utils/hooks/useWindowSize';

const Home: React.FC = () => {
  const { width: windowWidth } = useWindowSize();

  return (
    <PageContainer
      title={false}
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(135, 206, 250, 0.8), rgba(255, 255, 255, 0))',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontSize: windowWidth > 800 ? '9rem' : '18vw',
          width: '100%',
          textTransform: 'uppercase',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
        }}
      >
        CCNT-SE
      </div>
      <div style={{ color: '#363636', textAlign: 'center' }}>
        <div style={{ fontSize: windowWidth > 800 ? '2.5rem' : '5vw' }}>Zhejiang University</div>
        <div style={{ fontSize: windowWidth > 800 ? '2.5rem' : '5vw' }}>
          Advan<b>C</b>ed <b>C</b>omputing a<b>N</b>d Sys<b>T</b>em Laboratory
        </div>
        <div style={{ fontSize: windowWidth > 800 ? '1.5rem' : '3vw', marginTop: 10 }}>
          {' '}
          Software Engineering Research Group
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
