const XLSX = require('xlsx');
const IExcelParser = require('./IExcelParser');

class ParseExcelData extends IExcelParser{
    constructor(excel_data){
        super();
        this.excel_data = excel_data
    }

    parse(fileBuffer){
        try{
            const workbook = XLSX.read(fileBuffer,{type:'buffer'});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const data = XLSX.utils.sheet_to_json(worksheet);
            
            this.excel_data.data = data
            return this.excel_data
        }catch(error){
            throw new Error(`Error parsing Excel data: ${error.message}`);
        }
    }
}

module.exports = ParseExcelData;
