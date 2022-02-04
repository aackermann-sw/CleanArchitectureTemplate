import { AppConfigModel } from '@cad-core/models';

export const configServiceMock = {
  get appConfig(): AppConfigModel {
    return { apiIdentityUrl: 'fakeIdentityUrl', apiEntitiesUrl: 'fakeEntitiesUrl' };
  },

  loadAppConfig() {
    return new Promise<void>(() => {});
  },
};
