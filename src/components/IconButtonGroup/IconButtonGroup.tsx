// React
import React, { useState } from "react";

// Style
import "./IconButtonGroup.css";

// Interfaces and types
import { ButtonProps } from "../../types";

export interface Props {
  groupName: string;
  buttons: ButtonProps[];
  passSelectedTool: (name: string) => void;
  defaultSelected?: string;
}

export function IconButtonGroup(props: Props) {
  const defaultId =
    props.defaultSelected !== undefined
      ? props.buttons.findIndex(
        (button) => button.label === props.defaultSelected
      )
      : -1;

  const [clickedId, setClickedId] = useState<number>(defaultId);

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    const target = event.target as HTMLButtonElement;

    setClickedId(id);

    const button = target.closest("button");
    if (button !== null) {
      props.passSelectedTool(button.name);
    }
  };

  const buttons = props.buttons.map((button, index) => {
    const Icon = button.icon;

    return (
      <button
        key={index}
        name={button.label}
        title={button.label}
        onClick={(event) => handleButtonClick(event, index)}
        className={`${index === clickedId ? "active" : ""} tool-button`}
      >
        <Icon />
      </button>
    );
  });

  return (
    <div className="tool-button-container">
      <p className="tool-button-container-name">{`${props.groupName}: `}</p>
      {buttons}
    </div>
  );
}
