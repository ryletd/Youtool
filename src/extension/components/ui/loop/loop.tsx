import { useEffect, useState } from "react";
import { Switch } from "antd";

import { getItem } from "@/chrome/storage/get-item";
import { setItem } from "@/chrome/storage/set-item";

export const Loop = () => {
  const [loopButton, setLoopButton] = useState<boolean>(false);

  useEffect(() => {
    getItem("loopButton").then((result) => setLoopButton(result?.loopButton ?? true));
  }, []);

  const changeLoopButtonState = async (enabled: boolean) => {
    setLoopButton(enabled);
    await setItem("loopButton", enabled);
  };

  return (
    <div>
      <h3 className="subtitle">Loop</h3>
      <Switch
        checkedChildren="Enabled"
        unCheckedChildren="Disabled"
        checked={loopButton}
        onChange={changeLoopButtonState}
      />
    </div>
  );
};
