document.getElementById("adder-circle").addEventListener("click", () => {
    const sessionBuilder = new ContainerBuilder("session", ["body-input"], ["scaleFont"]);
    document.getElementById("session-container").appendChild(sessionBuilder.build());
    sessionBuilder.setFocus();
});