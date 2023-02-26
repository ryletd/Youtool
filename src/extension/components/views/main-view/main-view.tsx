import { Tags } from "@/extension/components/ui/tags";
import { Attach } from "@/extension/components/ui/attach";
import { Restore } from "@/extension/components/ui/restore";

import "./main-view.sass";

export const MainView = () => (
  <section className="main-view">
    <h2 className="title">Create speed buttons</h2>
    <Tags />
    <h2 className="title">Attach speed buttons block</h2>
    <Attach />
    <h2 className="title">Restore all settings</h2>
    <Restore />
  </section>
);
