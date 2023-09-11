interface IExcelData {
  setColumns(columns): void;
  getColumns() : any[];
  setData(data): void;
  filename: String;
}

export default IExcelData;
