interface IExcelData {
  setColumns(columns): void;
  getColumns() : any[];
  setData(data): void;
  getData() : any[];
  filename: String;
}

export default IExcelData;
