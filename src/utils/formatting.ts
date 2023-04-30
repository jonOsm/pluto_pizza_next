export const camelToTitle = (str: string) => {
  let titleStr = ""
  for (let i = 0; i < str.length; i++) {
    if (i === 0) {
      titleStr += str[i]?.toUpperCase()
      continue
    }

    const utf16Code = str.charCodeAt(i)
    if (utf16Code >= 65 && utf16Code <= 90) {
      titleStr += " "
    }
    titleStr += str[i]
  }
  return titleStr
}
