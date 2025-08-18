import { parse } from "csv-parse/sync";
import fs from "fs";

export const getFileData = (filePath: string): any => { //remove any 
    const csvData = fs.readFileSync(filePath, 'utf8');
    const records = parse(csvData, { columns: true, skip_empty_lines: true, delimiter: ';' });
    return records;
}