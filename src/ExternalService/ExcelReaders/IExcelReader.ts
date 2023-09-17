interface IExcelReader{
    setWorkbook(fileBuffer : Buffer) : void
    readExcel(): any[]
    getSheetName(): String
    getColumns(): any[]
    getColumnsDataType(): [string, string][]
}

export default IExcelReader;