import { ChangeEvent, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag } from "antd";

import type { InputRef } from "antd";

export const Tags = () => {
  const [tags, setTags] = useState(["1", "1.5", "2", "2.5"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  const addNewTag = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const removeTag = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        {tags.map((tag) => (
          <span key={tag}>
            <Tag
              closable
              onClose={(event) => {
                event.preventDefault();
                removeTag(tag);
              }}
            >
              {tag}
            </Tag>
          </span>
        ))}
      </div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => setInputValue(target.value)}
          onBlur={addNewTag}
          onPressEnter={addNewTag}
        />
      ) : (
        <Tag onClick={() => setInputVisible(true)} contentEditable>
          <PlusOutlined />
          <span>New Tag</span>
        </Tag>
      )}
    </>
  );
};
