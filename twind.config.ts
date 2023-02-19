import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    fontFamily: {
      body: ['sofia-pro'],
      display: ['sofia-pro-soft'],
      serif: ['sofia-pro-condensed']
    },
    borderRadius: {
      'blob': '59% 41% 13% 58% / 64% 75% 25% 35%'
    }
  }
} as Options;
