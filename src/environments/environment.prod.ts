// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // production: true,
  // // AUTH_API :'https://bimaapi.finhaatinsurance.com/',
  // AUTH_API :'https://cdotapiuat.finhaat.com:9005/',
  // MASTER_API :'https://ifahmasterservice-dev.xyz/',
  // PAYMENT_URL:'https://finhaatpgiuat.finhaatinsurance.com/redirect/abhi/',
  // AUTH_API1: 'http://mgmt.finhaatinsurance.com',
  // POS_API :'https://finhaatproapi.finhaatinsurance.com/',//pos reg
  // hmr: true
  production: true,
  AUTH_API :'https://finhaatproapi.finhaatinsurance.com/',
  MASTER_API :'https://finhaatpromgmtapi.finhaatinsurance.com/',

  // for uat
  // AUTH_API :'https://finhaatproapiuat.finhaatinsurance.com:9090/',
  // MASTER_API :'https://mgmtuat.finhaatinsurance.com:9060/',
  
  hmr: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
