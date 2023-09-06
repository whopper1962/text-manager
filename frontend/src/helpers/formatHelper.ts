import moment from "moment";

export type Name = {
  firstName: string;
  lastName: string;
};

export const useFormatHelper = () => {
  const formaNameToFullName = (name: Name): string => {
    return `${name.lastName} ${name.firstName}`;
  };

  const formatDateToYyyyMmDd = (date: string | Date | undefined): string => {
    if (!date) return "";
    return moment(date).format("YYYY/MM/DD");
  };

  const formatDateToYyyyMmDdHhMmSs = (
    date: string | Date | undefined,
  ): string => {
    if (!date) return "";
    return moment(date).format("YYYY/MM/DD hh:mm:ss");
  };

  const formatNumberToPrice = (number?: string): string => {
    if (!number) return "";
    const formattedNumber = number
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return `¥ ${formattedNumber}`;
  };

  return {
    formaNameToFullName,
    formatDateToYyyyMmDd,
    formatNumberToPrice,
    formatDateToYyyyMmDdHhMmSs,
  };
};
