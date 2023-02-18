import { Tags } from "@/extension/components/ui/tags";
import { Restore } from "../../ui/restore";

import "./main-view.sass";

export const MainView = () => (
  <section className="main-view">
    <h2 className="title">Create speed buttons</h2>
    <Tags />
    <h2 className="title">Restore all settings</h2>
    <Restore />
  </section>
);
