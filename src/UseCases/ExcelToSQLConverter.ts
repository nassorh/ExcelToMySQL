import IExcelParser from '../Adatpers/ExcelParser/IExcelParser';
import ISQLStatementGenerator from '../Adatpers/SQLStatmentGenerators/ISQLStatementGenerator';

class ExcelToSQLConverter {
  private excelParser: IExcelParser;
  private sqlStatmentGenerator: ISQLStatementGenerator;

  constructor(excelParser: IExcelParser, sqlStatmentGenerator: ISQLStatementGenerator) {
    this.excelParser = excelParser;
    this.sqlStatmentGenerator = sqlStatmentGenerator
  }

  convert(fileBuffer: Buffer): string {
    // Parse data
    const excelData = this.excelParser.parse(fileBuffer);
    // Convert data
    const createTableStatment = this.sqlStatmentGenerator.generateCreateTableStatements(excelData);
    const createInsertStatment = this.sqlStatmentGenerator.generateInsertStatements(excelData);
    return createTableStatment + "\n" + createInsertStatment
  }
}

export default ExcelToSQLConverter;
