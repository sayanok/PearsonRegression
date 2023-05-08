import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [listOfX, setListOfX] = useState<Array<number>>([]);
  const [listOfY, setListOfY] = useState<Array<number>>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [averageOfX, setAverageOfX] = useState(0);
  const [averageOfY, setAverageOfY] = useState(0);
  const [standardDeviationOfX, setStandardDeviationOfX] = useState(0);
  const [standardDeviationOfY, setStandardDeviationOfY] = useState(0);
  const [listOfXDeviations, setListOfXDeviations] = useState<Array<number>>([]);
  const [listOfYDeviations, setListOfYDeviations] = useState<Array<number>>([]);
  const [correlationCoefficient, setCorrelationCoefficient] = useState<number>();
  const [correlation, setCorrelation] = useState("");

  function onChangeHandler(item: string, value: number) {
    if (item === "x") {
      setX(value);
    } else {
      setY(value);
    }

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
    calculateAverage();
    calculateStandardDeviation();
    findPearsonCorrelation();
  }

  function calculateAverage() {
    const lengthOfX = listOfX.length;
    let sumX = 0;
    let sumY = 0;

    for (let n = 0; n < lengthOfX; n++) {
      sumX += listOfX[n];
      sumY += listOfY[n];
    }

    setAverageOfX(sumX / lengthOfX);
    setAverageOfY(sumY / lengthOfX);
  }

  function calculateStandardDeviation() {
    const lengthOfX = listOfX.length;

    // xとyそれぞれの偏差を求める
    let listOfXDeviationsForStandardDeviation: Array<number> = [];
    let listOfYDeviationsForStandardDeviation: Array<number> = [];
    for (let n = 0; n < lengthOfX; n++) {
      listOfXDeviationsForStandardDeviation.push(listOfX[n] - averageOfX);
      listOfYDeviationsForStandardDeviation.push(listOfY[n] - averageOfY);
    }
    // 後の計算のために値をセットしておく
    setListOfXDeviations(listOfXDeviationsForStandardDeviation);
    setListOfYDeviations(listOfYDeviationsForStandardDeviation);

    // xとyそれぞれの分散を求める
    let sumOfSquaredDeviationsOfX = 0;
    let sumOfSquaredDeviationsOfY = 0;
    for (let n = 0; n < lengthOfX; n++) {
      sumOfSquaredDeviationsOfX += listOfXDeviationsForStandardDeviation[n] ** 2;
      sumOfSquaredDeviationsOfY += listOfYDeviationsForStandardDeviation[n] ** 2;
    }
    const dispersionOfX = sumOfSquaredDeviationsOfX / lengthOfX;
    const dispersionOfY = sumOfSquaredDeviationsOfY / lengthOfX;

    // 平方根をとる
    setStandardDeviationOfX(Math.sqrt(dispersionOfX));
    setStandardDeviationOfY(Math.sqrt(dispersionOfY));
  }

  function findPearsonCorrelation() {
    let sum = 0;
    for (let n = 0; n < listOfX.length; n++) {
      sum += listOfXDeviations[n] * listOfYDeviations[n];
    }
    const covariance = sum / listOfX.length;
    const result = covariance / (standardDeviationOfX * standardDeviationOfY);
    setCorrelationCoefficient(result);
    if ((-0.3 < result && result <= -0.1) || (0.1 <= result && result < 0.3)) {
      setCorrelation("相関なし");
    } else if ((-0.5 < result && result <= -0.3) || (0.3 <= result && result < 0.5)) {
      setCorrelation("中性");
    } else if ((-1 < result && result <= -0.5) || (0.5 <= result && result < 1)) {
      setCorrelation("相関あり");
    }
  }

  function clear() {
    setX(0);
    setY(0);
    setListOfX([]);
    setListOfY([]);
    setAverageOfX(0);
    setAverageOfY(0);
    setStandardDeviationOfX(0);
    setStandardDeviationOfY(0);
    setListOfXDeviations([]);
    setListOfYDeviations([]);
    setCorrelationCoefficient(0);
    setCorrelation("");
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
      <table>
        <tr>
          <th></th>
          <th>x</th>
          <th>y</th>
        </tr>
        {listOfX.map((x, index) => (
          <tr>
            <td></td>
            <td>{x}</td>

            <td>{listOfY[index]}</td>
          </tr>
        ))}
        <tr>
          <td>算術平均</td>
          <td>{averageOfX}</td>
          <td>{averageOfY}</td>
        </tr>
        <tr>
          <td>標準偏差</td>
          <td>{standardDeviationOfX}</td>
          <td>{standardDeviationOfY}</td>
        </tr>
        <tr>
          <td>相関</td>
          <td>{correlationCoefficient}</td>
          <td>{correlation}</td>
        </tr>
      </table>
      <button onClick={() => onClickHandler()} disabled={listOfX.length === 0 && listOfX.length === 0}>
        計算
      </button>
      <button onClick={() => clear()}>クリア</button>
    </>
  );
};

export default App;
