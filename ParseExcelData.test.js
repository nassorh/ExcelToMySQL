const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs'); // 'fs' module for file reading
const testConfig = require('./config/test-config');

const ParseExcelData = require(testConfig.parseExcelDataPath).default;
const ExcelReader = require(testConfig.parseExcelReaderPath).default;

// Import ExcelData after defining it
const ExcelData = require(testConfig.excelDataPath).default;

describe('ParseExcelData', () => {
  it('should parse an Excel file buffer and return an instance of ExcelData', () => {
    const excelData = new ExcelData("test");
    const excelReader = new ExcelReader();
    const excelParser = new ParseExcelData(excelData,excelReader);

    
    const excelBuffer = fs.readFileSync(testConfig.cleanCsvFilePath);
    const parsedData = excelParser.parse(excelBuffer);

    // Check if parsedData is an instance of ExcelData
    expect(parsedData).to.be.an.instanceOf(ExcelData);
  });

  it('should parse a CSV file buffer with missing data and replace with null', () => {
    const excelData = new ExcelData("test2");
    const excelReader = new ExcelReader();
    const excelParser = new ParseExcelData(excelData, excelReader);

    const excelBuffer = fs.readFileSync(testConfig.csvFileWithMissingDataPath);
    const parsedData = excelParser.parse(excelBuffer);

    // Check if parsedData is an instance of CSVData
    expect(parsedData).to.be.an.instanceOf(ExcelData);

    console.log(parsedData.data)
    // Check if missing data is replaced with null in the parsed data
    expect(parsedData.data).to.deep.equal([ 
      { Ethnicity: 'All', "Rate per 1,000 people": null, 'Number of arrests': 12 } 
    ]);
  });

  it('should catch an error with a CSV file buffer with missing header', () => {
    const csvData = new ExcelData("test3");
    const csvReader = new ExcelReader();
    const csvParser = new ParseExcelData(csvData, csvReader);

    const csvBuffer = fs.readFileSync(testConfig.csvFileWithMissingHeaderPath);

    // Use Chai's .throws() function to expect an error
    expect(() => csvParser.parse(csvBuffer)).to.throw(Error, 'Error parsing Excel data: Undefined Header');
});
});
