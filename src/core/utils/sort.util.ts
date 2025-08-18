import { ZERO, ONE } from "../constants/numbers.constants"

export const sortingFn = <D, R extends keyof D>(data: D[], reference: R, asc: boolean = true): D[] => {
    return asc ? sortingAscendingFn(data, reference) : sortDescendingFn(data, reference)
}

const sortingAscendingFn = <D, R extends keyof D>(data: D[], r: R): D[] => {
    try {
        const dataRef = data.sort((a, b) => {
            if (a[r] > b[r]) {
                return ONE
            } else if (a[r] < b[r]) {
                return -ONE
            }
            return ZERO;
        })
        return dataRef
    } catch (error) {
        console.error(error)
        return data
    }
}

const sortDescendingFn = <D, R extends keyof D>(data: D[], r: R): D[] => {
    try {
        const dataRef = data.sort((a, b) => {
            if (a[r] > b[r]) {
                return -ONE
            } else if (a[r] < b[r]) {
                return ONE
            }
            return ZERO;
        })
        return dataRef

    } catch (error) {
        console.error(error)
        return data
    }

}