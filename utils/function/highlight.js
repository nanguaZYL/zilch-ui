function getClass({ tag = "span", className = "default", key }) {
  return `<${tag} class="${className}">${key}</${tag}>`;
}

export default {
  default(text, key, className) {
    const s = "/$/zyl/";
    const rep = text.replace(new RegExp("(" + key + ")", "i"), s);
    const idx = rep.indexOf(s);
    let old = key;
    if (idx != -1) {
      const len = old.length;
      old = text.substring(idx, idx + len);
    }
    return rep.replace(s, getClass({ key: old, className }));
  },
};
