class Sessions {
    constructor() {
        this.sessions = [];
    }

    addSession(name) {
        let session = new Session(name);
        this.sessions.push(session);
        return session;
    }
}

class Session {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

module.exports = { Users };
b