let socket = io();
var globalSessionID = 0;

class SessionData {

    texts = [];
    className = "session";
    editablesClassNames = ["body-input"];
    scalings = ["scaleFont"];


    constructor(texts = []) {
        this.id = globalSessionID++;
        this.texts = texts;
    }

    // texts has always length 1 
    save() {
        console.log(this.id);
        socket.emit('saveSession', { id: this.id, bodyText: this.texts[0] });
    }
}

socket.on('connect', () => {
    socket.emit('loadSessions');
    socket.on('loadSessions', (sessions) => {
        //sessions = [{texts}]
        sessions.forEach((session) => {
            const sessionData = new SessionData(session.texts);
            const sessionBuilder = new ContainerBuilder(sessionData, "normalFace");
            document.getElementById("session-container").appendChild(sessionBuilder.build());
        });
    });


});


document.getElementById("adder-circle").addEventListener("click", () => {
    const sessionData = new SessionData();
    const sessionBuilder = new ContainerBuilder(sessionData, "editableFace");
    document.getElementById("session-container").appendChild(sessionBuilder.build());
    sessionBuilder.setFocus();
});