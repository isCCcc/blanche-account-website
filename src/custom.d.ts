// type TagItem = {
//     name: string;
// }
type RecordItem = {
    id?: number;
    tag: string[];
    type: string;
    note: string;
    amount: number;
    createAt?: Date;
}
type TabBarItem = {
    name: string;
    value: string;
}