import { ChangeEvent, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag } from "antd";

import { DEFAULT_SPEEDS } from "@/constants/default-speeds";

import { setItem } from "@/chrome/storage/set-item";
import { getItem } from "@/chrome/storage/get-item";

import "./speeds.sass";

export const Speeds = () => {
  const [speeds, setSpeeds] = useState<number[]>(DEFAULT_SPEEDS);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const addNewSpeed = () => {
    const speedRate = Number(inputValue);

    // 16 - max video speed in browser
    if (speedRate && speedRate <= 16 && !speeds.includes(speedRate)) {
      setSpeeds([...speeds, speedRate].sort());
    }

    setInputVisible(false);
    setInputValue("");
  };

  const removeSpeed = (removedSpeed: number) => {
    const filteredSpeeds = speeds.filter((speed) => speed !== removedSpeed);

    setSpeeds(filteredSpeeds);
  };

  useEffect(() => {
    const loadSavedSpeeds = async () => {
      const storage = await getItem("speeds");

      if (storage?.speeds?.length) {
        setSpeeds(storage.speeds);
      }
    };

    loadSavedSpeeds();
  }, []);

  useEffect(() => {
    const saveSpeeds = async () => {
      setItem("speeds", speeds);
    };

    saveSpeeds();
  }, [speeds]);

  return (
    <div className="speeds">
      {speeds.map((speed) => (
        <span key={speed}>
          <Tag
            closable
            className="speed"
            onClose={(event) => {
              event.preventDefault();
              removeSpeed(speed);
            }}
          >
            {speed}
          </Tag>
        </span>
      ))}
      {inputVisible ? (
        <Input
          type="text"
          size="small"
          className="speeds-input"
          value={inputValue}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => setInputValue(target.value)}
          onBlur={addNewSpeed}
          onPressEnter={addNewSpeed}
        />
      ) : (
        <Tag onClick={() => setInputVisible(true)}>
          <PlusOutlined />
          <span>New</span>
        </Tag>
      )}
    </div>
  );
};
