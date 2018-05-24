window.addEventListener("load", function() {

  // store tabs variable
  var myTabs = document.querySelectorAll("a.tab");

  function myTabClicks(tabClickEvent) {

    for (var i = 0; i < myTabs.length; i++) {
      myTabs[i].classList.remove("active");
    }

    var clickedTab = tabClickEvent.currentTarget;

    clickedTab.classList.add("active");

    tabClickEvent.preventDefault();

    var myContentPanes = document.querySelectorAll(".explanation");

    for (i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove("active");
    }

    var anchorReference = tabClickEvent.target;
    var activePaneId = anchorReference.getAttribute("href");
    var activePane = document.getElementById(activePaneId);

    activePane.classList.add("active");

  }

  for (var i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener("click", myTabClicks)
  }
});
