export function titleCase(value) {
  if (!value) return ''
  return String(value)
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
