<template>
<div class="background">
    <div class="add">
        <div class="box">
            <div @click="close" class="close">X</div>
            <div class="inputs">
                <div class="input">
                    <input  v-model="post.title"
                            type="text"
                            placeholder="Заголовок статьи">
                </div>
                <div class="input">
                    <input  v-model="post.body"
                            type="text"
                            placeholder="Текст статьи">
                </div>
            </div>
            <div @click="close" class="btn">
                Добавить статью
            </div>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                post:{
                    title: '',
                    body: ''
                    }

            }
        },
        methods: {
            close() {

                this.$emit('add-post', this.post);
                this.$emit('close');
            }
        }
    }
</script>
<style>
    .background{
        background: rgba(0, 0, 0, 0.8);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .add{
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        margin-top: 200px;

    }
.box{
    display: flex;
    flex-direction: column;
    width: 470px;
    height: 150px;
    background: #78BDE3;
}
.input{
    margin-top: 10px;
}
    .btn{
        vertical-align:middle;
        display:table-cell;
        text-align: center;
        padding-top: 5px;
        width: 200px;
        height: 24px;
        background: #5C9987;
        border-radius: 2px;
        cursor: pointer;
        margin: 0 auto;
        margin-top: 10px;
    }
    .close{
        margin-top: 10px;
        cursor: pointer;
    }
</style>