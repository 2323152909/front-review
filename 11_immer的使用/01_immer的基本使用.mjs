import produce from "immer";

const state = {
  name: "廖浩东",
  age: 18,
  height: 1.88,
  friend: {
    names: ["curry", "kobe", "james", "jordan"],
    num: 4,
  },
};

const nextState = produce(state, (draft) => {
  draft.name = "皮彩艳";
  draft.friend.names.push("廖浩东");
  draft.friend.num++;
});

const nextState1 = produce(nextState, (draft) => {
  draft.name = "咪咪";
  draft.friend.names.push("皮彩艳");
  draft.friend.num++;
});

console.log(state);
console.log(nextState);
console.log(nextState1);
