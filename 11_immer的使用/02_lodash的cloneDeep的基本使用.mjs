import _ from "lodash";

const state = {
  name: "廖浩东",
  age: 18,
  height: 1.88,
  friend: {
    names: ["curry", "kobe", "james", "jordan"],
    num: 4,
  },
};

const nextState = _.cloneDeep(state);
nextState.name = "皮彩艳";
nextState.friend.names.push("廖浩东");
nextState.friend.num++;

const nextState1 = _.cloneDeep(nextState);
nextState1.name = "咪咪";
nextState1.friend.names.push("皮彩艳");
nextState1.friend.num++;

console.log(state);
console.log(nextState);
console.log(nextState1);
