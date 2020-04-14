import { Logger } from "/platform-messaging-channel/js/logger.js";

if (window.fin !== undefined) {
  window.addEventListener("DOMContentLoaded", async event => {
    let consoleElement = document.getElementById("console");
    let clearConsoleElement = document.getElementById("clear-console");
    let callChannelDoesNotExist = document.getElementById(
      "call-channel-action-doesnotexist"
    );
    let callChannelHelloWorld = document.getElementById(
      "call-channel-action-helloworld"
    );
    let logger = new Logger("viewOne", consoleElement);

    logger.log(
      "Connecting to channel : example ...waiting for channel to exist as wait: true option is passed."
    );

    clearConsoleElement.onclick = () => {
      logger.clear();
    };

    const client = await fin.InterApplicationBus.Channel.connect("example", {
      wait: true
    });

    callChannelDoesNotExist.disabled = false;
    callChannelHelloWorld.disabled = false;

    logger.log("Connected to channel.");

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

    await client.onDisconnection(evt => {
      logger.log(
        "Channel Provider disconnected",
        `uuid: ${evt.uuid}, name: ${evt.name}`
      );
      callChannelHelloWorld.disabled = true;
      callChannelDoesNotExist.disabled = true;
    });

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

    client.onError((action, error, identity) => {
      logger.log("OnError on client triggered by action:", action);
      logger.log(error.message);
    });

    callChannelHelloWorld.onclick = async () => {
      logger.log("Calling helloWorld on channel");
      await client.dispatch("helloWorld", "test payload");
    };

    callChannelDoesNotExist.onclick = async () => {
      logger.log(
        "Calling an action that shouldn't exist: doesNotExist on channel"
      );
      await client.dispatch("doesnotexist", "test payload");
    };
  });
}
