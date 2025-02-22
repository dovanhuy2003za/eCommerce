const mongoose=require('mongoose')
const os=require('os')
const process=require('process')
const _SECOND=5000
const countConnect=()=>{
    const numConnection=mongoose.connections.length
    console.log(`Number connection:: ${numConnection}`)
}
const checkOverload=()=>{
    setInterval( _ => {
        const numConnection=mongoose.connections.length
        const numCores=os.cpus().length;
        const totalMemory=process.memoryUsage().rss;
        const maxConnection=numCores*3;
        console.log(`numCores:: ${numCores}`)
        console.log(`totalMemory:: ${totalMemory/1024/1024}MB`)
        if (numConnection>maxConnection) {
            console.log('Overload connections')
        }
    },_SECOND)
}
module.exports={
    countConnect,
    checkOverload
}