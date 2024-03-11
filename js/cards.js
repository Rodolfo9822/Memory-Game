import { domVariables } from "./dom_variables.js";

const imageNames = [
    "blue.avif",
    "Brown.avif",
    "darkBlue.avif",
    "Green.avif",
    "lightBlue.avif",
    "lightBrown.avif",
    "lightPurple.avif",
    "Orange.avif",
    "purple.avif",
    "Red.avif",
    "White.avif",
    "Yellow.avif"
]


export const cardDesign = (function () {
    const { cardsContainer } = domVariables.variables;


    const whichIndex = (array, limit) => {
        const randomIndex = Math.floor(Math.random(0) * (limit - 0) + 1);
        return array[randomIndex];
    }

    const gettingThePairs = data => {
        const state = true;
        const limit = data.length - 1
        while (state) {
            const img = whichIndex(data, limit);

        }
    }

    const randomChoosing = quantity => {
        let state = true
        const limit = imageNames.length - 1;
        const selected = [];
        while (state) {
            const img = whichIndex(imageNames, limit);

            if (selected.length === quantity) {
                state = false;
            } {
                if (!selected.includes(img)) {
                    selected.push(img);
                }
            }
        }
        /* gettingThePairs(selected); */
        return selected;
    }



    const addingCards = data => {
        const ol = document.createElement("ol");
        ol.classList.add("monsters");
        data.forEach(monster => {

            const li = document.createElement("li");
            li.classList.add("monsters__box");

            const img = document.createElement("img");
            img.classList.add("monsters__img");
            img.src = `build/img/Monster_${monster}`;
            img.alt = `it's ${monster}`;

            const div = document.createElement("div");
            div.classList.add("monsters__cover", "green-color");

            li.appendChild(img);
            /* li.appendChild(div); */

            ol.appendChild(li);
        });
        cardsContainer.appendChild(ol);
    }

    return {
        designCard: quantity => {
            const data = randomChoosing(6);
            addingCards(data);
        }
    };

})();


