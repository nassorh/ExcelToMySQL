import IExcelParser from './IExcelParser';
import IExcelData from '../../Entites/IExcelData';
import IExcelReader from '../../ExternalService/ExcelReaders/IExcelReader';

class ParseExcelData implements IExcelParser {
    excelData: IExcelData;
    excelReader: IExcelReader;
  
    constructor(excelData: IExcelData, excelReader: IExcelReader) {
      this.excelReader = excelReader;
      this.excelData = excelData;
    }
  
    parse(fileBuffer: Buffer): IExcelData {
      try {
        this.excelReader.setWorkbook(fileBuffer)
        
        const sheetName = this.excelReader.getSheetName()
        const columns = this.excelReader.getColumns()
        const columns_datatypes = this.excelReader.getColumnsDataType()
        const data = this.excelReader.readExcel()
        
        this.excelData.filename = sheetName;
        this.excelData.setData(data);
        this.excelData.setColumns(columns);
        this.excelData.setColumnsDatatypes(columns_datatypes);
        return this.excelData;
      } catch (error) {
        throw new Error(`Error parsing Excel data: ${error.message}`);
      }
    }
  }
  
  export default ParseExcelData;

  