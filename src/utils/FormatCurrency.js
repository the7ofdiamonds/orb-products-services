export const FormatCurrency = (number, locales, currency) => {
    const Number = number / 100;
    const Locales = locales ? locales.toLowerCase() : 'us';
    const Currency = currency || 'USD';

   return new Intl.NumberFormat(Locales, {
        style: 'currency',
        currency: Currency,
    }).format(Number);
}