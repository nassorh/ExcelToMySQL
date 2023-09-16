import * as XLSX from 'xlsx';
import IExcelReader from './IExcelReader';

class XLSXReader implements IExcelReader{
    private workbook : any;

    setWorkbook(fileBuffer : Buffer) : void{
        this.workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    }

    getSheetName() : String{
        const sheetName = this.workbook.SheetNames[0];
        return sheetName
    }

    readExcel() : any[]{
        const sheetName = this.workbook.SheetNames[0];
        const worksheet = this.workbook.Sheets[sheetName];
  
        const data = XLSX.utils.sheet_to_json(worksheet, {
            defval: null,     // Treat missing values as null
            blankrows: false, // Skip rows with entirely empty cells
          });          
        return data;
    }

    getColumns(): any[]{
        const sheetName = this.workbook.SheetNames[0];
        const worksheet = this.workbook.Sheets[sheetName];
         
        // Get column names (headers)
        const columnNames = [];
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { c: C, r: range.s.r }; // Assuming headers are in the first row
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const cell = worksheet[cellRef];

            try{
                columnNames.push(cell.v); // `cell.v` contains the value of the header cell
            } catch(error){
                throw new Error(`Error parsing Excel data: Undefined Header`);
            }
            
        }

        return columnNames;
    }

    getColumnsDataType(): [string, string][]{
        const sheetName = this.workbook.SheetNames[0];
        const worksheet = this.workbook.Sheets[sheetName];

        const columnInfo = [];
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { c: C, r: range.s.r }; // Assuming headers are in the first row
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const cell = worksheet[cellRef];

            try {
                const columnName = cell.v; // `cell.v` contains the value of the header cell

                // Determine the datatype by examining the data in the column
                let cellDatatype = null; // Default to null
                for (let R = range.s.r + 1; R <= range.e.r; ++R) {
                    const dataCellAddress = { c: C, r: R };
                    const dataCellRef = XLSX.utils.encode_cell(dataCellAddress);
                    const dataCell = worksheet[dataCellRef];
                    cellDatatype = typeof dataCell.v;
                    if (cellDatatype == 'string'){
                        cellDatatype = "VARCHAR(255)"
                    }else if (cellDatatype == 'number'){
                        cellDatatype ="INT"
                    }
                }

                columnInfo.push([columnName, cellDatatype]);
            } catch (error) {
                throw new Error(`Error parsing Excel data: Undefined Header`);
            }
        }
        return columnInfo;
    }
}

export default XLSXReader;