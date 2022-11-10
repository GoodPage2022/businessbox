const UseUah = (currency: string, price: string, rate: number) => {
  return currency == "Гривня"
    ? `${Number(price).toFixed(0)} грн`
    : `${(Number(price) * rate).toFixed(0)} грн`;
};

export default UseUah;
