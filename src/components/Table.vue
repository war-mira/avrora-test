<template>
    <div class="container">
        <div class="table">
            <div class="table-header">
                <div class="table-header__title">
                    Организационная структура
                </div>
                <div class="table-header__row">
                    <input type="button" value="Добавить" v-if="!create_active" class="btn btn-icon" @click="create_active = !create_active"/>
                    <div class="table-header__create-row" v-if="create_active">
                        <input type="text" v-model="new_name" placeholder="Название"/>
                        <input type="number" v-model="new_count" placeholder="Количество"/>
                        <div class="btn-save" @click="createItem">Сохранить</div>
                    </div>
                </div>
            </div>
            <div class="table-body">
                <div class="table-body__title">
                    <div class="table-body__row-name table-row__cell"></div>
                    <div class="table-body__row-count table-row__cell">Общее количество</div>
                    <div class="table-body__row-action table-row__cell">Действия</div>
                </div>
                <Tree class="item" :active="active" 
                    :model="treeData" 
                    v-on:active="updateTree"
                ></Tree>
            </div>
            <div class="table-footer">
                <div class="table-body__row-name table-row__cell">Сумма сотрудников:</div>
                <div class="table-body__row-count table-row__cell">{{people_sum}}</div>
                <div class="table-body__row-action table-row__cell"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Tree from './Tree.vue';
export default {
    name: 'Table',
    components: {
        Tree
    },
    data(){
        return {
            active: 0,
            new_name: null,
            new_count: null,
            create_active: false,
            people_sum: 0
        }
    },
    created: function() {
        this.countPeople()
    },
    computed: {
        ...mapGetters({
            treeData: 'getOrgStructure'
        })
    },
   methods: {
       reset(){
            this.new_count = null;
            this.new_name = null;
       },
       updateTree(val){
            this.active = val;
       },
       createItem(){
           this.$store.dispatch('createItem', {'name': this.new_name, 'count': this.new_count})
           .then(() => {
                this.create_active = false;
                this.reset()
            })
       },
       countPeople(){
            if(!this.treeData){
                return
            }
            const counter = (data) =>{
                for(let item of data){
                    this.people_sum += item.count;
                    if(item.children){
                        counter(item.children)
                    }
                }
            }
            counter(this.treeData.children)
       }
   },
   watch: {
        treeData: function () {
          this.countPeople()
        }
    }
}

</script>
<style scoped>
    .table{
        width: 100%;
    }
    .table-body__title, .table-footer{
        display: flex;
    }
        .table-header{
            display: flex;
            flex-wrap: wrap;
            flex-basis: 100%;
            align-items: center;
        }
            .table-header__title{
                display: flex;
                flex-basis: 100%;
                padding: 20px;
                background-color: #303E4F;
                color: #ffffff;
                font-weight: bolder;
                text-transform: uppercase;
            }
            .table-header__row{
                padding: 20px;
                color: rgb(48,62,79);
            }
    .table-body__row-name{
        width: 60%;
        text-align: left;
        display: flex;
        justify-content: space-between;
    }
    .table-body__row-count{
        width: 20%;
        text-align: left;
    }
    .table-body__row-action{
        width: 10%;
    }
    .table-body__title{
        background-color: #303E4F;
        color: #ffffff;
    }
    .table-row__cell{
        padding: 10px;
        border: 1px solid #F9FBFE;
    }
    .table-header__create-row{
        display: flex;
    }
    .table-header__create-row input{
        margin-right: 10px;
    }
    .btn-save{
        border: 1px solid #CADCFC;
        cursor: pointer;
        padding: 5px 15px;
    }

</style>