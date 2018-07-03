window.addEventListener('load', function() {
  // store tabs variable
  const myTabs = document.getElementsByClassName('stableunit__slider-button');
  const headerLinks = document.getElementsByClassName('header__nav-item');
  const navMenuElem = document.querySelector('.header__nav-absolute');
  const navMenuButtons = document.getElementsByClassName('header__nav-mobile-button');
  const sections = [];
  const offset = 76;
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

  function myTabClicks(tabClickEvent) {
    for (let i = 0; i < myTabs.length; i++) {
      myTabs[i].classList.remove('stableunit__slider-button_active');
    }

    const clickedTab = tabClickEvent.currentTarget;

    clickedTab.classList.add('stableunit__slider-button_active');

    tabClickEvent.preventDefault();

    const myContentPanes = document.getElementsByClassName('stableunit__slider-item');

    for (let i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove('stableunit__slider-item_active');
    }

    const anchorReference = tabClickEvent.target;
    const activePaneId = anchorReference.getAttribute('href');
    const activePane = document.getElementById(activePaneId);

    activePane.classList.add('stableunit__slider-item_active');
  }

  for (let i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener('click', myTabClicks);
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
