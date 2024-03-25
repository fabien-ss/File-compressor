var data = {
    "nom": "",
    "prenom": "koto"
};

var data2 = {
    "nom": "555",
    "prenom": "5koto"
};

for(let d in data){
    if(data2[d] != "" & data[d] != data2[d]){
        data[d] = data2[d];
    }
}

function mergeData(data, data2){
    for(let index in data){
        if(data2[index] != "" & data[index] != data2[index]){
            data[index] = data2[index];
        }
    }   
    return data;
}


