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

const newArr = arr.map(item => {
    return `${item.lat},${item.lat}_${item.lng},${item.lng}`
})

console.log(newArr);