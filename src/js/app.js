window.addEventListener("load", function() {

  // store tabs variable
  var myTabs = document.querySelectorAll("a.stableunit__slider-button");

  function myTabClicks(tabClickEvent) {

    for (var i = 0; i < myTabs.length; i++) {
      myTabs[i].classList.remove("stableunit__slider-button_active");
    }

    var clickedTab = tabClickEvent.currentTarget;

    clickedTab.classList.add("stableunit__slider-button_active");

    tabClickEvent.preventDefault();

    var myContentPanes = document.querySelectorAll(".stableunit__slider-item");

    for (i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove("stableunit__slider-item_active");
    }

    var anchorReference = tabClickEvent.target;
    var activePaneId = anchorReference.getAttribute("href");
    var activePane = document.getElementById(activePaneId);

    activePane.classList.add("stableunit__slider-item_active");

  }

  for (var i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener("click", myTabClicks);
  }
});
