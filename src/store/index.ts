import Vue from 'vue';
import Vuex from 'vuex';
import idCreator from '@/lib/idCreator';
import dayjs from 'dayjs';

Vue.use(Vuex);

type storeState = {
    selectedTags: string[];
    tagList: string[];
    recordList: RecordItem[];
    dailyExpense: { title: string, items: [], total: number }[];
    theDate: string;
}
const store = new Vuex.Store({
    state: {
        selectedTags: [],
        tagList: JSON.parse(window.localStorage.getItem('tag-list') || '["衣","食","住","行","工资","红包","医疗"]'),
        recordList: JSON.parse(window.localStorage.getItem('record-list') || '[]'),
        dailyExpense: JSON.parse(window.localStorage.getItem('daily-expense') || '[]'),
        theDate: window.localStorage.getItem('date') || dayjs().format('YYYY-MM')
    } as storeState,
    mutations: {
        initTags(state, tags) {
            window.localStorage.setItem('tag-list', JSON.stringify(tags));
        },
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
            record.createAt = record.createAt || new Date().toISOString();
            state.recordList.push(record);
            if (record.tags.length === 0) {
                record.tags = '其它';
            }
            store.commit('saveRecord');
        },
        saveRecord(state) {
            window.localStorage.setItem('record-list', JSON.stringify(state.recordList));
        },
        insertDailyExpense(state, amount) {
            state.dailyExpense = amount;
            store.commit('saveDailyExpense');
        },
        saveDailyExpense(state) {
            window.localStorage.setItem('daily-expense', JSON.stringify(state.dailyExpense));
        },
        saveDate(state, date) {
            state.theDate=date
            window.localStorage.setItem('date', state.theDate);
        }
    },
    actions: {},
    modules: {}
});
export default store;