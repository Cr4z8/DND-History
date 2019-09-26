var minmax = "";

document.getElementById("adder-circle").addEventListener("click", () => {
    const date = new Date();
    const adventureCardBuilder = new ContainerBuilder("adventure-card", ["header-input", "body-input"], ["scaleFont", "scaleContainer"], {
        date: date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    });
    document.getElementById("adventure-card-container").appendChild(adventureCardBuilder.build());
    adventureCardBuilder.setFocus();
});