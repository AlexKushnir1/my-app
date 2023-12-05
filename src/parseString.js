export const parseString = (string) => {
  const splitText = string.split("&");
  const queryData = new Map();

  splitText.map((item) => {
    const queryValue = item.split("=");

    queryData.set(queryValue[0], queryValue[1]);
  });

  return Object.fromEntries(queryData);
};
