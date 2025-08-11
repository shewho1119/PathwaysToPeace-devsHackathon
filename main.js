window.transitionToPage = function (href) {
  document.querySelector("body").style.opacity = 0;
  setTimeout(function () {
    window.location.href = href;
  }, 500);
};

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector("body").style.opacity = 1;
});

function showEndButton() {
  setTimeout(function() {
    document.querySelector('.end-button').style.opacity = 1;
    localStorage.clear();
  }, 6000);
}

function showResultsButton() {
  setTimeout(function() {
    document.querySelector('.results-button').style.opacity = 1;
  }, 4000); 
}


function simulateLoading(duration) {
  const progressBar = document.querySelector('.progress');
  let start = null;
  const easeInOutQuad = (t) => t<.5 ? 2*t*t : -1+(4-2*t)*t;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / duration;
    const easedProgress = easeInOutQuad(progress);
    progressBar.style.width = (easedProgress * 100) + '%';

    if (progress < 0.87) {
      requestAnimationFrame(step);
    } else {
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1000);
    }
  }

  requestAnimationFrame(step);
}

function showCutscene() {
  setTimeout(function() {
    document.querySelector('.second').style.opacity = 1;
  }, 2000);
  setTimeout(function() {
    document.querySelector('.third').style.opacity = 1;
  }, 4000);
  setTimeout(function() {
    document.querySelector('.fourth').style.opacity = 1;
  }, 7000);
  setTimeout(function() {
    document.querySelector('.cutscene-button').style.opacity = 1;
  }, 10000);
}

function addToInventory(key, item) {
  localStorage.setItem(key, item);
}

function addToChoices(key, value) {
  localStorage.setItem(key, value);
  let choices = document.querySelectorAll(".choice-modal");
  // Hide all choices once a choice is made
  for (var i = 0; i < choices.length; i++) {
    choices[i].style.display = "none";
  }
  window.location.reload();
}

function calculateResult() {
  let resultValue = 0;
  resultValue = Number(localStorage.getItem('choice1')) + Number(localStorage.getItem('choice2')) +
  Number(localStorage.getItem('choice3')) + Number(localStorage.getItem('choice4')) +
  Number(localStorage.getItem('choice5')) + Number(localStorage.getItem('choice6')) +
  Number(localStorage.getItem('choice7')) + Number(localStorage.getItem('choice8'));
  console.log(resultValue)
  if (resultValue == 0) {
      transitionToPage('./character1.html');
  } else if (resultValue > 0 && resultValue <= 25) {
      transitionToPage('./character1.html');
  } else if (resultValue > 25 && resultValue <= 50) {
      transitionToPage('./character1.html');
  } else if (resultValue > 50 && resultValue <= 75) {
      transitionToPage('./character1.html');
  } else if (resultValue > 75) {
      transitionToPage('./character1.html');
  } else {
    transitionToPage('./character1.html');
  }
}

function downloadImg() {
    html2canvas(document.getElementById('results-container')).then(function(canvas) {
      let link = document.createElement('a');
      link.download = 'PathwayOfPeaceResults.png';
      link.href = canvas.toDataURL();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

function showChoices(key) {
  let choices = document.querySelectorAll(".choice-modal");
  if (key == 1) {
    choices = document.querySelectorAll(".coins");
    addToInventory('item1', 1);
  } else if (key == 2) {
    choices = document.querySelectorAll(".clothing");
    addToInventory('item2', 1);
  } else if (key == 3) {
    choices = document.querySelectorAll(".mirror");
    addToInventory('item3', 1);
  } else if (key == 4) {
    choices = document.querySelectorAll(".food");
    addToInventory('item4', 1);
  } else if (key == 5) {
    choices = document.querySelectorAll(".wheel");
    addToInventory('item5', 1);
  } else if (key == 6) {
    choices = document.querySelectorAll(".shoes");
    addToInventory('item6', 1);
  } else if (key == 7) {
    choices = document.querySelectorAll(".laptop");
    addToInventory('item7', 1);
  } else if (key == 8) {
    choices = document.querySelectorAll(".doll");
    addToInventory('item8', 1);
  }
  for (var i = 0; i < choices.length; i++) {
    choices[i].style.display = "block";
  }
}

function getCollected() {
  let elements = document.querySelectorAll(".inventory-item");
  let itemsList = ["coins-item", "clothing-item", "mirror-item", "food-item", "wheel-item", "shoes-item", "laptop-item", "doll-item"];
  let counter = 0;
  for (let i = 0; i < elements.length; i++) {
    let itemKey = `item${i + 1}`;
    let item = document.getElementById(itemsList[i]);
    if (Number(localStorage.getItem(itemKey)) === 1) {
      elements[i].style.opacity = 1;
      if (item) {
        item.style.opacity = 0;
      }
      counter++;
    } else {
      elements[i].style.opacity = 0.1;
      if (item) {
        item.style.opacity = 1;
      }
    }
  }

  if (counter == 8) {
    setTimeout(function() {
      transitionToPage("./ending.html")
    }, 2000);
  }
}