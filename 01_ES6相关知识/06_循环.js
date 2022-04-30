const arr = [
    {
        lat: 1,
        lng: 2
    },
    {
        lat: 1,
        lng: 2
    },
    {
        lat: 1,
        lng: 2
    },
]

const obj = {
    name: "lhd",
    age: 18,
    height: 1.88
}

for (const key in arr) {
    console.log(key);
}
for (const key in obj) {
    console.log(key);
}
for (const key of arr) {
    console.log(key);
}
