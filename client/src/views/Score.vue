<template>
<div>{{score}}</div>
</template>

<script>
export default {
    props: ['player_score'],
    data() {
        return {
            score: this.player_score
        }
    }
}
</script>

<style scoped>

</style>