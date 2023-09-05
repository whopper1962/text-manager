import { setLocale } from "yup";

export const setValidateMessage = (): void => {
  setLocale({
    mixed: {
      required: "この項目は必須項目です。",
      oneOf: `パスワードと一致しません。`,
    },
    string: {
      email: "メールアドレスの形式で入力してください。",
      min: (x) => `${x.min}文字以上で入力してください。`,
    },
  });
};
