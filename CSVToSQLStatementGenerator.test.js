const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs'); // 'fs' module for file reading
const testConfig = require('./config/test-config');

const SQLStatmentGenerator = require('./dist/Adatpers/SQLStatmentGenerators/CSVToSQLStatementGenerator').default
const ExcelData = require('./dist/Entites/CSVData').default

describe('CSVToSQLStatementGenerator', () => {
  it('should generate insert statements', () => {
    const excelData = new ExcelData();
    excelData.filename = "Test_Table"
    excelData.setData([
      {
        Ethnicity: 'All',
        'Rate per 1,000 people': null,
        'Number of arrests': 12
      },
      {
        Ethnicity: 'Some',
        'Rate per 1,000 people': 8,
        'Number of arrests': 24
      },
      {
        Ethnicity: 'None',
        'Rate per 1,000 people': 2,
        'Number of arrests': 5
      }
    ]);

    const sqlStatmentGenerator = new SQLStatmentGenerator();
    const result = sqlStatmentGenerator.generateInsertStatements(excelData)
    
    const expectedStatements = [
      "INSERT INTO Test_Table (Ethnicity, Rate_per_1,000_people, Number_of_arrests) VALUES ('All', null, 12);",
      "INSERT INTO Test_Table (Ethnicity, Rate_per_1,000_people, Number_of_arrests) VALUES ('Some', 8, 24);",
      "INSERT INTO Test_Table (Ethnicity, Rate_per_1,000_people, Number_of_arrests) VALUES ('None', 2, 5);"
    ];

    expect(result).to.deep.equal(expectedStatements.join('\n'));    
  });

  it('should handle empty data', () => {
    const excelData = new ExcelData();
    excelData.filename = "Test_Table_2"
    excelData.setData([]);    

    const sqlStatmentGenerator = new SQLStatmentGenerator();
    const result = sqlStatmentGenerator.generateInsertStatements(excelData)
    expect(result).to.have.lengthOf(0);
  });
});
