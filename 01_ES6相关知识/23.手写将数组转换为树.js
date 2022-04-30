// 例如将 input 转成output的形式
let input = [
    {
        id: 1, val: '学校', parentId: null
    }, {
        id: 2, val: '班级1', parentId: 1
    }, {
        id: 3, val: '班级2', parentId: 1
    }, {
        id: 4, val: '学生1', parentId: 2
    }, {
        id: 5, val: '学生2', parentId: 2
    }, {
        id: 6, val: '学生3', parentId: 3
    },
]

function arrayToTree(array) {
    // 先查询到根节点的索引
    const rootIndex = array.findIndex((item) => item.parentId === null)

    // 获取到根节点,并将根节点从数组中移除
    const root = array.splice(rootIndex, 1)[0]
    const tree = {
        id: root.id,
        val: root.val,
        children: array.length > 0 ? toTree(array, root.id) : []
    }

    return tree
}

function toTree(array, parentId) {
    const children = []
    let len = array.length
    for (let i = 0; i < len; i++) {
        let node = array[i]
        if (node.parentId === parentId) {
            children.push({
                id: node.id,
                val: node.val,
                // 通过递归调用该方法来进行处理
                children: toTree(array, node.id)
            })
        }
    }

    return children
}

// function arrayToTree(array) {
//     const rootIndex = array.findIndex((item) => item.parentId === null)

//     const root = array.splice(rootIndex, 1)[0]
//     console.log(root, array);
// }

const tree = arrayToTree(input)
console.log(tree)
console.log(tree.children)
console.log(tree.children[0].children)

// console.log(input.shift())
// console.log(input)

// let output = {
//     id: 1,
//     val: '学校',
//     children: [{
//         id: 2,
//         val: '班级1',
//         children: [
//             {
//                 id: 4,
//                 val: '学生1',
//                 children: []
//             },
//             {
//                 id: 5,
//                 val: '学生2',
//                 children: []
//             }
//         ]
//     }, {
//         id: 3,
//         val: '班级2',
//         children: [{
//             id: 6,
//             val: '学生3',
//             children: []
//         }]
//     }]
// }