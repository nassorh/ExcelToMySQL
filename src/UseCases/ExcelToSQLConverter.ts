import IExcelParser from '../Adatpers/ExcelParser/IExcelParser';

class ExcelToSQLConverter {
  private excelParser: IExcelParser;

  constructor(excelParser: IExcelParser) {
    this.excelParser = excelParser;
  }

  convert(): void {
    // Parse data
    // Convert data
  }
}

export default ExcelToSQLConverter;
