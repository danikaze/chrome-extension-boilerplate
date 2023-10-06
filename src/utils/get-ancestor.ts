/**
 * Returns the first ancestor of the given element matching the given selector
 */
export function getAncestor<E extends HTMLElement = HTMLElement>(
  elem: HTMLElement,
  selector: string
): E | undefined {
  let e = elem.parentElement;
  while (e) {
    const p = e.parentElement;
    if (!p) return;
    const matching = Array.from(p.querySelectorAll(selector));
    if (matching.some((i) => i === e)) return e as E;
    e = p;
  }
}
