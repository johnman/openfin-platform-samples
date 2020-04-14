export class Logger {
  constructor(id, textAreaElement) {
    if (id) {
      this.id = id + " : ";
    } else {
      this.id = "";
    }

    if (textAreaElement === undefined || textAreaElement === null) {
      this.writeToElement = text => {};
    }
    this.textAreaElement = textAreaElement;
  }

  writeToElement(text) {
    this.textAreaElement.value +=
      "- " + text + String.fromCharCode(13, 10) + String.fromCharCode(13, 10);
  }

  log(text) {
    console.log(this.id + text);
    this.writeToElement(text);
  }

  clear() {
    if (this.textAreaElement) {
      this.textAreaElement.value = "";
    }
  }
}
