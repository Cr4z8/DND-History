let socket = io();
var globalCardID = 0;

class AdventureCardData {

    texts = [];
    className = "adventure-card";
    editablesClassNames = ["header-input", "body-input"];
    scalings = ["scaleFont", "scaleContainer"];

    constructor(sessionID, texts = []) {
        this.id = globalCardID++;
        this.sessionID = sessionID;
        this.texts = texts;
        const date = new Date();
        this.mustacheObject = { date: date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() };
    }

    // texts has always length 2 
    save() {
        socket.emit('saveAdventureCard', { sessionID: this.sessionID, cardID: this.id, texts: this.texts });
    }
}

socket.on('connect', () => {
    socket.emit('loadAdventureCards', document.cookie);
    socket.on('loadAdventureCards', (adventureCards) => {
        if (adventureCards == null) return;
        adventureCards.forEach((card) => {
            const adventureCardData = new AdventureCardData(document.cookie, card.texts);
            const adventureCardBuilder = new ContainerBuilder(adventureCardData, "normalFace");
            document.getElementById("adventure-card-container").appendChild(adventureCardBuilder.build());
        });
    });
});


document.getElementById("adder-circle").addEventListener("click", () => {
    const adventureCardData = new AdventureCardData(document.cookie);
    const adventureCardBuilder = new ContainerBuilder(adventureCardData, "editableFace");
    document.getElementById("adventure-card-container").appendChild(adventureCardBuilder.build());
    adventureCardBuilder.setFocus();
});

/*
was speichern?
create Table Session (id, name, Primary Key {id})
create Table AdventureCard(id, header, body, sessionID, Primary Key {id}, Foreign Key(sessionID) References Session.id)

wie id handeln?
id wird zu jedem containerData dazugespeichert. 
beim laden wird die id so benutzt, wie sie in der Datenbank vorhanden ist.
beim speichern wird dir id um eins erhöht. 

auf dem server werden in einer Liste, die sessions und die adventureCards gespeichert, deren Zustand konsistent mit der Datenbank ist.

*/