import Vue from 'vue';
import Vuex from 'vuex';
import idCreator from '@/lib/idCreator';

Vue.use(Vuex);

type storeState = {
    selectedTags: string[];
    tagList: string[];
    recordList: RecordItem[];
    // tagListError: '' | 'duplicate';
    // currentRecord: RecordItem | undefined;
    // recordListError: '' | 'notfound';
}
const store = new Vuex.Store({
    state: {
        selectedTags: [],
        tagList: JSON.parse(window.localStorage.getItem('tag-list') || '[]'),
        recordList: JSON.parse(window.localStorage.getItem('record-list') || '[]')
    } as storeState,
    mutations: {
        selectedTags(state, tags) {
            state.selectedTags = tags;

        },
        insertTag(state, tag) {
            if (state.tagList) {
                if (state.tagList.indexOf(tag!) >= 0)
                    window.alert('该标签已存在');
                else
                    state.tagList.push(tag);
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state.tagList.push(tag);
            }
            store.commit('saveTag');
        },
        saveTag(state) {
            window.localStorage.setItem('tag-list', JSON.stringify(state.tagList));
        },
        insertRecord(state, record) {
            record.id = idCreator();
            state.recordList.push(record);
            store.commit('saveRecord');
        },
        saveRecord(state) {
            window.localStorage.setItem('record-list', JSON.stringify(state.recordList));
        },
    },
    actions: {},
    modules: {}
});
export default store;