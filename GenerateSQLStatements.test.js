const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs'); // 'fs' module for file reading
const testConfig = require('./config/test-config');

const SQLStatmentGenerator = require('./dist/Adatpers/SQLStatmentGenerators/CSVToSQLStatementGenerator').default
const ExcelData = require('./dist/Entites/CSVData').default

describe('Generating Create Table Statments', () => {
  it('should generate create table statments', () => {
    const excelData = new ExcelData();
    excelData.filename = "Test_Table"
    excelData.setColumnsDatatypes([
      ['Ethnicity','VARCHAR(255)'],
      ['Rate_per_1_000_people','VARCHAR(255)'],
      ['Number_of_arrests','INT']
    ])

    const sqlStatmentGenerator = new SQLStatmentGenerator();
    const result = sqlStatmentGenerator.generateCreateTableStatements(excelData)
    expect(result).to.deep.equal(`CREATE TABLE IF NOT EXISTS Test_Table (\nEthnicity VARCHAR(255),\nRate_per_1_000_people VARCHAR(255),\nNumber_of_arrests INT\n);`);   
  })

  it('should handle invaild datatype', () => {
    const excelData = new ExcelData();
    excelData.filename = "Test_Table"

    const result = () => {
      excelData.setColumnsDatatypes([
        ['Ethnicity','VARCHAR(255)'],
        ['Rate_per_1_000_people','VARCHAR(255)'],
        ['Number_of_arrests','INTX']
      ])
    }
    expect(result).to.throw(Error, 'An error occurred: Invalid Column Data Type');   
  })

  it('should handle mising datatypes', () => {
    const excelData = new ExcelData();
    excelData.filename = "Test_Table"

    const result = () => {
        excelData.setColumnsDatatypes([
        ['Ethnicity',],
        ['Rate_per_1_000_people','VARCHAR(255)'],
        ['Number_of_arrests','INT']
      ])
    }
    expect(result).to.throw(Error, 'An error occurred: Invalid Column Data Type');   
  })

});

describe('Generating Insert Statments', () => {
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

    excelData.setColumns([
      'Ethnicity','Rate_per_1_000_people','Number_of_arrests'
    ])

    const sqlStatmentGenerator = new SQLStatmentGenerator();
    const result = sqlStatmentGenerator.generateInsertStatements(excelData)
    
    const expectedStatements = [
      "INSERT INTO Test_Table (Ethnicity, Rate_per_1_000_people, Number_of_arrests) VALUES ('All', null, 12);",
      "INSERT INTO Test_Table (Ethnicity, Rate_per_1_000_people, Number_of_arrests) VALUES ('Some', 8, 24);",
      "INSERT INTO Test_Table (Ethnicity, Rate_per_1_000_people, Number_of_arrests) VALUES ('None', 2, 5);"
    ];

    expect(result).to.deep.equal(expectedStatements.join('\n'));    
  });

  it('should generate insert statements while handling the missing data', () => {
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

    excelData.setColumns([
      'Ethnicity','Rate_per_1_000_people','Number_of_arrests'
    ])

    const sqlStatmentGenerator = new SQLStatmentGenerator();
    const result = sqlStatmentGenerator.generateInsertStatements(excelData)
    
    const expectedStatements = [
      "INSERT INTO Test_Table (Ethnicity, Rate_per_1_000_people, Number_of_arrests) VALUES ('All', null, 12);",
      "INSERT INTO Test_Table (Ethnicity, Rate_per_1_000_people, Number_of_arrests) VALUES ('Some', 8, 24);",
      "INSERT INTO Test_Table (Ethnicity, Rate_per_1_000_people, Number_of_arrests) VALUES ('None', 2, 5);"
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