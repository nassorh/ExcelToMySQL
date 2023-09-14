import IExcelData from './IExcelData';

class CSVData implements IExcelData {
    public filename: string;
    private columns: any[];
    private data: any[];
    private columnDatatypes: [string,string][];
    private regexPattern = /[\s,]+/g;
    private replacementString = '_';
    private tableColumnPattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Valid SQL table name pattern
    private validDataTypePattern = /^(VARCHAR\(\d+\)|INT|)$/i;


    constructor(){
    }

    getData() : any[]{
        return this.data;
    }
    
    getColumns() : any[]{
        return this.columns
    }
    
    setColumns(columns: any): void{
        const formattedColumnNames = columns.map(column => column.replace(this.regexPattern, this.replacementString));
        this.columns = formattedColumnNames
    }
    
    setColumnsDatatypes(columnDatatypes: [string,string][]): void{
        try{
            this.validateColumnDatatypes(columnDatatypes)
            for (let i = 0; i < columnDatatypes.length; i++) {
                const originalColumnName = columnDatatypes[i][0];
                const modifiedColumnName = originalColumnName.replace(this.regexPattern, this.replacementString);
                columnDatatypes[i][0] = modifiedColumnName;
            }
            this.columnDatatypes = columnDatatypes;
        }catch (error){
            throw new Error(`An error occurred: ${error.message}`)
        }
    }

    validateColumnDatatypes(columnDatatypes: [string, string][]): boolean {
        for (const [columnName, dataType] of columnDatatypes) {
            if (!this.isValidColumnName(columnName) || !this.isValidDataType(dataType)) {
                throw new Error("Invalid Column Data Type")
            }
        }
        return true;
    }

    isValidColumnName(columnName: string): boolean {
        return this.tableColumnPattern.test(columnName);
    }
    
    isValidDataType(dataType: string): boolean {
        if (dataType == null || dataType == undefined){
            return false
        }
        return this.validDataTypePattern.test(dataType);
    }
    
    getColumnsDatatypes() : [string,string][]{
        return this.columnDatatypes;
    }

    setData(data: any): void {
      this.data = data
    }
}

export default CSVData;
