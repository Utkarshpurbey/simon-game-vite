import React, { useEffect, useMemo, useState } from "react";

const App = () => {
  const colors = ["red", "green", "blue", "yellow"];
  const boxColor = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
  ];
  const blinkClass = "opacity-50";
  const [gameSequence, updateGameSequence] = React.useState([]);
  const [userSequence, updateUserSequence] = React.useState<string[]>([]);
  const [hasGameStarted, updateGameStatus] = React.useState<boolean>(false);
  const [noOfPress, updateNoOfPress] = React.useState<number>(0);
  const [hasUserMadeMistake, updateUserMistakeStatus] =
    React.useState<boolean>(false);
  const [score, updateScore] = useState(0);

  const generateSequnce = () => {
    const newGeneratedColor = colors[Math.floor(Math.random() * colors.length)];
    console.log("uttu", newGeneratedColor);
    setTimeout(() => {
      animatePress(newGeneratedColor);
    }, 300);
    updateGameSequence([...gameSequence, newGeneratedColor]);
  };
  const updateUserInput = (color) => {
    updateNoOfPress(noOfPress + 1);
    updateUserSequence([...userSequence, color]);
    const newUserInput = [...userSequence, color];
    captureUserInputandProceed(newUserInput.length, newUserInput);
  };

  const captureUserInputandProceed = (length, newUserInput) => {
    console.log(newUserInput, gameSequence);
    if (newUserInput[length - 1] === gameSequence[length - 1]) {
        if (newUserInput.length === gameSequence.length) {
            updateScore(score + 1);
        setTimeout(() => {
          generateSequnce();
        }, 1000);
        updateUserSequence([]);
      }
    } else {
      updateUserMistakeStatus(true);
    }
  };
  const resetGame = () => {
    // if (window) {
    //     window.location.reload();
    // }
    // updateGameSequence([]);
    // updateUserSequence([]);
    // updateGameStatus(false);
    // updateNoOfPress(0);
    // updateUserMistakeStatus(false);

    if (window) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (hasUserMadeMistake) {
      alert("User made Mistake");
      resetGame();
    }
  }, [hasUserMadeMistake]);

  const animatePress = (selectedColor) => {
    if (document) {
      const element = document.querySelector(`#id-${selectedColor}`);
      if (element) {
        element.classList.add(blinkClass);
      }
      setTimeout(() => {
        if (element) {
          element.classList.remove(blinkClass);
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (window) {
      const updateGameStatusFunction = (e) => {
        if (e.key === "a") {
          updateGameStatus(true);
          generateSequnce();
          window.removeEventListener("keydown", updateGameStatusFunction);
        }
      };
      window.addEventListener("keydown", updateGameStatusFunction);
      return () => {
        window.removeEventListener("keydown", updateGameStatusFunction);
      };
    }
  }, []);

  return (
    <>
      {!hasGameStarted ? (
        <div id="start-game">
          Press a from keyboard to start playing the game
        </div>
      ) : (
                  <>
                      <div>Score : {score}</div>
          <div className="flex p-4">
            {colors.map((color, index) => (
              <div id={`id-${color}`} className="px-4">
                <div
                  className={` h-10 w-fit ${boxColor[index]} p-4 rounded-lg flex items-center aling-center cursor-pointer hover:shadow-lg hover:scale-110 active:bg-violet-700`}
                  onClick={() => updateUserInput(color)}
                  key={`id-${color}-index-${index}`}
                >
                  <div>{color}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default App;
