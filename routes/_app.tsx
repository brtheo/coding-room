import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>codingroom</title>
        <link rel="stylesheet" href="/Ellograph_CF/stylesheet.css"></link>
        <link rel="stylesheet" href="/v2.css"></link>
        <script defer type="module" src="/app.js"></script>
      </head>
      <body>
        <section class="container">
          <x-nav>
            <a href="/" class="card">Home page</a>
            <a href="/blog" class="card">Blog</a> 
            <a class="card">About</a>
            {/* <scheme-switcher></scheme-switcher> */}
          </x-nav>
          <Component />
        </section>
      </body>
    </html>
  );
}