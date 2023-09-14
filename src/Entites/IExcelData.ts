interface IExcelData {
  setColumns(columns): void;
  getColumns() : any[];
  setData(data): void;
  getData() : any[];
  setColumnsDatatypes(columnDatatypes: [string,string][]): void
  getColumnsDatatypes() : [string,string][]
  filename: String;
}

export default IExcelData;
