class AdventureCards {
    constructor() {
        this.adventureCards = [];
    }

    addAdventureCard(id, headerText, date, bodyText) {
        let adventureCard = new AdventureCard(headerText, date, bodyText);
        this.adventureCards.push(adventureCard);
    }

    getAdventureCard(id) {
        return this.adventureCards.filter((card) => card.id === id)[0];
    }
}

class AdventureCard {
    constructor(id, headerText, date, bodyText) {
        this.id = id;
        this.headerText = headerText;
        this.date = date;
        this.bodyText = bodyText;
    }
}