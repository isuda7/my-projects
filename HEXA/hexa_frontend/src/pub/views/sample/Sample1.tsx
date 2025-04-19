import { ChangeEvent, useState } from "react";
import Component from "../../components/sample/Component.tsx";

export default function ApiTest() {
  // ex

  const [inputValue, setInputValue] = useState("");

  const onChangeFunc = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickEvent = (query: string) => {
    // searchBookList(query).then((res) => {
    //   console.log(res);
    // });
    console.log("query", query);
  };
  return (
    <>
      <p>
        <span>APITEST</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          onChange={(e) => onChangeFunc(e)}
          value={inputValue}
        />
      </p>
      <p>
        <button type="submit" onClick={() => onClickEvent(inputValue)}>
          call
        </button>
      </p>
      <Component />
    </>
  );
}
