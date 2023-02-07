


export const fetchEarthquake = () => {
    fetch(
        "https://github.com/Raul-Reutov/pattern-ag-react-interview-question/blob/main/data/earthquakes.geojson"
    )
        .then((response) => response.json())
        .then((geojson) => {
            console.log("my_data: ", geojson);

        })
}