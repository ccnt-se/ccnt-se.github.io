// @ts-ignore
/* eslint-disable */

declare namespace API.Tool {
  type TagIcon = {
    tooltip: string;
    icon: React.ReactNode;
  };

  type JSONData = {
    tools: {
      name: string;
      introduction: API.MultiLanguageString
      tagIcons: string[];
      images?: string[];
      video?: string;
    }[];
  };

  type ListInfo = {
    name: string;
    introduction: string;
    tagIcons: string[];
    images?: string[];
  }

  type Detail = {
    video?: string
  } & ListInfo
}
