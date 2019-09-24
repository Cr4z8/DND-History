const sessionContainer = document.getElementById("session-container");

document.getElementById("adder-circle").addEventListener("click", () => {
    const session = document.createElement('div');
    session.className = "session";
    const editableFace = createEditableFace(session);
    session.appendChild(editableFace);
    sessionContainer.appendChild(session);
    session.firstElementChild.firstElementChild.focus();
});

function createEditableFace(session, sessionText) {
    const htmlEditable = document.getElementById("editable-face-template").innerHTML;
    const editableFace = document.createElement("div");
    editableFace.className = "face";
    editableFace.innerHTML = htmlEditable;
    //input-text
    const input = editableFace.firstElementChild;
    input.value = sessionText == null ? "" : sessionText;
    input.addEventListener("keypress", (e) => {
        if (e.which == 13) input.blur();
    });
    input.addEventListener("blur", () => {
        const normalFace = createNormalFace(session, input.value);
        session.removeChild(editableFace);
        session.appendChild(normalFace);
        scaleFontSize(normalFace.firstElementChild.firstElementChild);
    });
    return editableFace;
}

function createNormalFace(session, sessionText) {
    const normalFace = document.createElement("div");
    normalFace.className = "face";
    const template = document.getElementById("face-template").innerHTML;
    const htmlNormal = Mustache.render(template, {
        sessionName: sessionText
    });
    normalFace.innerHTML = htmlNormal;
    //editsymbol
    normalFace.children[1].addEventListener("click", () => {
        const editableFace = createEditableFace(session, sessionText);
        session.removeChild(normalFace);
        session.appendChild(editableFace);
        session.firstElementChild.firstElementChild.focus();
    })
    return normalFace;
}

function scaleFontSize(container) {
    let fontSize = 36;
    console.log(container.scrollWidth);

    console.log(container.clientWidth);
    while ((container.scrollHeight > container.clientHeight || container.scrollWidth > 267) && fontSize > 5) {
        fontSize = 0.95 * fontSize;
        container.style.fontSize = fontSize + "px";
    }
}