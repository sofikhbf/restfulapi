module.exports={
    apps:[
        {
            name: "testdb1",
            script: "../../bin/www",
            watch: true,
            exec_mode: "cluster",
            instance: "max",
        },
    ],
}