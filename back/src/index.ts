import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs";
import server from "./server";
import "reflect-metadata"

AppDataSource.initialize()
.then(res => {

    console.log('ON');
    
    server.listen(PORT, () => {
        console.log(`server iniciado en el puerto ${PORT}`);
        
    });
});
