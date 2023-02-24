import { Button } from "antd";

import { clearStorage } from "@/chrome/storage/clear";

import "./restore.sass";

export const Restore = () => {
  const restoreSettings = async () => {
    await clearStorage();
  };

  return (
    <Button className="restore-button" onClick={restoreSettings}>
      Restore
    </Button>
  );
};
