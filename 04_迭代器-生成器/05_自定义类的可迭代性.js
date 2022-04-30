class ClassRoom {
    constructor(address, name, students) {
        this.address = address
        this.name = name
        this.students = students
    }

    entry(name) {
        this.students.push(name)
    }

    [Symbol.iterator] = () => {
        let index = 0
        return {
            next: () => {
                if (index < this.students.length) {
                    return { done: false, value: this.students[index++] }
                } else {
                    return { done: true, value: undefined }
                }
            },
            return: () => {
                console.log("迭代器提前终止了");
                return { done: true, value: undefined }
            }
        }
    }
}

const classRoom = new ClassRoom("三楼302", "计算机教室", ["curry", "lhd", "kobe", "james", "durant", "jordan"])
classRoom.entry("wangwei")

for (const stu of classRoom) {
    console.log(stu);
    if (stu === "lhd") break;
}