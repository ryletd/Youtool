import { ChangeEvent, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag } from "antd";

import { DEFAULT_SPEEDS } from "@/constants/default-speeds";

import { setItem } from "@/chrome/storage/set-item";
import { getItem } from "@/chrome/storage/get-item";

import "./tags.sass";

export const Tags = () => {
  const [tags, setTags] = useState<string[]>(DEFAULT_SPEEDS);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const addNewTag = () => {
    const speedRate = Number(inputValue);

    // 16 - max video speed in browser
    if (speedRate && speedRate <= 16 && !tags.includes(inputValue)) {
      setTags([...tags, inputValue].sort());
    }

    setInputVisible(false);
    setInputValue("");
  };

  const removeTag = (removedTag: string) => {
    const filteredTags = tags.filter((tag) => tag !== removedTag);

    setTags(filteredTags);
  };

  useEffect(() => {
    const loadSavedSpeeds = async () => {
      const storage = await getItem<{ speeds: string[] }>("speeds");

      if (storage?.speeds?.length) {
        setTags(storage.speeds);
      }
    };

    loadSavedSpeeds();
  }, []);

  useEffect(() => {
    const saveSpeeds = async () => {
      setItem("speeds", tags);
    };

    saveSpeeds();
  }, [tags]);

  return (
    <div className="tags">
      {tags.map((tag) => (
        <span key={tag}>
          <Tag
            closable
            className="tag"
            onClose={(event) => {
              event.preventDefault();
              removeTag(tag);
            }}
          >
            {tag}
          </Tag>
        </span>
      ))}
      {inputVisible ? (
        <Input
          type="text"
          size="small"
          className="tags-input"
          value={inputValue}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => setInputValue(target.value)}
          onBlur={addNewTag}
          onPressEnter={addNewTag}
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
