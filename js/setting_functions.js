import { domVariables } from "./dom_variables.js";
import { cardDesign } from "./cards.js";
import { supportFunctions } from "./globalFunctions.js";


export const settingEvents = (function () {
    const { select, cardStyle } = domVariables.variables;

    const { cleaningContainer } = supportFunctions;
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

    return {
        selectEvent: select.addEventListener("change", chooseLevel),
        cardDesingEvent: cardStyle.addEventListener("click", styleColor)
    }

})();