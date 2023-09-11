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
}

export default XLSXReader;