type PriceFormatConfig = {
    locale?: string;
    currency?: string;
};

export function formatPrice(
    price: number,
    { locale = 'en-US', currency = 'USD' }: PriceFormatConfig = {},
): string {
    return new Intl.NumberFormat(locale, {
        currency,
        style: 'currency',
        minimumFractionDigits: 2,
    }).format(price);
}
