// @ts-ignore
/* eslint-disable */

declare namespace API.Tool {
  type TagIcon = {
    tooltip: string;
    icon: React.ReactNode;
  };

  type JSONData = {
    tools: ToolInfo[];
  };

  type Info = {
    name: string;
    introduction:
      | {
          zh_CN?: string;
          en_US?: string;
        }
      | string;
    tagIcons: string[];
  };
}
