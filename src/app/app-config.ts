import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken("app.config");

export interface AppConfig {
  apiUrl: string;
  title: string;
}

export const TALENTED_DI_CONFIG: AppConfig = {
  apiUrl: 'http://127.0.0.1:8080/app_dev.php/',
  title: 'Dependency Injection'
};
