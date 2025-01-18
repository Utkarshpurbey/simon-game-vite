import React, { useEffect, useState } from "react";

const App = () => {
  const colors = ["red", "green", "blue", "yellow"];
  const boxColor = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
  ];
  const blinkClass = "opacity-20";
  const [gameSequence, updateGameSequence] = React.useState([]);
  const [userSequence, updateUserSequence] = React.useState<string[]>([]);
  const [hasGameStarted, updateGameStatus] = React.useState<boolean>(false);
  const [noOfPress, updateNoOfPress] = React.useState<number>(0);
  const [hasUserMadeMistake, updateUserMistakeStatus] =
    React.useState<boolean>(false);
  const [score, updateScore] = useState(0);

  const generateSequnce = () => {
    const newGeneratedColor = colors[Math.floor(Math.random() * colors.length)];
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
        if (e.key === "a" || e.key === "A") {
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
    <div className="bg-black h-screen">
      {!hasGameStarted ? (
        <div id="start-game" className="text-white">
          Press a from keyboard to start playing the game
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-5 px-4 py-4">
            {colors?.map((item, index) => (
              <div
                key={`id-${item}-index-${index}`}
                id={`id-${item}`}
                onClick={() => updateUserInput(item)}
              >
                <button className={`h-[25vh] w-full ${boxColor[index]} 
                transform transition duration-200 active:scale-95 rounded-lg`}
                ></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
