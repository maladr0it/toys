const listEl = document.getElementById("Nav-list");
const itemEls = [...listEl.children];
const boxEl = document.getElementById("Nav-box");

let activeIndex = -1;

const showContent = () => {
  boxEl.classList.add("Nav-box--show");
};

const switchContent = () => {
  boxEl.classList.add("Nav-box--switch");
};

const hideContent = () => {
  boxEl.classList.remove("Nav-box--show", "Nav-box--switch");
};

const handleMouseOver = event => {
  const prevIndex = activeIndex;
  activeIndex = itemEls.findIndex(el => el.contains(event.target));

  if (activeIndex === prevIndex) {
    return;
  }
  if (activeIndex === -1) {
    hideContent();
    return;
  }

  const itemEl = itemEls[activeIndex];
  const contentEl = itemEl.querySelector(".NavItem-content");
  const { height, width, top, left } = contentEl.getBoundingClientRect();

  boxEl.style.height = `${height}px`;
  boxEl.style.width = `${width}px`;
  boxEl.style.transform = `translate(${left}px, ${top}px)`;

  if (prevIndex === -1) {
    showContent();
  } else {
    switchContent();
  }
};

listEl.onmouseover = handleMouseOver;

listEl.onmouseleave = () => {
  activeIndex = -1;
  hideContent();
};
