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
      updated: string;
      authors: API.MultiLanguageString[];
      introduction: API.MultiLanguageString;
      tagIcons: string[];
      images?: ImageJSON[];
      video?: string;
    }[];
  };

  type ListInfo = {
    name: string;
    introduction: string;
    tagIcons: string[];
    images?: Image[];
  }

  type Detail = {
    authors: string[];
    updated: string;
    video?: string;
  } & ListInfo

  type ImageJSON = {
    title?: API.MultiLanguageString;
    url: string;
  }

  type Image = {
    title?: string;
    url: string;
  }
}
