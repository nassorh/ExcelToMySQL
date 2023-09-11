class IExcelParser{
    constructor(){
        if(this.constructor == IExcelParser){
            throw new Error('Abstract classes cannot be instantiated directly.')
        }
    }

    parseCSV(fileBuffer){
        throw new Error('Method parseCSV must be implemented by subclasses.')
    }
}

module.exports = IExcelParser;