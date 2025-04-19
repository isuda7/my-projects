import { useState, ChangeEvent, FormEvent } from "react";

type UseInputReturnType = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: FormEvent) => void
];

export default function useInput(
  initialValue: string,
  submitAction: (value: string | null) => void
): UseInputReturnType {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    submitAction(inputValue);
  };

  return [inputValue, handleChange, handleSubmit];
}
