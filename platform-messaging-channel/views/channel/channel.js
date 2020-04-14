import { Logger } from "/platform-messaging-channel/js/logger.js";

if (window.fin !== undefined) {
  window.addEventListener("DOMContentLoaded", async event => {
    // entity creates a channel and becomes the channelProvider
    let channelProvider;
    let connectedClients = [];
    let beforeActionRegister = {};
    let afterActionRegister = {};
    let connectionCounter = document.getElementById("number-of-clients");
    let consoleElement = document.getElementById("console");
    let clearConsoleElement = document.getElementById("clear-console");
    let callNonExistentClientAction = document.getElementById(
      "call-channel-provider-all-clients-nonexistent"
    );
    let callClientsErrorAction = document.getElementById(
      "call-channel-provider-all-clients-error"
    );
    let callLastClientElement = document.getElementById(
      "call-channel-provider-last-client"
    );
    let callAllClientsElement = document.getElementById(
      "call-channel-provider-all-clients"
    );
    let destroyChannelElement = document.getElementById("destroy-channel");
    let createChannelElement = document.getElementById("create-channel");
    let removeActionElement = document.getElementById("remove-action");

    let logger = new Logger("channel", consoleElement);

    const onConnection = async (identity, payload, y) => {
      connectedClients = connectedClients.filter(
        connectedClient =>
          connectedClient.uuid !== identity.uuid ||
          connectedClient.name !== identity.name
      );
      connectedClients.push(identity);
      updateConnectionDisplay();
      logger.log(
        "The following client connected: " +
          JSON.stringify(identity) +
          " and passed the following payload: " +
          JSON.stringify(payload)
      );
    };

    const onDisconnection = (identity, x, y) => {
      logger.log(
        "The following client disconnected: " + JSON.stringify(identity)
      );
      connectedClients = connectedClients.filter(
        connectedClient =>
          connectedClient.uuid !== identity.uuid ||
          connectedClient.name !== identity.name
      );
      updateConnectionDisplay();
    };

    const onError = (action, error, identity) => {
      logger.log("uncaught Exception in action:", action);
      logger.log(error.message);
    };

    const beforeAction = (action, payload, identity) => {
      logger.log(
        "Before Action called on the channel. Caller:" +
          JSON.stringify(identity) +
          " payload: " +
          JSON.stringify(payload) +
          " action: " +
          action
      );
      let actionHandler = beforeActionRegister[action];
      if (actionHandler !== undefined) {
        return actionHandler(payload, identity);
      }
      return payload;
    };

    const afterAction = (action, payload, identity) => {
      logger.log(
        "After Action called on the channel. Caller:" +
          JSON.stringify(identity) +
          " payload: " +
          JSON.stringify(payload) +
          " action: " +
          action
      );
      let actionHandler = afterActionRegister[action];
      if (actionHandler !== undefined) {
        return actionHandler(payload, identity);
      }
      return payload;
    };

    const removeAction = async actionName => {
      logger.log(
        "Remove Action called on the channel. action to remove:" + actionName
      );
      await channelProvider.remove(actionName);
    };

    const register = async (actionName, callback) => {
      logger.log(
        "Register Action called on the channel. action to register:" +
          actionName
      );
      await channelProvider.register(actionName, callback);
    };

    const dispatchToClient = async (
      clientIdentity,
      clientAction,
      payloadForClient
    ) => {
      logger.log(
        "Dispatch to client called on channel: Client Identity: " +
          JSON.stringify(clientIdentity) +
          " Client action to target: " +
          clientAction +
          " payload to pass to client: " +
          JSON.stringify(payloadForClient)
      );
      return await channelProvider.dispatch(
        clientIdentity,
        clientAction,
        payloadForClient
      );
    };

    const publishToClient = async (clientAction, payloadForClient) => {
      logger.log(
        "Publish to client called on channel: Client action to target: " +
          clientAction +
          " payload to pass to client: " +
          JSON.stringify(payloadForClient)
      );
      return await channelProvider.publish(clientAction, payloadForClient);
    };

    const setDefaultAction = async (action, payload, identity) => {
      logger.log(
        `Client with identity ${JSON.stringify(
          identity
        )} has attempted to dispatch unregistered action: ${action}.`
      );

      // for demo purposes I am calling the client that called the channel with an unknown action. This allows a client to call itself
      // via the channel provider for demonstration purposes.
      await dispatchToClient(identity, action, payload);
    };

    const updateConnectionDisplay = () => {
      connectionCounter.innerText = connectedClients.length;
    };

    const createChannel = async () => {
      channelProvider = await fin.InterApplicationBus.Channel.create("example");
      channelProvider.onConnection(onConnection.bind(this));
      channelProvider.onDisconnection(onDisconnection.bind(this));
      channelProvider.onError(onError.bind(this));
      channelProvider.beforeAction(beforeAction.bind(this));
      channelProvider.afterAction(afterAction.bind(this));
      channelProvider.setDefaultAction(setDefaultAction.bind(this));

      updateConnectionDisplay();

      // expose a function on this channel
      await register("helloWorld", (payload, identity) => {
        logger.log("Action dispatched by client: " + JSON.stringify(identity));
        logger.log("Payload sent in dispatch: " + JSON.stringify(payload));

        return "From the channel: Hello World " + payload;
      });

      await register("removeAction", async (payload, identity) => {
        logger.log("Action dispatched by client: ", identity);
        logger.log("Payload sent in dispatch: ", payload);
        await removeAction(payload);
        return true;
      });

      callAllClientsElement.disabled = false;
      callLastClientElement.disabled = false;
      destroyChannelElement.disabled = false;
      removeActionElement.disabled = false;
      createChannelElement.disabled = true;
      callClientsErrorAction.disabled = false;
      callNonExistentClientAction.disabled = false;
    };

    const init = async () => {
      const listener = channelPayload => console.log(channelPayload);
      fin.InterApplicationBus.Channel.onChannelConnect(listener);
      fin.InterApplicationBus.Channel.onChannelDisconnect(listener);

      beforeActionRegister.helloWorld = (payload, identity) => {
        logger.log(
          "Before action for helloWorld has run for identity: " +
            JSON.stringify(identity)
        );
        return payload;
      };

      afterActionRegister.helloWorld = (payload, identity) => {
        logger.log(
          "After action for helloWorld has run for identity: " +
            JSON.stringify(identity)
        );
        return payload;
      };

      destroyChannelElement.onclick = async () => {
        await channelProvider.destroy();
        channelProvider = null;
        connectedClients.length = 0;
        connectedClients = [];
        destroyChannelElement.disabled = true;
        createChannelElement.disabled = false;
        callAllClientsElement.disabled = true;
        callLastClientElement.disabled = true;
        removeActionElement.disabled = true;
        callClientsErrorAction.disabled = true;
        callNonExistentClientAction.disabled = true;
        updateConnectionDisplay();
      };

      createChannelElement.onclick = async () => {
        await createChannel();
      };

      removeActionElement.onclick = async () => {
        removeAction("removeAction");
        removeActionElement.disabled = true;
      };

      callAllClientsElement.onclick = async () => {
        if (connectedClients.length === 0) {
          logger.log(
            "Unable to message all connected clients as we don't have any connected."
          );
        } else {
          await publishToClient(
            "clientHello",
            "Hello from the channel provider"
          );
        }
      };

      callNonExistentClientAction.onclick = async () => {
        if (connectedClients.length === 0) {
          logger.log(
            "Unable to call non-existent action on all connected clients as we don't have any connected."
          );
        } else {
          await publishToClient(
            "shouldNotExist",
            "Hello from the channel provider"
          );
        }
      };

      callClientsErrorAction.onclick = async () => {
        if (connectedClients.length === 0) {
          logger.log(
            "Unable to call error action on all connected clients as we don't have any connected."
          );
        } else {
          await publishToClient(
            "throwError",
            "Hello from the channel provider"
          );
        }
      };

      callLastClientElement.onclick = async () => {
        if (connectedClients.length === 0) {
          logger.log(
            "Unable to message last connected client as we don't have any connected."
          );
        } else {
          let lastConnectedClient =
            connectedClients[connectedClients.length - 1];
          await dispatchToClient(
            lastConnectedClient,
            "clientHello",
            "Hello to specific client from channel provider"
          );
        }
      };

      clearConsoleElement.onclick = () => {
        logger.clear();
      };
    };

    init();
  });
}
