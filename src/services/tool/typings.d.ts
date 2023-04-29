// @ts-ignore
/* eslint-disable */

declare namespace API.Tool {

  type JSONData = {
    tools: {
      name: string;
      updated: string;
      authors: API.MultiLanguageString[];
      introduction: API.MultiLanguageString;
      images?: {
        title?: API.MultiLanguageString;
        url: string;
      }[];
      video?: string;
      code?: {
        source: string;
        url: string;
        title?: API.MultiLanguageString;
        desc?: API.MultiLanguageString;
      }[];
      artifacts?: {
        type: string;
        source: string;
        url: string;
        title?: API.MultiLanguageString;
        desc?: API.MultiLanguageString;
        descUrl?: string;
      }[];
    }[];
  };

  type ListInfo = {
    name: string;
    introduction: string;
    iconTypes: string[];
    images?: Image[];
  }

  type Detail = {
    authors: string[];
    updated: string;
    video?: string;
    code?: {
      source: string;
      url: string;
      title?: string;
      desc?: string;
    }[];
    artifacts?: {
      type: string;
      source: string;
      url: string;
      title?: string;
      desc?: string;
      descUrl?: string;
    }[];
  } & ListInfo

  type Image = {
    title?: string;
    url: string;
  }
}
