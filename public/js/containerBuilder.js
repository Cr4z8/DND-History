class ContainerBuilder {
    minimizerClassName = "minimizer";
    editClassName = "editsymbol";
    faceClassName = "face";
    focusClassName = "body-input";
    minimizeableClassName = "body-input";
    linkClassName = "link";
    editableFaceTemplateID = "editable-face-template";
    normalFaceTemplateID = "normal-face-template";

    // editablesClassNames.length != 0
    // scalings is a list of "scaleFont" or "scaleContainer"
    // containerData = {className, editablesClassNames, scalings, mustacheObject, texts}
    constructor(containerData, startFace) {
        this.containerData = containerData;
        this.SetupContainer();
        if (startFace == "editableFace") {
            this.applyEditableFace(this.containerData.texts);
        } else if (startFace == "normalFace") {
            this.applyNormalFace(this.containerData.texts);
        }
    }

    SetupContainer() {
        this.container = document.createElement('div');
        this.container.className = this.containerData.className;
        this.face = document.createElement("div");
        this.face.className = this.faceClassName;
        this.container.appendChild(this.face);
    }

    //editablesClassNames = classNames of the input objects
    //texts is an array that containes the text values of all the editables 
    applyEditableFace(texts = []) {
        const template = document.getElementById(this.editableFaceTemplateID).innerHTML;
        const html = Mustache.render(template, this.containerData.mustacheObject);
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
                    this.containerData.texts = [];
                    editables.forEach(editable => {
                        this.containerData.texts.push(editable.value);
                    });
                    this.containerData.save();
                    this.applyNormalFace(this.containerData.texts);
                    this.scale();
                }, 50);
            });
        });
        //setFocus
        this.setFocus(this.focusClassName);
    }

    applyNormalFace(texts = []) {
        const template = document.getElementById(this.normalFaceTemplateID).innerHTML;
        const html = Mustache.render(template, this.containerData.mustacheObject);
        this.face.innerHTML = html;
        this.transferTexts(texts);

        //minimizer
        const minimizer = this.face.getElementsByClassName(this.minimizerClassName)[0];
        if (minimizer != null) {
            minimizer.addEventListener("click", () => {
                const minimizeable = this.face.getElementsByClassName(this.minimizeableClassName)[0];
                if (minimizer.innerHTML == "verkleinern" && minimizeable.clientHeight > 150) {
                    minimizeable.style.height = "150px";
                    minimizer.innerHTML = "vergrößern";
                } else if (minimizer.innerHTML == "vergrößern") {
                    this.scale();
                    minimizer.innerHTML = "verkleinern";
                }
            });
        }

        //link
        const link = this.face.getElementsByClassName(this.linkClassName)[0];
        if (link != null) {
            link.addEventListener("click", () => {
                document.cookie = this.containerData.id;
            });
        }


        //editsymbol
        this.face.getElementsByClassName(this.editClassName)[0].addEventListener("click", () => {
            this.applyEditableFace(texts);
            this.scale();
        });
    }

    transferTexts(texts = []) {
        const editables = [];
        this.containerData.editablesClassNames.forEach(editablesClassName => {
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
    setFocus(className = this.focusClassName) {
        this.container.getElementsByClassName(className)[0].focus();
    }

    build() {
        return this.container;
    }

    scale() {
        for (let i = 0; i < this.containerData.editablesClassNames.length; i++) {
            const container = this.face.getElementsByClassName(this.containerData.editablesClassNames[i])[0];
            const scaling = this.containerData.scalings[i];
            if (scaling == "scaleFont") {
                let fontSize = 36;
                while ((container.scrollHeight > container.clientHeight || container.scrollWidth > container.clientWidth) && fontSize > 5) {
                    fontSize = 0.95 * fontSize;
                    container.style.fontSize = fontSize + "px";
                }
            } else if (scaling == "scaleContainer" && container.scrollHeight > container.clientHeight) {
                container.style.height = container.scrollHeight + "px";
            }
        }
    }
}