import * as yargs from 'yargs';
import * as fs from 'fs';
import { excelToSQLConverter } from '../src/main'

const argv = yargs
    .usage('Usage: $0 <inputFile>')
    .demandCommand(1,'Please provide excel file path')
    .argv;

const inputFile = argv._[0]

fs.readFile(inputFile, (err,data) => {
    if(err){
        console.log('Error reading the input file', err)
        process.exit(1)
    }

    const sqlResult = excelToSQLConverter.convert(data);
    console.log("Result\n",sqlResult)
})