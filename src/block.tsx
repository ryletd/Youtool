import { createRoot } from "react-dom/client";

import { Block } from "@/block/components/block";

import { createRootElement } from "@/utils/create-root-element";

import "@/styles/null.sass";

createRootElement("youtool");

const root = createRoot(document.getElementById("youtool")!);

root.render(<Block />);
