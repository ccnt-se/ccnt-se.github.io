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

const getIconTypes = (item: API.Tool.JSONData['tools'][0]): string[] => {
  const res: string[] = [];
  if (item.video) res.push('video');
  if (item.code) {
    item.code.forEach(art => {
      switch (art.source) {
        case 'github':
          res.push('github');
          break;
      }
    })
  }
  if (item.artifacts) {
    item.artifacts.forEach(art => {
      switch (art.type) {
        case 'docker':
          res.push('docker')
          break
      }
    })
  }
  return res;
}

const mapListInfo = (item: API.Tool.JSONData['tools'][0], language?: string) => {
  return {
    name: item.name,
    introduction: localize(item.introduction, language),
    iconTypes: getIconTypes(item),
    images: item.images?.map(img => ({
      title: img.title && localize(img.title, language),
      url: img.url
    }))
  }
}


/** 获取工具列表信息 **/
export async function listInfo(language?: string): Promise<API.Tool.ListInfo[]> {
  return fetch('/data/tools/data.json')
    .then((response) => response.json())
    .then((data: API.Tool.JSONData) =>
      data.tools.map(item => mapListInfo(item, language))
    )
}


/** 根据工具名称获取信息 **/
export async function getDetailByName(name: string, lang?: string): Promise<API.Tool.Detail | undefined> {
  return fetch('/data/tools/data.json')
    .then((response) => response.json())
    .then((data: API.Tool.JSONData) => data.tools.find((item) => item.name === name))
    .then((item) => (item && {
      ...mapListInfo(item, lang),
      updated: item.updated,
      authors: item.authors.map(a => localize(a, lang)),
      video: item.video,
      code: item.code?.map(it => ({
        ...it,
        title: it.title && localize(it.title, lang),
        desc: it.desc && localize(it.desc, lang)
      })),
      artifacts: item.artifacts?.map(it => ({
        ...it,
        title: it.title && localize(it.title, lang),
        desc: it.desc && localize(it.desc, lang)
      })),
    }))
}
