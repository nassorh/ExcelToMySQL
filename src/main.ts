import CSVData from './Entites/CSVData'
import ExcelReader from './ExternalService/ExcelReaders/XLSXReader'
import ExcelParser from './Adatpers/ExcelParser/ParseExcelData'
import SqlStatementGenerator from './Adatpers/SQLStatmentGenerators/CSVToSQLStatementGenerator'
import ExcelToSQLConverter from './UseCases/ExcelToSQLConverter'

// Entites 
const csvData = new CSVData()

//Excel Paraser
const excelReader = new ExcelReader()
const excelParser = new ExcelParser(csvData,excelReader)

//SQL Statment Genetor
const sqlStatementGenerator = new SqlStatementGenerator()

// Instance of ExcelToSQLConverter with injected dependencies
const excelToSQLConverter = new ExcelToSQLConverter(excelParser, sqlStatementGenerator);

export { excelToSQLConverter }; // Export excelToSQLConverter