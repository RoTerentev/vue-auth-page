export default function capitalize(word: string): string {
  let res = '';
  if (word) {
    res += word;
  }
  if (res.length) {
    res = res.charAt(0).toUpperCase() + res.substr(1).toLowerCase();
  }
  return res;
}
