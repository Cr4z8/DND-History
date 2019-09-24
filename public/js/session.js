const cardContainer = document.getElementById("adventure-card-container");

document.getElementById("adder-circle").addEventListener("click", () => {
    const card = document.createElement('div');
    card.className = "adventure-card";
    const editableFace = createEditableFace(card);
    card.appendChild(editableFace);
    cardContainer.appendChild(card);
    card.firstElementChild.firstElementChild.focus();
});

function createEditableFace(card, headerText, date, bodyText) {
    const htmlEditable = document.getElementById("editable-face-template").innerHTML;
    const editableFace = document.createElement("div");
    editableFace.className = "face";
    editableFace.innerHTML = htmlEditable;
    //input-text
    const headerInput = editableFace.firstElementChild;
    const bodyInput = editableFace.children[2];
    headerInput.value = headerText == null ? "" : headerText;
    headerInput.addEventListener("keypress", (e) => {
        if (e.which == 13) headerInput.blur();
    });
    headerInput.addEventListener("blur", () => {
        //todo: falls focus auf header oder body input liegt, dann nicht wechseln
        const normalFace = createNormalFace(card, headerInput.value, date, bodyInput.value);
        card.removeChild(editableFace);
        card.appendChild(normalFace);
        scaleFontSize(normalFace.firstElementChild);
        scaleContainerSize(normalFace.children[2]);
    });
    //date
    editableFace.children[1].innerHTML = date == null ? "" : date;
    //body-text
    return editableFace;
}

function createNormalFace(card, headerText, date, bodyText) {
    const normalFace = document.createElement("div");
    normalFace.className = "face";
    const template = document.getElementById("face-template").innerHTML;
    const htmlNormal = Mustache.render(template, {
        headerText: headerText,
        date: date,
        bodyText: bodyText
    });
    normalFace.innerHTML = htmlNormal;
    //editsymbol
    normalFace.children[3].addEventListener("click", () => {
        const editableFace = createEditableFace(card, headerText, date, bodyText);
        card.removeChild(normalFace);
        card.appendChild(editableFace);
        card.firstElementChild.firstElementChild.focus();
    })
    return normalFace;
}

function scaleFontSize(container) {
    let fontSize = 36;
    console.log(fontSize);
    while (container.scrollHeight > container.clientHeight && fontSize > 5) {
        fontSize = 0.95 * fontSize;
        container.style.fontSize = fontSize + "px";
    }
}

function scaleContainerSize(container) {
    if (container.scrollHeight > container.clientHeight) {
        container.clientHeight = container.scrollHeight;
    }
}