export abstract class ViewBase {
  protected parentElement: HTMLElement;

  protected data: any;

  constructor(parentSelector: string) {
    const element = document.querySelector(parentSelector) as HTMLDivElement;
    if (!element) {
      throw Error(`Unable element exists with parentSelector: ${parentSelector}`);
    }
    this.parentElement = element;
  }

  public render(data?: any): void {
    const markup = this.generateMarkup();

    this.clear();
    this.parentElement.innerHTML = markup;
  }

  public abstract generateMarkup(): string;

  public clear() {
    this.parentElement.innerHTML = "";
  }

  public show() {
    this.parentElement.classList.remove("hidden");
  }

  public hide() {
    this.parentElement.classList.add("hidden");
  }
}
