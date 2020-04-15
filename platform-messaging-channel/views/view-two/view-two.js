import { Logger } from "/platform-messaging-channel/js/logger.js";

if (window.fin !== undefined) {
  window.addEventListener("DOMContentLoaded", async event => {
    let consoleElement = document.getElementById("console");
    let callChannelHelloWorld = document.getElementById(
      "call-channel-action-helloworld"
    );
    let connectElement = document.getElementById("connect-client");
    let disconnectElement = document.getElementById("disconnect-client");
    let removeActionElement = document.getElementById("remove-action");
    let clearConsoleElement = document.getElementById("clear-console");
    let logger = new Logger("viewOne", consoleElement);
    let client;

    const connectToProvider = async () => {
      logger.log(
        "Connecting to channel : example ...waiting for channel to exist as wait: true option is passed."
      );

      client = await fin.InterApplicationBus.Channel.connect("example", {
        wait: true,
        payload: "token"
      });

      logger.log("Connected to channel.");

      logger.log("Channel Information available via returned client using client.providerIdentity : " + JSON.stringify(client.providerIdentity));

      logger.log("Registering throwError action on this client.");

      client.register("throwError", (payload, identity) => {
        logger.log(
          "Executing action throw-error that throws an exception to demonstrate the onError functionality"
        );
        throw new Error("Action error");
      });

      logger.log("Registering clientHello action on this client.");

      client.register("clientHello", (payload, identity) => {
        logger.log(
          "Action clientHello called by " +
            JSON.stringify(identity) +
            " with payload: " +
            JSON.stringify(payload)
        );
      });

      client.register("clientToRemove", (payload, identity) => {
        logger.log(
          "Action clientHello called by " +
            JSON.stringify(identity) +
            " with payload: " +
            JSON.stringify(payload)
        );
      });

      client.onError((action, error, identity) => {
        logger.log("OnError on client view two triggered by action:", action);
        logger.log(error.message);
      });

      client.beforeAction = (action, payload, identity) => {
        logger.log(
          "Before Action called on the channel client view two. Caller:" +
            JSON.stringify(identity) +
            " payload: " +
            JSON.stringify(payload) +
            " action: " +
            action
        );
        return payload;
      };

      client.afterAction = (action, payload, identity) => {
        logger.log(
          "After Action called on the channel client for view two. Caller:" +
            JSON.stringify(identity) +
            " payload: " +
            JSON.stringify(payload) +
            " action: " +
            action
        );
        return payload;
      };

      await client.setDefaultAction((action, payload, identity) => {
        logger.log(
          `Channel Provider with identity ${JSON.stringify(
            identity
          )} has attempted to dispatch unregistered action: ${action}.`
        );

        return {
          echo: payload
        };
      });

      await client.onDisconnection(evt => {
        logger.log(
          "Channel Provider disconnected",
          `uuid: ${evt.uuid}, name: ${evt.name}`
        );
        connectElement.disabled = false;
        disconnectElement.disabled = true;
        callChannelHelloWorld.disabled = true;
        removeActionElement.disabled = true;
      });
    };

    const removeAction = async actionName => {
      logger.log(
        "Remove Action called on the channel client for view two. action to remove:" +
          actionName
      );
      await client.remove(actionName);
    };

    const init = async () => {
      connectElement.onclick = async () => {
        await connectToProvider();
        disconnectElement.disabled = false;
        connectElement.disabled = true;
        callChannelHelloWorld.disabled = false;
        removeActionElement.disabled = false;
      };

      disconnectElement.onclick = async () => {
        await client.disconnect();
        connectElement.disabled = false;
        disconnectElement.disabled = true;
        callChannelHelloWorld.disabled = true;
        removeActionElement.disabled = true;
      };

      callChannelHelloWorld.onclick = async () => {
        logger.log("Calling helloWorld on channel");
        await client.dispatch("helloWorld", "test payload");
      };

      removeActionElement.onclick = async () => {
        await removeAction("clientToRemove");
      };

      clearConsoleElement.onclick = () => {
        logger.clear();
      };
    };

    init();
  });
}
