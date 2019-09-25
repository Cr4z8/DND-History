class ContainerBuilder {
    //editablesClassNames.length != 0
    // scalings is a list of "scaleFont" or "scaleContainer"
    constructor(containerClassName, editablesClassNames, scalings, mustacheObject, faceClassName = "face", faceTemplateIDs = ["editable-face-template", "normal-face-template"], focusClassName = "body-input") {
        this.container = document.createElement('div');
        this.container.className = containerClassName;
        this.face = document.createElement("div");
        this.face.className = faceClassName;
        this.container.appendChild(this.face);
        this.editablesClassNames = editablesClassNames;
        this.editableFaceTemplateID = faceTemplateIDs[0];
        this.normalFaceTemplateID = faceTemplateIDs[1];
        this.focusClassName = focusClassName;
        this.scalings = scalings;
        this.mustacheObject = mustacheObject;
        this.applyEditableFace();
    }

    //editablesClassNames = classNames of the input objects
    applyEditableFace(texts = []) {
        const template = document.getElementById(this.editableFaceTemplateID).innerHTML;
        const html = Mustache.render(template, this.mustacheObject);
        this.face.innerHTML = html;
        const editables = this.transferTexts(texts);
        //add EventListener
        editables.forEach(input => {
            input.addEventListener("keypress", (e) => {
                if (e.which == 13) input.blur();
            });
            input.addEventListener("blur", () => {
                setTimeout(() => {
                    for (let i = 0; i < editables.length; i++) {
                        if (document.activeElement == editables[i]) return;
                    }
                    texts = [];
                    editables.forEach(editable => {
                        texts.push(editable.value);
                    });
                    this.applyNormalFace(texts);
                    this.scale();
                }, 50);
            });
        });
        //setFocus
        this.setFocus(this.focusClassName);
    }

    applyNormalFace(texts = []) {
        const template = document.getElementById(this.normalFaceTemplateID).innerHTML;
        const html = Mustache.render(template, this.mustacheObject);
        this.face.innerHTML = html;
        this.transferTexts(texts);

        //editsymbol
        this.face.getElementsByClassName("editsymbol")[0].addEventListener("click", () => {
            this.applyEditableFace(texts);
            this.scale();
        });
    }

    transferTexts(texts = []) {
        const editables = [];
        this.editablesClassNames.forEach(editablesClassName => {
            editables.push(this.face.getElementsByClassName(editablesClassName)[0]);
        });
        //apply the texts on the editables, if necessary
        if (editables.length == 0 || (editables.length != texts.length && texts.length > 0)) {
            console.log("Error, editables.length != texts.length");
            return;
        } else if (texts.length > 0 && editables.length == texts.length) {
            for (let i = 0; i < editables.length; i++) {
                editables[i].value = texts[i];
                editables[i].innerHTML = texts[i];
            }
        }
        return editables;
    }

    //muss eindeutig innerhalb der session sein
    setFocus(className) {
        this.container.getElementsByClassName(className)[0].focus();
    }

    build() {
        return this.container;
    }

    scale() {
        for (let i = 0; i < this.editablesClassNames.length; i++) {
            const container = this.face.getElementsByClassName(this.editablesClassNames[i])[0];
            const scaling = this.scalings[i]
            if (scaling == "scaleFont") {
                let fontSize = 36;
                while ((container.scrollHeight > container.clientHeight || container.scrollWidth > 267) && fontSize > 5) {
                    fontSize = 0.95 * fontSize;
                    container.style.fontSize = fontSize + "px";
                }
            } else if (scaling == "scaleContainer") {
                if (container.scrollHeight > container.clientHeight) {
                    container.style.height = container.scrollHeight + "px";
                }
            }
        }
    }
}

document.getElementById("adder-circle").addEventListener("click", () => {
    const sessionBuilder = new ContainerBuilder("session", ["body-input"], ["scaleFont"]);
    document.getElementById("session-container").appendChild(sessionBuilder.build());
});