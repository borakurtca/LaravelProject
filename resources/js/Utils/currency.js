/**
 * Türk Lirası formatında para gösterimi.
 */
export function formatPrice(value) {
    const number = typeof value === 'string' ? parseFloat(value) : value;

    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2,
    }).format(number || 0);
}
