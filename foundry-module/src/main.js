let websocket;

Hooks.once('init', () => {
    websocket = new WebSocket('ws://localhost:62124/fvtt');

    websocket.onmessage = msgEvent => {
        msgEvent.data.text().then(characterId => {
            const actor = game.actors.get(characterId);
            if (actor !== undefined) {
                sendActorData(actor);
            }
        });
    };

    Hooks.on('updateActor', sendActorData);
});

Hooks.once('ready', () => {
    console.info('Stream Com | Ready');
});

function sendActorData(actor) {
    const data = {
        _id: actor._id,
        name: actor.name,
        hp: actor.system.attributes.hp.value,
        hpMax: actor.system.attributes.hp.max,
        hpTemp: actor.system.attributes.hp.temp,
    }
    websocket.send(JSON.stringify(data));
}
