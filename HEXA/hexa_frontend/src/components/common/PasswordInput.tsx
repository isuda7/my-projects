import {useState} from "react";
import {Input, InputProps} from "@progress/kendo-react-inputs";
import {Button} from "@progress/kendo-react-buttons";

function PasswordInput(props: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const showPasswordHandle = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="pass-view">
            <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password를 입력하세요."
                {...props}
            />
            <Button
                size="small"
                fillMode="flat"
                className={`btn-view ${showPassword ? 'is-active' : ''}`}
                onMouseDown={showPasswordHandle}
            />
        </div>
    )
}

export default PasswordInput;