export default function prettyPhone(phone: string): string {
  // expected +7##########
  let p = phone;
  p = `${p.slice(0, 2)} (${p.slice(2, 5)}) ***-${p.slice(8, 10)}-${p.slice(10, 12)}`;
  return p || '';
}
