import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [listOfX, setListOfX] = useState<Array<number>>([]);
  const [listOfY, setListOfY] = useState<Array<number>>([]);
  const [errorMessage, setErrorMessage] = useState("");

  function onChangeHandler(item: string, value: number) {
    if (item === "x") {
      setX(value);
    } else {
      setY(value);
    }

    // 正しくうごいていない
    if (x === undefined || y === undefined) {
      setErrorMessage("値を入力してください");
    }
  }

  function addItems() {
    if (listOfX && listOfY) {
      let newListOfX = listOfX;
      let newListOfY = listOfY;
      newListOfX.push(x);
      newListOfY.push(y);
      setListOfX(newListOfX);
      setListOfY(newListOfY);
    } else {
      console.log("なんか知らんがlistOfXかlistOfYがなくなってるよ");
    }

    setX(0);
    setY(0);
  }

  function onClickHandler() {
    // 算術平均
    // 標準偏差
    // 相関確認
  }

  return (
    <>
      <p>
        x: <input type="number" onChange={(e) => onChangeHandler("x", Number(e.target.value))} value={x} />
      </p>
      <p>
        y: <input type="number" onChange={(e) => onChangeHandler("y", Number(e.target.value))} value={y} />
      </p>
      <p>{errorMessage}</p>
      <button onClick={() => addItems()}>追加</button>
      <div>表</div>
      <p>{listOfX}</p>
      <p>{listOfY}</p>
      <button onClick={() => onClickHandler()}>計算</button>
    </>
  );
};

export default App;
