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
    const htmlEditable = document.getElementById("editable-session-template").innerHTML;
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
        setTimeout(() => {
            const normalFace = createNormalFace(session, input.value);
            session.removeChild(editableFace);
            session.appendChild(normalFace);
        }, 100);
    });
    //deletesymbol
    editableFace.children[1].addEventListener("click", () => {
        sessionContainer.removeChild(editableFace.parentElement);
    });
    return editableFace;
}

function createNormalFace(session, sessionText) {
    const normalFace = document.createElement("div");
    normalFace.className = "face";
    const template = document.getElementById("session-template").innerHTML;
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