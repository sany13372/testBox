export const generateRandomId = ():string => {
    return Math.random().toString(36).slice(2, 11);
};