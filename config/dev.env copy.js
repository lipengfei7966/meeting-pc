'use strict'
const { merge } = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://data.ctgbs.com/base-api"',
  BPM_BASE_URL: '"http://localhost:8080/data"',
  WS_API: '"ws://data.ctgbs.com/base-api/ws"',
  PREVIEW_URL: '"http://localhost/preview/"',
  TOKEN_PREFIX: '"dev-"',
  DOMAIN: '""',
  SIGN_ENABLE: false,
  ENCRYPT_ENABLE: false,
  ROUTE_LOCAL: false,
  EXPAND_FLG: true,
  INIT_SEARCH: true,
  RSA_PUB_KEY: '"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPqYDyvSd9xBeUUrEW+MrlE0PPvC0TrnLLKCwEtZrwOov+0DCF2keutmMFz4wE2Q0ek+l1JQGMlOck5SLTXJ8Nruhp3Q5uXHqlHfTjR4jkiIA4L82CT8PM0rKaafhSGifKfdsK9fGIcCvpPgHAfW+37xe8dyLwPR+awpFOAOxlgQIDAQAB"',
  CONTEXT_ROOT: '""',
  DEFAULT_TENANT: '"8a4577dbd919675758d57999a1e891fe"',
  DEFAULT_ENTERPRISE: '"会展"',
  ATTACHMENT_TAB_FLG: true,
  ERROR_LOG: false,
  FUNC_AUTO_SEQ: true,
  DEFAULT_REMOTE_SIZE: 10,
  DEFAULT_EXCLOUD_CORP: '1001',
  DEFAULT_MORE_SHOW_FLG: true,
  SELECTED_ENABLE: false
})
