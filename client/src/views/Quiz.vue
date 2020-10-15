<template>
    <div class="container">
            <div v-for="(question, questionIndex) in questions" :key="questionIndex">
                <form>
                    <div class="rounded p-4 text-right m-4" style="background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; color: black; text-decoration: underline;">
                    <h1>
                        {{question[0]}}
                    </h1>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" :value="answers[questionIndex][0]" v-model="answersSubmitted"><label class="pl-4">{{answers[questionIndex][0]}}</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" :value="answers[questionIndex][1]" v-model="answersSubmitted"><label class="pl-4">{{answers[questionIndex][1]}}</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" :value="answers[questionIndex][2]" v-model="answersSubmitted"><label class="pl-4">{{answers[questionIndex][2]}}</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" :value="answers[questionIndex][3]" v-model="answersSubmitted"><label class="pl-4">{{answers[questionIndex][3]}}</label>
                        </div>
                    </div>
                </form>
            </div>
            <input type="text" v-model="username" style="height: 50px; width: 250px;" placeholder="username">
            <div class="m-4">
                <router-link to="/">
                    <button
                    type="submit"
                    :disabled="isDisable(username)"
                    class="rounded p-3 text-right my-auto submitButton"
                    style="height: 50px; background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; color: black; text-decoration: underline; border: none;" v-on:click="createAnswers(); pushUsername();">Submit
                    </button>
                </router-link>
            </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['quiz_id'],
    data() {
        return {
            points: 0,
            quizID: this.quiz_id,
            questions: {
                type: Array
            },
            answers: {
                type: Array
            },
            answersSubmitted: [],
            username: ""
        }
    },
    methods: {
        isDisable(username) {
            return username.length == 0;
        },
        onLoad () {
            console.log('submit')
            const payload = {
                quizID: this.quizID
            }
            this.pushIDQuestions(payload)
            this.pushIDAnswers(payload)
        },
        getQuestions () {
            const path = 'https://CarpalRemoteMath.lizardon.repl.co/receiveQuestions'
            axios.get(path)
            .then((res) => {
                this.questions = res.data.questions
            })
            .catch((error) => {
                console.error(error);
            })
        },
        getAnswers () {
            const path = 'https://CarpalRemoteMath.lizardon.repl.co/receiveAnswers'
            axios.get(path)
            .then((res) => {
                this.answers = res.data.answers
            })
            .catch((error) => {
                console.error(error);
            })
        },
        pushIDQuestions (payload) {
            const path = 'https://CarpalRemoteMath.lizardon.repl.co/receiveQuestions'
            axios.post(path, payload)
            .then(() => {
                console.log('sent!')
                this.getQuestions()
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                this.getQuestions()
            })
        },
        pushIDAnswers (payload) {
            const path = 'https://CarpalRemoteMath.lizardon.repl.co/receiveAnswers'
            axios.post(path, payload)
            .then(() => {
                console.log('sent!')
                this.getAnswers()
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                this.getAnswers()
            })
        },
        createAnswers () {
            const path = 'https://CarpalRemoteMath.lizardon.repl.co/receiveAnswersSubmitted'
            const payload = {
                answers: this.answersSubmitted
            }
            axios.post(path, payload)
            .then(() => {
                console.log('sent!')
                this.pullPoints()
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                this.pullPoints()
            })
        },
        pullPoints() {
            const path = 'https://CarpalRemoteMath.lizardon.repl.co/receiveAnswersSubmitted'
            axios.get(path)
            .then((res) => {
                this.points = res.data.points
            })
            .catch((error) => {
                console.error(error);
            })
        },
        pushUsername() {
            const path = 'https://CarpalRemoteMath.lizardon.repl.co/receiveUsername'
            const payload = {
                username: this.username
            }
            axios.post(path, payload)
            .then(() => {
                console.log('sent!')
                //this.pullPoints()
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                //this.pullPoints()
            })
        }
    },
    created () {
        this.onLoad()
        console.log(this.questions)
    }
}
</script>

<style scoped>
.submitButton:active {
    background: #FFFFFF;
    box-shadow: 0px 0px 0px !important;
}

.disabled {
    background: green !important;
}
</style>