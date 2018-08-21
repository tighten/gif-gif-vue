<template>
    <div>
        <div class="rounded shadow text-grey-darker">
            <div class="py-8">
                <h3 class="text-center">How do you pronounce the word <span class="font-light uppercase">gif</span>?</h3>

                <div class="flex justify-center py-8">
                    <label for="jif" class="mx-8">
                        GIF
                        <input type="radio" id="jif" value="jif" name="pronunciation" v-model="newVote.picked" />
                    </label>

                    <label for="gif" class="mx-8">
                        GIF
                        <input type="radio" id="gif" value="gif" name="pronunciation" v-model="newVote.picked" />
                    </label>
                </div>
            </div>

            <div class="flex justify-center">
                <div class="w-3/4">
                    <input class="input"
                           id="reason"
                           v-model="newVote.reason"
                           type="text"
                           placeholder="Why do you think it should be pronounced that way?" />
                </div>
            </div>

            <div class="flex justify-center my-4">
                <div class="w-3/4">
                    <input class="input"
                           id="name"
                           v-model="newVote.name"
                           type="text"
                           placeholder="What is your name?" />
                </div>
            </div>

            <div class="flex justify-center">
                <button id="submit"
                        @click="add"
                        :disabled="! valid"
                        :class="{'opacity-50 cursor-not-allowed': !valid }"
                        class="button">
                    Submit
                </button>
            </div>
        </div>

        <div class="py-8">
            <h4 class="text-grey-darker text-center">User Responses:</h4>
            <ul v-for="vote in votes">
                <li class="py-4">
                    <p><span class="font-light uppercase">gif</span> —
                        {{ vote.reason }}</p>
                    <p class="text-sm mt-2">Submitted by <span class="uppercase">{{ vote.name }}</span></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['dataVotes'],

        data() {
            return {
                newVote: {
                    picked: '',
                    reason: '',
                    name: '',
                },

                votes: this.dataVotes,
            }
        },

        methods: {
            add() {
                axios.post('/api/votes', this.newVote)
                    .then(() => {
                        this.votes.push(this.newVote);

                        this.newVote = {
                            picked: '',
                            reason: '',
                            name: '',
                        };
                    });
            }
        },

        computed: {
            valid() {
                return this.newVote.picked && this.newVote.reason && this.newVote.name;
            }
        }
    }
</script>
