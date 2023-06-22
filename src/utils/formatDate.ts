const FormatDate = (date: Date) => {
  //  format date to dd/mm/yyyy hh:mm
  const dateFormated = new Date(date);
  const day = dateFormated.getDate();
  const month = dateFormated.getMonth() + 1;
  const year = dateFormated.getFullYear();
  const hours = dateFormated.getHours();
  const minutes = dateFormated.getMinutes();

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default FormatDate;
