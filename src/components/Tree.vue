<template>
    <div class="table-body__container">
        <div class="table-row" :class="{active: isActive(model.id)}" v-if="model.name">
            <div class="table-body__row-name table-row__cell" >
                <span v-if="!edit_active">{{model.name}}</span>
                <input type="text" v-model="name" v-else/>
                <span v-if="isFolder" @click="toggle()">
                    <i :class="[open ? 'fas fa-angle-down' : 'fas fa-angle-right',]"></i>
                </span>
            </div>
            <div class="table-body__row-count table-row__cell">{{model.count}}</div>
            <div class="table-body__row-action table-row__cell">
                <div class="action-edit" @click="edit_active = !edit_active">
                    <i class="fas fa-pen" v-if="!edit_active"></i>
                    <i class="fas fa-save" @click="updateRow(model.id)" v-else></i>
                </div>
                <div class="action-delete" @click="deleteRow(model.id)">
                    <i class="fas fa-times-circle"></i>
                </div>
            </div>
        </div>
        <div v-show="open" v-if="isFolder" class="table-row hasChild">
            <Tree class="item" v-for="model in model.children" :key="model.id" :active="active" :model="model"></Tree>
        </div>
  </div>
    
</template>
<script>
export default {
    name: 'Tree',
    props: {
        model: Object,
        active: Number,
    },
    data() {
        return {
            open: true,
            edit_active: false,
            name: this.model.name
        }
    },
    computed: {
        isFolder() {
            return this.model.children &&
            this.model.children.length
        },
        getIcon(){
            if(this.open){
                return 'fas fa-angle-up'
            }
            return 'fas fa-angle-down'
        }
    },
    methods: {
        toggle() {
            this.$emit('active', this.model.id);
            if (this.isFolder) {
                this.open = !this.open
            }
        },
        isActive(value) {
            return this.active === value
        },
        updateRow(id){
            this.$store.dispatch('updateStructure', {'id': id, 'name': this.name})
        },
        deleteRow(id){
            this.$store.dispatch('deleteRow', id)
        }
    }
}
</script>
<style scoped>
    body {
        font-family: Menlo, Consolas, monospace;
        color: #444;
    }
    .item {
        cursor: pointer;
    }
    ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: dot;
    }
    .active {
        color: red;
        border-color: red;
    }
    .table-body__container{
        width: 100%;
    }
    .table-row{
        display: flex;
        flex-basis: 100%;
        flex-wrap: nowrap;
        flex-direction: row;
    }
    .table-row.hasChild{
        flex-wrap: wrap;
    }
    .table-row.hasChild:first-child{
        margin-left: 0;
        
    }
    .table-row.hasChild .table-row.hasChild{
        background-color: #E6EDFA;
    }
    .table-row.hasChild .table-row.hasChild .table-body__row-name{
        padding-left: 20px;
        width: calc(70% - 20px);
    }
    .table-row.hasChild .table-row.hasChild .table-row.hasChild{
        background-color: #CADCFC;
    }
    .table-row.hasChild .table-row.hasChild .table-row.hasChild .table-body__row-name{
        padding-left: 40px;
        width: calc(70% - 40px);
    }
    .table-row.hasChild .table-row.hasChild .table-row.hasChild .table-body__container .hasChild{
        background-color: #A9C2F9;
    }
    .table-row.hasChild .table-row.hasChild .table-row.hasChild .table-body__container .hasChild .table-body__row-name{
        padding-left: 60px;
        width: calc(70% - 60px);
    }
    .table-row__cell{
        padding: 10px;
        border: 1px solid #F9FBFE;
    }
    .table-body__row-name{
        width: 70%;
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
        display: flex;
        justify-content: center;
    }
    .table-body__row-action div{
        padding: 0 10px;
    }
    
    
</style>