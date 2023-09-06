// Components
import IconButtonGroup from "../IconButtonGroup";

// Style
import { AiOutlineTable } from "react-icons/ai";
import { BsMap, BsLayoutSplit } from "react-icons/bs";
import "./HeadingBar.css";

// Interfaces and types
import { ButtonProps } from "../../types";

interface Props {
  fileName: string;
  passSelectedView: (name: string) => void;
}

export function HeadingBar(props: Props) {
  const viewToolButtons: ButtonProps[] = [
    { label: "Table", icon: AiOutlineTable },
    { label: "Split", icon: BsLayoutSplit },
    { label: "Map", icon: BsMap },
  ];

  return (
    <div className="heading-bar">
      <p className="file-name">{`Loaded file: ${props.fileName}`}</p>
      <IconButtonGroup
        groupName="Views"
        buttons={viewToolButtons}
        passSelectedTool={props.passSelectedView}
        defaultSelected="Map"
      />
      <div className="file-tool-button-container">
        <button className="file-tool-button">Load</button>
        <button className="file-tool-button">Export</button>
      </div>
    </div>
  );
}
