export const cleanQueryUtil = (value: unknown): string => {
    return value ? String(value).toLowerCase() : ""
}