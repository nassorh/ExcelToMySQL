import ISQLStatementGenerator from './ISQLStatementGenerator'
import IExcelData from '../../Entites/IExcelData'

class CSVToSQLStatementGenerator implements ISQLStatementGenerator {  
    constructor() {}
  
    generateInsertStatements(excelData: IExcelData): string {
        const insertStatements: string[] = [];

        for (const item of excelData.getData()) {
            const table_columns = Object.keys(item);
            
            const values = table_columns.map((column) => {
              const value = item[column];
              if (value === null) {
                return 'null';
              } else if (typeof value === 'string') {
                return `'${value}'`;
              } else if (typeof value === 'number' || typeof value === 'object') {
                return value.toString(); // Convert to a string, or format as needed
              } else {
                return value.toString(); // Fallback: convert to a string
              }
            });

            // Transform into (name_no_spaces, name, name)
            const formattedColumnNames = `(${table_columns.map(column => column.replace(/\s+/g, '_')).join(', ')})`;

            const insertQuery = `INSERT INTO ${excelData.filename} ${formattedColumnNames} VALUES (${values.join(', ')});`;
            insertStatements.push(insertQuery);
        }
        
        return insertStatements.join('\n');
    }
  }

export default CSVToSQLStatementGenerator;
