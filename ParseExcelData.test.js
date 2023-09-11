const {describe,it} = require('mocha');
const { expect } = require('chai');
const ExcelData = require('./src/Entites/ExcelData'); // Import the ExcelData class

const fs = require('fs'); // 'fs' module for file reading

const testConfig = require('./config/test-config');

const ParseExcelData = require(testConfig.parseExcelDataPath);

describe('ParseExcelData', () => {
  it('should parse an Excel file buffer and return an instance of ExcelData', () => {
    const excelParser = new ParseExcelData(new ExcelData());
    const excelBuffer = fs.readFileSync(testConfig.excelFilePath);
    const parsedData = excelParser.parse(excelBuffer);

    // Check if parsedData is an instance of ExcelData
    expect(parsedData).to.be.an.instanceOf(ExcelData);
  });
});
