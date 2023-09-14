import IExcelData from './IExcelData';

class CSVData implements IExcelData {
    public filename: string;
    private columns: any[];
    private data: any[];
    private columnDatatypes: [string,string][];
    private regexPattern = /[\s,]+/g;
    private replacementString = '_';

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
        for (let i = 0; i < columnDatatypes.length; i++) {
            const originalColumnName = columnDatatypes[i][0];
            const modifiedColumnName = originalColumnName.replace(this.regexPattern, this.replacementString);
            columnDatatypes[i][0] = modifiedColumnName;
        }
        this.columnDatatypes = columnDatatypes;
    }

    getColumnsDatatypes() : [string,string][]{
        return this.columnDatatypes;
    }

    setData(data: any): void {
      this.data = data
    }
}

export default CSVData;
