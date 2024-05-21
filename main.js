document
  .querySelector(".control-buttons span")
  .addEventListener("click", () => {
    let urName = prompt("What's Your Name?");

    if (urName == null || urName === "") {
      document.querySelector(".name span").innerHTML = "Unkown";
    } else {
      document.querySelector(".name span").innerHTML = urName;
    }

    document.querySelector(".control-buttons").remove();

    //music
    document.getElementById("background").play();

    // For Timer
    let minutes = document.querySelector(".minutes");
    let seconds = document.querySelector(".seconds");
    let m = parseInt(minutes.innerHTML) - 1,
      s = 60;
    let timer = setInterval(() => {
      s--;
      minutes.innerHTML = m < 10 ? `0${m} : ` : m;
      seconds.innerHTML = s < 10 ? `0${s}` : s;
      if (s === 0 && m !== 0) {
        m--;
        s = 60;
      }
      if (s === 0 && m === 0) {
        clearInterval(timer);
        setTimeout(() => {
          document.getElementById("background").pause();
          window.alert("GameOver :(");
          location.reload();
        }, 1000);
      }
    }, duration);
    //end for timer
  });

let duration = 1000;

// For order Elements in Random
//[1] declar vars
let blocksContainer = document.querySelector(".memory-game-blocks"),
  blocks = Array.from(blocksContainer.children),
  orderRange = Array.from(blocks.keys());
shuffle(orderRange);

let matchedBlocks;
blocks.forEach((block, idx) => {
  block.style.order = orderRange[idx];

  block.addEventListener("click", () => flipBlock(block));

  //When finish Game
});

//My Functions
//flipBlock Function
function flipBlock(block) {
  block.classList.add("is-flipped");

  let allBlocksFlip = blocks.filter((blockFlipped) =>
    blockFlipped.classList.contains("is-flipped")
  );

  if (allBlocksFlip.length === 2) {
    stopClicking();
    matchCheck(allBlocksFlip[0], allBlocksFlip[1]);
  }
}
//Stop clickung function
function stopClicking() {
  blocksContainer.classList.add("no-click");

  setTimeout(() => {
    blocksContainer.classList.remove("no-click");
  }, duration);
}

//Metch Check Function
function matchCheck(blockOne, blockTwo) {
  let tries = document.querySelector(".try span");

  if (blockOne.dataset.anime === blockTwo.dataset.anime) {
    blockOne.classList.remove("is-flipped");
    blockTwo.classList.remove("is-flipped");

    blockOne.classList.add("has-match");
    blockTwo.classList.add("has-match");

    matchedBlocks = blocks.filter((e) => e.classList.contains("has-match"));
    setTimeout(() => {
      if (matchedBlocks.length === blocks.length) {
        window.alert("Well Done :)");
        location.reload();
      }
    }, duration);

    document.getElementById("success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    setTimeout(() => {
      blockOne.classList.remove("is-flipped");
      blockTwo.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}

//Shuffle function
function shuffle(array) {
  //settings vars
  let cur = array.length,
    random,
    temp;
  while (cur > 0) {
    random = Math.floor(Math.random() * cur);
    cur--;
    //Swap
    (temp = array[cur]), (array[cur] = array[random]), (array[random] = temp);
  }
  return array;
}
