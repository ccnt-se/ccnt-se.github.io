# 指南：如何添加工具（Tool）到网站中

由于项目是纯前端应用，没有管理后台，所以需要手动将数据添加到本目录下的相关文件中。

## 在data.json中添加数据

首先，需要将工具的简要介绍添加到当前目录下的 `data.json` 文件中，相关信息会呈现在工具列表页和详情页中。
`data.json` 文件的格式定义如下：

```json
{
  "tools": [
    {...}, // 工具A信息
    {...}  // 工具B信息
  ]
}
```
`tools` 数组中对象格式定义如下：

## 创建工具同名文件夹，并添加数据


