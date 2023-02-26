import { useState, useEffect } from "react";
import { Switch } from "antd";

import { getItem } from "@/chrome/storage/get-item";
import { setItem } from "@/chrome/storage/set-item";

import type { AttachPosition } from "@/types/attach-position";
import type { Storage } from "@/types/storage";

export const Attach = () => {
  const [position, setPosition] = useState<AttachPosition>({});

  const attachBlock = async (state: AttachPosition) => {
    setPosition(state);

    await setItem("attach", state);
  };

  useEffect(() => {
    const loadSavedSettings = async () => {
      const storage = await getItem<Storage>(["attach"]);

      if (storage?.attach) {
        setPosition(storage.attach);
      }
    };

    loadSavedSettings();
  }, []);

  return (
    <div>
      <h3 className="subtitle">Top left</h3>
      <Switch
        checkedChildren="Enabled"
        unCheckedChildren="Disabled"
        checked={position.topLeft}
        onChange={(enable: boolean) => attachBlock({ topLeft: enable })}
      />
      <h3 className="subtitle">Bottom left</h3>
      <Switch
        checkedChildren="Enabled"
        unCheckedChildren="Disabled"
        checked={position.bottomLeft}
        onChange={(enable: boolean) => attachBlock({ bottomLeft: enable })}
      />
    </div>
  );
};
