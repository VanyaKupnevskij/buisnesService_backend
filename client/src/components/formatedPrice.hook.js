function useFormatedPrice(number) {
  const integerPart = Number(number.toFixed(2)).toLocaleString();

  let parts = integerPart.split(',');
  if (!parts[1]) parts.push('00');
  parts[1] = parts[1].padEnd(2, '0');

  if (parts[0].length > 9) {
    return `${parts[0]}`;
  } else return `${parts[0]}.${parts[1]}`;
}

export default useFormatedPrice;
