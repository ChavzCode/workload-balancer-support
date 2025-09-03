import fs from "fs";
import { parse } from "csv-parse/sync";
import { ZERO } from "../constants/numbers.constants";

export const parseFile = (string: string, delimiter: string = ";"): unknown => {
    return parse(string, { columns: true, skip_empty_lines: true, delimiter });
}

export const getFileData = (filePath: string): any => { //remove any 
    const csvData = fs.readFileSync(filePath, 'utf8');
    return parseFile(csvData);
}

export async function getCsvHeaders(filePath: string): Promise<string[]> {
    const records = getFileData(filePath);
    const headers = Object.keys(records[ZERO])

    if (headers) {
        return headers;
    } else {
        return []
    }
}
