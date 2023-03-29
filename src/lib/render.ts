export function stripHTML(source: HTMLElement | string) {
  if (!source) {
    return "";
  }
  // .replaceAll(/([^\s])\s([^\s])/g, "$1G$2"
  return strip(source instanceof HTMLElement ? source.innerHTML : source)
}

export function strip(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}