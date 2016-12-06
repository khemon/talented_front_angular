import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken("app.config");

export interface AppConfig {
  apiEndPoint: string;
  title: string;
}

export const TALENTED_DI_CONFIG: AppConfig = {
  apiEndPoint: 'http://127.0.0.1:8080/app_dev.php/',
  title: 'Dependency Injection'
};
