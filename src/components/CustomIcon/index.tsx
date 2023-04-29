import React from "react";
import {createFromIconfontCN, GithubFilled, PlayCircleFilled} from "@ant-design/icons";
import {useIntl} from "@@/exports";
import {Tooltip} from "antd";

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3985552_ljqbt9wtk9i.js',
});

type CustomIconProps = {
  type: string;
  tooltip?: boolean;
  size?: string;
}

const ICONS: { [type: string]: { tooltip: string, icon: any } } = {
  github: {
    tooltip: 'pages.toolList.githubIcon',
    icon: <GithubFilled style={{color: '#000'}}/>
  },
  docker: {
    tooltip: 'pages.toolList.dockerIcon',
    icon: <IconFont type="icon-docker" style={{color: '#0db7ed'}}/>
  },
  video: {
    tooltip: 'pages.toolList.videoIcon',
    icon: <PlayCircleFilled style={{color: '#c50000'}}/>
  },
  image: {
    tooltip: 'pages.toolList.imageIcon',
    icon: <IconFont type="icon-image-fill"/>
  },
  code: {
    tooltip: 'pages.toolList.codeIcon',
    icon: <IconFont type="icon-yichangdaima"/>
  },
  artifact: {
    tooltip: 'pages.toolList.artifactIcon',
    icon: <IconFont type="icon-product-fill" style={{color: '#4b4b4b'}}/>
  },
  ideaPlugin: {
    tooltip: 'pages.toolList.ideaPluginIcon',
    icon: <IconFont type="icon-Idea"/>,
  },
}

const CustomIcon: React.FC<CustomIconProps> = (props) => {
  const {formatMessage} = useIntl();
  const {size, type, tooltip = false} = props;

  const icon = ICONS[type];

  if (!icon) {
    console.warn(`Invalid icon name "${type}"`);
    return null;
  }

  const getIcon = () => {
    return React.cloneElement(icon.icon, {
      style: Object.assign({}, icon.icon.props.style, {
        fontSize: size,
      })
    })
  }

  return (
    tooltip ? (
      <Tooltip title={formatMessage({id: icon.tooltip})}>{getIcon()}</Tooltip>
    ) : (
      getIcon()
    )
  );
}

export default CustomIcon;
