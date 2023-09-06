import React, { ReactNode, useState } from "react";
import "./App.css";

interface HeaderProps {
  onchange: (e: string) => void;
  clickHandler: () => void;
  value: string;
}

const Header: React.FC<HeaderProps> = ({ onchange, value, clickHandler }) => {
  return (
    <div
      style={{
        borderRadius: "0.5rem",
        padding: "2rem",
        border: "solid 1px white",
        display: "flex",
        gap: "5rem",
      }}
    >
      <input
        onChange={(e) => {
          onchange(e.target.value);
        }}
        type="text"
        value={value}
      ></input>
      <button
        onClick={() => {
          clickHandler();
        }}
      >
        +
      </button>
    </div>
  );
};

interface ListProps {
  children: ReactNode;
  clearAllHandler: () => void;
}
const List: React.FC<ListProps> = ({ children, clearAllHandler }) => {
  return (
    <div
      style={{
        marginTop: "1rem",
        borderRadius: "0.5rem",
        padding: "2rem",
        border: "solid 1px white",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label>List</label>{" "}
        <button
          onClick={() => {
            clearAllHandler();
          }}
        >
          Clear
        </button>
      </div>
      <div>
        <hr></hr>
      </div>

      {children}
    </div>
  );
};

interface ListItemProps {
  listItem: string;
  itemID: number;
  deletehandler: (argument: number) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  deletehandler,
  itemID,
  listItem,
}) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "0.5rem",
      }}
    >
      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          type="checkbox"
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        ></input>
        <p className={isChecked ? "line_through" : ""}>{listItem}</p>
      </div>
      <button
        onClick={() => {
          deletehandler(itemID);
        }}
        style={{ border: "1px white solid", backgroundColor: "#9c2b2b" }}
      >
        X
      </button>
    </div>
  );
};

function App() {
  // Define an initial state of an empty string array, assuming you want an array of strings
  const initialArray: string[] = [];
  const [array, setArray] = useState<string[]>(initialArray);
  const [input, setInput] = useState("");

  const inputhandler = (e: string) => {
    setInput(e);
    console.log(input);
  };

  const clickHandler = () => {
    setArray((data) => [...data, input]);

    setInput("");
  };

  const buttonClearHandler = (id: number): void => {
    return setArray((crr) => crr.filter((_, index) => index !== id));
  };

  const clearAllHandler = () => {
    setArray([]);
  };

  return (
    <>
      <Header
        value={input}
        onchange={inputhandler}
        clickHandler={clickHandler}
      ></Header>
      <List clearAllHandler={clearAllHandler}>
        {array.map((item, _) => {
          return (
            <ListItem
              deletehandler={buttonClearHandler}
              key={_}
              itemID={_}
              listItem={item}
            ></ListItem>
          );
        })}
      </List>
    </>
  );
}

export default App;
