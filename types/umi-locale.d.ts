type formatValues = { [key: string]: string | number };
declare const formatMessage: (
  { id }: { id: string },
  values?: formatValues
) => string;
declare const getLocale: () => string;
declare const setLocale: (lang: string) => string;
declare class FormattedMessage extends React.Component<
  {
    id: string;
    values?: formatValues;
  },
  any
> {
  render(): JSX.Element;
}

declare module 'umi/locale' {
  export const formatMessage;
  export const setLocale;
  export const getLocale;
  export const FormattedMessage;
}
