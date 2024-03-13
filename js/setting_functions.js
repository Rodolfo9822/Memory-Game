import { domVariables } from "./dom_variables.js";
import { cardDesign } from "./cards.js";
import { supportFunctions } from "./globalFunctions.js";


export const settingEvents = (function () {
    const { select, cardStyle, startButton, time } = domVariables.variables;
    const { cleaningContainer } = supportFunctions;
    let interval;
    let second = 0;
    let minutes = 0;


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
        const startButton = evt.target.classList;
        if (!startButton.contains("stuck-button")) {
            cardStyle.removeEventListener("click", styleColor);
            select.removeEventListener("change", chooseLevel);
            startButton.add("stuck-button");
            timer();
            return
        }
        cardStyle.addEventListener("click", styleColor);
        select.addEventListener("change", chooseLevel);
        startButton.remove("stuck-button");
        clearInterval(interval);
    }

    return {
        selectEvent: select.addEventListener("change", chooseLevel),
        cardDesingEvent: cardStyle.addEventListener("click", styleColor),
        startButton: startButton.addEventListener("click", startGame)
    }

})();