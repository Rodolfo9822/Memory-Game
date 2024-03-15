import { cardDesign } from "./cards.js";
import { settingEvents } from "./setting_functions.js";

window.addEventListener("load", () => {
    const { cardDesingEvent, selectEvent, startButton } = settingEvents
    cardDesign.designCard(6)
    cardDesingEvent;
    selectEvent;
    startButton;


})




