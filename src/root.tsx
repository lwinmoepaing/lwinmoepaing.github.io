// @refresh reload
import { Show, Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import "./styles/my-animation.css";

import { settingStore } from "~/store/settingStore";
import { useStore } from "@nanostores/solid";
import Navbar from "./components/Common/Navbar/Navbar";
import MousePointer from "./components/Common/MousePointer/MousePointer";
import PwaReloadPrompt from "./components/PwaReloadPrompt/PwaReloadPrompt";

export default function Root() {
  const setting = useStore(settingStore);

  return (
    <Html lang="en" class={`${setting().darkmode ? "dark" : ""}`}>
      <Head>
        <Title>Lwin Moe Paing Dev</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="preload"
          href="/fonts/MyanmarSansPro.woff2"
          as="font"
          type="font/woff2"
         />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar&family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          href="/images/logo/icon-192x192.png"
          sizes="180x180"
        />
        <link rel="mask-icon" href="/images/mask.svg" color="#6366f1" />
        <meta name="theme-color" content="#6366f1" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <Body class={`dark:bg-black pt-[4rem] pb-[1rem] dark:text-slate-100`}>
        <Show when={typeof navigator !== "undefined"} fallback={<></>}>
          <PwaReloadPrompt />
        </Show>
        <MousePointer />
        <Navbar />
        <ErrorBoundary>
          <Suspense>
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
