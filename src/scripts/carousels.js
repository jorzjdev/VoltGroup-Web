export function initCarousels() {
  document.querySelectorAll('.carousel__track').forEach((track) => {
    const items = [...track.children];
    if (items.length === 0) return;
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });
}
