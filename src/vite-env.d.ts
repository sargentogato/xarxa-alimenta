/// <reference types="vite/client" />

declare module '*as=picture' {
  const out: {
    sources: { srcset: string; type: string }[];
    img: {
      src: string;
      w: number;
      h: number;
    };
  };
  export default out;
}

declare module '*&as=picture' {
  const out: {
    sources: { srcset: string; type: string }[];
    img: {
      src: string;
      w: number;
      h: number;
    };
  };
  export default out;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
  export default component;
}
