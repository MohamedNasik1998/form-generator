export type Option = {
    label: string;
    value: boolean;
};

export type FormField = {
    label: string;
    type: string;
    isRequired: boolean;
    value?: string;
    options?: Option[];

};