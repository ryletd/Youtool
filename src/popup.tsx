import { createRoot } from "react-dom/client";

import { App } from "@/extension/components/app";

import "@/styles/null.sass";
import "@/styles/global.sass";

const root = createRoot(document.getElementById("root")!);

root.render(<App />);
