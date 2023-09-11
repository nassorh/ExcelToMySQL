interface IExcelReader{
    setWorkbook(fileBuffer : Buffer) : void
    readExcel(): any[]
    getSheetName(): String
    getColumns(): any[]
}

export default IExcelReader;