const UseUsd = (currency: string, price: string, rate: number) => {
  return currency == "Гривня"
    ? `${(Number(price) / rate).toFixed(0)} $`
    : `${Number(price).toFixed(0)} $`;
};

export default UseUsd;
