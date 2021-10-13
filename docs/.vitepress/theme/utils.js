export function findByPath (array) {
  const path = location.pathname.replace('.html', '') + location.search
  // console.log(path)
  const find = (arr, path) => {
    for (const item of arr) {
      if (item.children) {
        const result = find(item.children, path)
        if (result) {
          return result
        }
      }
      if (item.link === path) {
        return item
      }
    }
  }
  return find(array, path)
}
