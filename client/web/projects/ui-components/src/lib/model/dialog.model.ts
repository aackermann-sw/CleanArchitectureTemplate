export class DialogModel {
  public noLabel: string;
  public yesLabel: string;
  public body: string;
  public itemIcon: string;
  public itemName: string;
  public confirmButtonIcon: string;
  public cancelButtonIcon: string;

  constructor(
    noLabelValue: string,
    yesLabelValue: string,
    bodyValue: string,
    itemIconValue?: string,
    itemNameValue?: string,
    confirmButtonIconValue?: string,
    cancelButtonIconValue?: string
  ) {
    this.noLabel = noLabelValue;
    this.yesLabel = yesLabelValue;
    this.body = bodyValue;
    this.itemIcon = itemIconValue;
    this.itemName = itemNameValue;
    this.confirmButtonIcon = confirmButtonIconValue;
    this.cancelButtonIcon = cancelButtonIconValue;
  }
}
