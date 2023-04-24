// @ts-ignore
const localize = (obj: API.MultiLanguageString, language?: string): string => {
  let lang = language ? language.replace("-", "_") : language
  if (typeof obj === 'string') {
    return obj
  } else {
    const keys = Object.keys(obj)
    // @ts-ignore
    return lang && keys.includes(lang) ? obj[lang] : obj[keys[0]]
  }
};


/** 获取工具列表信息 **/
export async function listInfo(language?: string): Promise<API.Tool.ListInfo[]> {
  return fetch('/data/tools/data.json')
    .then((response) => response.json())
    .then((data: API.Tool.JSONData) =>
      data.tools.map(item => {
        return {
          name: item.name,
          introduction: localize(item.introduction, language),
          tagIcons: item.tagIcons,
          images: item.images
        }
      })
    )
}


/** 根据工具名称获取信息 **/
export async function getDetailByName(name: string, language?: string): Promise<API.Tool.Detail | undefined> {
  return fetch('/data/tools/data.json')
    .then((response) => response.json())
    .then((data: API.Tool.JSONData) => data.tools.find((item) => item.name === name))
    .then((item) => (item && {
      name: item.name,
      introduction: localize(item.introduction, language),
      tagIcons: item.tagIcons,
      images: item.images,
      video: item.video
    }))
}


