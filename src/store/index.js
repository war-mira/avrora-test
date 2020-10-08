import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    state: {
        structure: {
            id: 0,
            children: [
                { name: 'Нур-Султан', id: 1, count: 100},
                { name: 'Алматы', id: 2, count: 125,
                    children: [
                        { name: 'Центр 1', id: 3 , count: 125, 
                            children: [
                                { name: 'Управление 1', id: 4 , count: 125,
                                    children: [
                                        { name: 'Отдел 1', id: 5 , count: 125},
                                        { name: 'Отдел 2', id: 6 , count: 125}
                                    ]
                                },
                                { name: 'Управление 2', id: 7 , count: 125}
                            ]
                        },
                        { name: 'Центр 2', id: 8 , count: 125}
                    ]
                },
                { name: 'Актау', id: 9, count: 50}
            ]
        }
    },
    getters: {
        getOrgStructure(state){
            return state.structure
        },
    },
    mutations: {
        CREATE_ITEM(state, data){
            let max_index = (state.structure.children[state.structure.children.length - 1]).id
            state.structure.children.push({name: data.name, id: max_index+1, count: data.count})
        },
        UPDATE_STRUCTURE(state, data){
            const searchTree = (element, matchingId)=>{
                if(element.id == matchingId){
                    element.name = data.name
                    return element;
                }else if (element.children != null){
                     let i;
                     let result = null;
                     for(i=0; result == null && i < element.children.length; i++){
                          result = searchTree(element.children[i], matchingId);
                     }
                     return result;
                }
            }
            searchTree(state.structure, data.id);
        },
        
    },
    actions: {
        createItem({commit}, payload){
            commit('CREATE_ITEM', payload)
        },
        updateStructure({commit}, payload){
            commit('UPDATE_STRUCTURE', payload)
        },
        deleteRow({commit}, payload){
            commit('DELETE_ITEM', payload)
        },
    },
});
