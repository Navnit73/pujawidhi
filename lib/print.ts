/** Print one block of the page. CSS in globals.css hides everything except [data-print-block]. */
export function printBlock(el: HTMLElement | null) {
  if (!el) return window.print();
  el.setAttribute("data-print-block", "");
  document.body.setAttribute("data-print-active", "");
  const done = () => {
    el.removeAttribute("data-print-block");
    document.body.removeAttribute("data-print-active");
    window.removeEventListener("afterprint", done);
  };
  window.addEventListener("afterprint", done);
  window.print();
}
