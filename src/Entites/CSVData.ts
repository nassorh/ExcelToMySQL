import IExcelData from './IExcelData';

class CSVData implements IExcelData {
    public filename: string;
    private columns: any[];
    private data: any[];

    constructor(){
    }

    getData() : any[]{
        return this.data;
    }
    
    getColumns() : any[]{
        return this.columns
    }
    
    setColumns(columns: any): void{
        this.columns = columns
    }

    setData(data: any): void {
      this.data = data
    }
}

export default CSVData;
