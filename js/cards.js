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
        const randomIndex = Math.floor(Math.random(0) * (limit - 0));
        return array[randomIndex];
    }

    const gettingPairs = (selected, quantity) => {
        const pairs = [];
        let loop = true;
        let support = 0
        while (loop) {
            const img = whichIndex(selected, selected.length);
            if (support === quantity) {
                loop = false
            }
            else {
                if (!pairs.includes(img)) {
                    pairs.push(img);
                    support++;
                }
                else {
                    let counting = 0;
                    pairs.forEach(image => {
                        if (image === img) {
                            counting++;
                        }
                    })
                    if (counting === 1) {
                        pairs.push(img);
                        support++;
                    }
                }
            }
        }
        return pairs;
    }

    const randomChoosing = quantity => {
        let loop = true;
        let support = 0;
        const selected = [];
        while (loop) {
            const img = whichIndex(imageNames, (imageNames.length - 1));
            if (support === quantity) {
                loop = false;
            } else {
                if (!selected.includes(img)) {
                    selected.push(img);
                    support++;
                }
            }
        }
        return gettingPairs(selected, (quantity * 2));
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
            div.classList.add("monsters__cover", typeOfColor());
            li.appendChild(img);
            li.appendChild(div);
            ol.appendChild(li);
        });
        cardsContainer.appendChild(ol);
    }

    const typeOfColor = () => {
        const color = document.querySelector(".stuck-button")
        return color ? `${color.textContent.toLowerCase()}-color` : "green-color"
    }


    return {
        designCard: quantity => {
            const data = randomChoosing(quantity);
            addingCards(data);
        }
    };

})();


