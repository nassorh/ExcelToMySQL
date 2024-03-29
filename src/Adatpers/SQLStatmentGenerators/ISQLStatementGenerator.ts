import IExcelData from '../../Entites/IExcelData'

interface ISQLStatementGenerator{
  generateInsertStatements(excelData: IExcelData): string
  generateCreateTableStatements(excelData: IExcelData): string
}

export default ISQLStatementGenerator;
