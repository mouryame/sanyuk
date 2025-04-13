export default function getPageId(data: Record<string, string>) {
  let id = "page";
  for (const key in data) {
    if (key !== "content") {
      id += data[key][0];
      id += key[1];
      id += data[key][2];
      id += Math.random().toString(36).slice(2, 5);
    }
  }
  id += new Date().getTime().toString();
  return id;
}
