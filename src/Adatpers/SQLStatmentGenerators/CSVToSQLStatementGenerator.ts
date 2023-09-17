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
            const formattedColumnNames = `(${excelData.getColumns().join(', ')})`;

            const insertQuery = `INSERT INTO ${excelData.filename} ${formattedColumnNames} VALUES (${values.join(', ')});`;
            insertStatements.push(insertQuery);
        }
        
        return insertStatements.join('\n');
    }

    generateCreateTableStatements(excelData: IExcelData): string {
      const tableName = excelData.filename;
      let createTableStatement = `CREATE TABLE IF NOT EXISTS ${tableName} (\n`;
      
      const columns = excelData.getColumnsDatatypes();
      for (const index in columns){
        let column = columns[index].join(" ");
        if (parseInt(index) < columns.length - 1) {
          // Add a comma and newline after all but the last column
          column += ",\n";
        }
        createTableStatement += column
      }
      
      createTableStatement += "\n);";
      return createTableStatement;
    }

  }

export default CSVToSQLStatementGenerator;
