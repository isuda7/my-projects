type CodeGroup = {
    codeGroup: string;
    codes: Code[]
}
export type Code = {
    code: string;
    groupCode: string;
    description: string;
    value: string;
}

export default CodeGroup;