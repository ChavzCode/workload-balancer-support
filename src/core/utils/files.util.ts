import fs from "fs";
import { parse } from "csv-parse/sync";
import { createObjectCsvWriter } from "csv-writer";
import { ZERO } from "../constants/numbers.constants";


export const getFileData = (filePath: string): any => { //remove any 
    const csvData = fs.readFileSync(filePath, 'utf8');
    const records = parse(csvData, { columns: true, skip_empty_lines: true, delimiter: ';' });
    return records;
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

export const writeOnFile = async (filePath: string, input: any) => {
    try {
        const headers = await getCsvHeaders(filePath);
        const mappedHeaders = headers.map(header => ({ id: header, title: header }));

        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header: mappedHeaders,
            append: true,
            encoding: 'utf8',
            recordDelimiter: '\n',
            fieldDelimiter: ';'
        })
        const data = [input];
        await csvWriter.writeRecords(data);
        return true;       
    } catch (error) {
        console.error(error);
        return false
    }
}