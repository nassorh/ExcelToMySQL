import IExcelData from '../../Entites/IExcelData';
import IExcelReader from '../../ExternalService/ExcelReaders/IExcelReader';

interface IExcelParser {
    excelData: IExcelData;
    excelReader: IExcelReader;
    parse(fileBuffer: Buffer): IExcelData;
}

export default IExcelParser;
