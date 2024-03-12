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



    return {
        selectEvent: select.addEventListener("change", chooseLevel)
    }

})();