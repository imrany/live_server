export default async function indexedDb(){
    return new Promise((resolve, reject)=>{
        const indexedDB =
        window.indexedDB 
    
        if (!indexedDB) {
            console.log("IndexedDB could not be found in this browser.");
            reject("IndexedDB could not be found in this browser.")
        }
    
        const dbName="anvel"
        const request = window.indexedDB.open(dbName, 3);
        request.onerror = (event:any) => {
            console.log(event.target.result)
            reject(event.target.result)
        };
    
        request.onsuccess=(event:any)=>{
            resolve(event.target.result);
        }

        request.onupgradeneeded = (event:any) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore("tabs", { keyPath: "id" });
            objectStore.createIndex("createdAt", ["createdAt"], { unique: false });
            objectStore.createIndex("name", ["name"], { unique: false });
            objectStore.createIndex("path", ["path"], { unique: true });
            objectStore.createIndex("type", ["type"], { unique: false }); 
            objectStore.createIndex("id", ["id"], { unique: true });
        };
    });
};
