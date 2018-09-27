function createSlider(slider) {
  if (!slider) {
    return;
  }

  const tabs = slider.querySelectorAll('a.slider__button');
  const panes = slider.querySelectorAll('.slider__item');
  const myTabClicks = (tabClickEvent) => {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('slider__button_active');
    }

    const clickedTab = tabClickEvent.currentTarget;

    clickedTab.classList.add('slider__button_active');

    tabClickEvent.preventDefault();

    for (let i = 0; i < panes.length; i++) {
      panes[i].classList.remove('slider__item_active');
    }

    const anchorReference = tabClickEvent.target;
    const activePaneId = anchorReference.getAttribute('href');
    const activePane = Array.prototype.find.call(panes, (pane) => pane.dataset.id === activePaneId);

    if (activePane) {
      activePane.classList.add('slider__item_active');
    }
  };

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', myTabClicks);
  }
}

window.addEventListener('load', function() {
  // store tabs variable
  const sliders = document.querySelectorAll('.slider');
  const headerLinks = document.getElementsByClassName('header__nav-item');
  const navMenuElem = document.querySelector('.header__nav-absolute');
  const navMenuButtons = document.getElementsByClassName('header__nav-mobile-button');
  const sections = [];
  const offset = 76;

  if (sliders.length) {
    sliders.forEach(createSlider);
  }

  let selectedIndex = -1;

  for (let j = 0; j < headerLinks.length; j++) {
    const section = headerLinks[j].getAttribute('href');

    if (section[0] === '#') {
      sections.push(section);
    }
  }

  function toggleMenu(e) {
    navMenuElem.classList.toggle('header__nav-absolute_opened');
    e.stopPropagation();
  }

  for (let i = 0; i < navMenuButtons.length; i++) {
    navMenuButtons[i].addEventListener('click', toggleMenu);
  }

  document.querySelector('.header__nav-absolute').addEventListener('click', toggleMenu, true);

  window.addEventListener('scroll', function() {
    for (let k = 0; k < sections.length; k++) {
      const pageOffset = window.pageYOffset;
      const currentSection = document.getElementById(sections[k].slice(1));
      const currentSectionHeight = currentSection.offsetHeight;
      const currentSectionOffset = currentSection.offsetTop;

      if (currentSectionOffset < pageOffset + offset && pageOffset + offset < currentSectionHeight + currentSectionOffset + offset) {
        if (selectedIndex === k) {
          return;
        }

        selectedIndex = k;
        break;
      }
    }

    if (sections[selectedIndex]) {
      for (let l = 0; l < headerLinks.length; l++) {
        if (headerLinks[l] && headerLinks[l].getAttribute('href') === sections[selectedIndex]) {
          headerLinks[l].classList.add('header__nav-item_active');
        } else {
          headerLinks[l].classList.remove('header__nav-item_active');
        }
      }
    }
  });
});
