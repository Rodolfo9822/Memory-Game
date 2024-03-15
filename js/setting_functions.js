import { domVariables } from "./dom_variables.js";
import { cardDesign } from "./cards.js";
import { supportFunctions } from "./globalFunctions.js";


export const settingEvents = (function () {
    const { cardsContainer, select, cardStyle, startButton, time, moves, mistakes } = domVariables.variables;
    const { cleaningContainer } = supportFunctions;
    let interval;
    let second = 0;
    let minutes = 0;
    let amountOfMistakes = 0;
    let amountOfMoves = 0;
    let firstCard = "";
    let cardChosen = []
    let monsterFound = 0;
    let total = 0;


    const chooseLevel = evt => {
        cleaningContainer();
        const amountOfMonsters = parseInt(evt.target.value);
        cardDesign.designCard(amountOfMonsters);
    }

    const styleColor = evt => {
        if (evt.target.classList.contains("buttons__style")) {
            const button = evt.target;
            const color = button.textContent.toLowerCase();

            if (button.classList.contains("stuck-button")) {
                button.classList.remove("stuck-button");
                addingColor(`green-color`);
                return
            }

            const allbuttons = Array.from(evt.target.parentElement.children);
            allbuttons.map(button => button.classList.remove("stuck-button"));
            button.classList.add("stuck-button");
            addingColor(`${color}-color`);
        }
    }

    const addingColor = color => {
        const cards = Array.from(document.querySelectorAll(".monsters__cover"));
        cards.map(cover => {
            cover.classList.remove(cover.classList[1]);
            cover.classList.add(color);
        })
    }

    const timer = () => {
        interval = setInterval(showingTime, 1000);
    }

    const showingTime = () => {
        if (second === 60) {
            minutes++;
            second = 0;
        }
        second++;
        const secondsValues = second < 10 ? `0${second}` : second;
        const minutesValues = minutes < 10 ? `0${minutes}` : minutes;
        time.textContent = `${minutesValues}:${secondsValues}`;
    }

    const startGame = evt => {
        const startButtonElement = evt.target.classList;
        if (!startButtonElement.contains("stuck-button")) {
            total = Array.from(document.querySelectorAll(".monsters__img")).length
            cardStyle.removeEventListener("click", styleColor);
            select.removeEventListener("change", chooseLevel);
            startButtonElement.add("stuck-button");
            cardsContainer.addEventListener("click", playing);
            select.setAttribute("disabled", "");
            startButton.setAttribute("disabled", "");
            mistakes.textContent = `Mistakes: ${0}`;
            moves.textContent = `Moves: ${0}`;
            timer();
            return
        }
    }

    const playing = evt => {

        if (evt.target.classList.contains("monsters__cover")) {
            const monster = evt.target.getAttribute("name");
            if (firstCard === "") {
                firstCard = monster;
                RemovingCover(evt.target);
                return;
            }

            RemovingCover(evt.target);
            addingMovesUp();

            if (firstCard === monster) {
                monsterFound++;
                cardChosen = [];
                firstCard = "";
            } else {
                addingMistakesUp();
                firstCard = "";
                setTimeout(() => {
                    makingCover();
                }, 1000);
            }

            reset();
        }
    }

    const addingMistakesUp = () => {
        amountOfMistakes++;
        mistakes.textContent = `Mistakes: ${amountOfMistakes}`;

    }

    const addingMovesUp = () => {
        amountOfMoves++
        moves.textContent = `Moves: ${amountOfMoves}`;
    }

    const RemovingCover = cover => {
        const box = cover.parentElement
        const card = cover.parentElement.children[1];
        cardChosen.push({ box, card });
        box.removeChild(card);
    }

    const makingCover = () => {
        cardChosen.forEach(element => {
            element["box"].appendChild(element["card"]);
        })
    }

    const checkingOut = () => monsterFound === (total / 2);

    const reset = () => {
        if (checkingOut()) {
            clearInterval(interval);
            cardChosen = [];
            amountOfMistakes = 0;
            amountOfMoves = 0;
            monsterFound = 0;
            firstCard = "";
            minutes = 0;
            second = 0;
            addingSettings();
        }
    }

    const addingSettings = () => {
        cardStyle.addEventListener("click", styleColor);
        select.addEventListener("change", chooseLevel);
        cardsContainer.removeEventListener("click", playing);
        startButton.classList.remove("stuck-button");
        select.removeAttribute("disabled");
        startButton.removeAttribute("disabled");
    }

    return {
        selectEvent: select.addEventListener("change", chooseLevel),
        cardDesingEvent: cardStyle.addEventListener("click", styleColor),
        startButton: startButton.addEventListener("click", startGame)
    }

})();