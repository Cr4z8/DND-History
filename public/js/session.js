const cardContainer = document.getElementById("adventure-card-container");
var minmax = "";

document.getElementById("adder-circle").addEventListener("click", () => {
    const card = document.createElement('div');
    card.className = "adventure-card";
    const date = new Date();
    const dateString = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    const editableFace = createEditableFace(card, "", dateString);
    card.appendChild(editableFace);
    cardContainer.appendChild(card);
    card.firstElementChild.firstElementChild.focus();
});

function createEditableFace(card, headerText, date, bodyText) {
    const editableFace = createFaceFromTemplate("editable-face-template", "face");
    //header-input-text
    const headerInput = editableFace.firstElementChild;
    const bodyInput = editableFace.children[2];
    headerInput.value = headerText == null ? "" : headerText;
    bodyInput.value = bodyText == null ? "" : bodyText;
    addBlurEventListener(headerInput, card, editableFace, headerInput, date, bodyInput);
    //date
    editableFace.children[1].innerHTML = date == null ? "" : date;
    //body-input-text
    addBlurEventListener(bodyInput, card, editableFace, headerInput, date, bodyInput);
    return editableFace;
}

function createNormalFace(card, headerText, date, bodyText) {
    const normalFace = createFaceFromTemplate("face-template", "face", {
        headerText: headerText,
        date: date,
        bodyText: bodyText,
        minmax: minmax
    });
    //minimize
    normalFace.children[3].addEventListener("click", () => {
        if (minmax == "verkleinern") {
            normalFace.children[2].style.height = "150px";
            minmax = "vergrößern";
        } else if (minmax == "vergrößern") {
            scaleContainerSize(normalFace.children[2]);
            minmax = "verkleinern";
        }
        normalFace.children[3].innerHTML = minmax;
    });
    //editsymbol
    normalFace.children[4].addEventListener("click", () => {
        const editableFace = createEditableFace(card, headerText, date, bodyText);
        card.removeChild(normalFace);
        card.appendChild(editableFace);
        editableFace.children[2].focus();
        scaleContainerSize(editableFace.children[2]);
    })
    return normalFace;
}

function addBlurEventListener(container, card, editableFace, headerInput, date, bodyInput) {
    container.addEventListener("keypress", (e) => {
        if (e.which == 13) container.blur();
    });
    container.addEventListener("blur", () => {
        setTimeout(() => {
            if (document.activeElement == editableFace.children[0] || document.activeElement == editableFace.children[2]) {
                return;
            }
            minmax = editableFace.children[2].scrollHeight > 200 ? "verkleinern" : "";
            const normalFace = createNormalFace(card, headerInput.value, date, bodyInput.value);
            card.removeChild(editableFace);
            card.appendChild(normalFace);
            scaleFontSize(normalFace.firstElementChild);
            scaleContainerSize(normalFace.children[2]);
        }, 50);
    });
}


function createFaceFromTemplate(templateID, faceClassName, mustacheObject) {
    const template = document.getElementById(templateID).innerHTML;
    const face = document.createElement("div");
    face.className = faceClassName;
    const html = mustacheObject == null ? template : Mustache.render(template, mustacheObject);
    face.innerHTML = html;
    return face;
}


function scaleFontSize(container) {
    let fontSize = 36;
    while (container.scrollHeight > container.clientHeight && fontSize > 5) {
        fontSize = 0.95 * fontSize;
        container.style.fontSize = fontSize + "px";
    }
}

function scaleContainerSize(container) {
    if (container.scrollHeight > container.clientHeight) {
        container.style.height = container.scrollHeight + "px";
    }
}