<template>
    <div>
        <div class="table-body__row-name table-row__cell">
            <span>{{model.name}}</span>
            <input type="text" :value="model.name"/>
            <span v-if="isFolder" @click="toggle()">
                {{open ? '-' : '+'}}
            </span>
        </div>
        <div class="table-body__row-count table-row__cell">{{model.count}}</div>
        <div class="table-body__row-action table-row__cell">
            <div class="action-edit" @click="updateRow(model.id)">
                <i class="fas fa-pen"></i>
            </div>
            <div class="action-delete" @click="deleteRow(model.id)">
                <i class="fas fa-times-circle"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RowItem',
    props: {
        model: Object,
        open: Boolean,
        isFolder: Number
    },
    data() {
        return {
            
        }
    },
}
</script>