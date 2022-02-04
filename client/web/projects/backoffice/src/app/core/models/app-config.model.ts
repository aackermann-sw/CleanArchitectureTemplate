// Interface for the app config file
export interface AppConfigModel {
  apiIdentityUrl: string;
  apiEntitiesUrl: string;
  hubspotUrl: string;
  hubspotAccountId: string;
  forms: { newsletterId: string; contactUsId: string };
}
