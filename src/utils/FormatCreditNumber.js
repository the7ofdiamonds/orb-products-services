export const FormatCreditNumber = (number) =>
    number.split('').reduce((seed, next, index) => {
        if (index !== 0 && !(index % 4)) seed += ' ';
        return seed + next;
    }, '');
