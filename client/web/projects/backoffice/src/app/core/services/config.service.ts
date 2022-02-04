import { Injectable } from '@angular/core';
import { AppConfigModel } from '../models';

@Injectable()
export class ConfigService {
  appConfig: AppConfigModel;
}
