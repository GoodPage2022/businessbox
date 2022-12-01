const UseUah = (currency: string, price: string, rate: number) => {
  const uah = Number(price).toFixed(0);
  const usd = (Number(price) * rate).toFixed(0);
  const uahFmt = new Intl.NumberFormat("ua-UA").format(Number(uah));
  const usdFmt = new Intl.NumberFormat("ua-UA").format(Number(usd));
  return currency == "Гривня" ? `${uahFmt} грн` : `${usdFmt} грн`;
};

export default UseUah;
