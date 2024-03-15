import { domVariables } from "./dom_variables.js";

export const supportFunctions = (function () {
    const { cardsContainer } = domVariables.variables;

    const container = () => {
        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
        }
    }

    return {
        cleaningContainer: container
    }

})();
