import Axios from "axios";
import Dexie from 'dexie'
let db = new Dexie('Macroeconomics');

export const loadData = async () => {
    try {

        let res = await Axios.get("https://macro-econ-backend.herokuapp.com/load");
        console.log(res.data)

        await db.delete();
        db = new Dexie('Macroeconomics');

        let storesList = {};
        for (const [key, value] of Object.entries(res.data.tables)) {
            if (key === "ANNOTATIONS") {
                storesList[key] = "[table_name+country], annotation"
            } else {
                storesList[key] = "Year, India, China, USA"
            }
        }

        await db.version(1).stores(
            storesList
        )

        for (const [key, value] of Object.entries(res.data.tables)) {
            db[key].bulkAdd(value).then(function (lastKey) {
                console.log("Loaded " + key);
            }).catch(Dexie.BulkError, function (e) {
                console.log("Failed loading " + key);
            });
        }
        console.log("Load Success")
    } catch (error) {
        console.log(error)
        console.log("Error in Load")
    }
};

export const fetchData = async (table, country, yearFrom, yearTo) => {
    let response = {
        rows: [],
        annotation: ""
    };
    await db.open();
    try {
        var start = Date.now();
        let tables = await db.tables;
        console.log(tables)
        if (tables.length === 0) await loadData();

        let tableFound = false;
        db.tables.forEach(function (tab) {
            if (tab.name == table) tableFound = true;
        });
        if (!tableFound) return response;
        const annotation_table = "ANNOTATIONS";
        let rows = await db[table].where("Year").between(yearFrom, yearTo, true, true).toArray();
        let annotations = await db[annotation_table].where(["table_name+country"]).equals([table, country]).toArray();

        response.rows = rows
            .filter(function (el) {
                if (el[country] !== null) return true;
                else return false;
            })
            .map(function (el) {
                if (el[country] !== null) return [el.Year, el[country]];
                else return;
            });

        if (annotations.length > 0) {
            response.annotation = annotations[0]["annotation"];
        } else {
            response.annotation = ""
        }

        console.log(response);
        var end = Date.now();
        console.log(`Execution time: ${end - start} ms`);
        return response;
    } catch (error) {
        console.log(error)
        return response;
    }
};
