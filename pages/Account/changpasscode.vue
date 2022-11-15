<template>
    <div class="container-passcode">
        <div class="content-passcode">
            <div class="icon-passcode">
                <font-awesome-icon class="img-lock" :icon="['fa', 'lock']"></font-awesome-icon>
            </div>
            <template v-if="contentPasscode == 1"
                ><div class="label-passcode">{{ $t("enter_passcode_now") }}</div>
                <div class="password-passcode">
                    <input v-model="passcodeNow[1]" :class="pointer == 1 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeNow[2]" :class="pointer == 2 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeNow[3]" :class="pointer == 3 ? 'focus' : ''" class="box-input box-input-center" type="text" maxlength="1" readonly />
                    <input v-model="passcodeNow[4]" :class="pointer == 4 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeNow[5]" :class="pointer == 5 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeNow[6]" :class="pointer == 6 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                </div>
            </template>
            <template v-if="contentPasscode == 2"
                ><div class="label-passcode">{{ $t("enter_passcode_new") }}</div>
                <div class="password-passcode">
                    <input v-model="passcodeNew[1]" :class="pointer == 1 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeNew[2]" :class="pointer == 2 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeNew[3]" :class="pointer == 3 ? 'focus' : ''" class="box-input box-input-center" type="text" maxlength="1" readonly />
                    <input v-model="passcodeNew[4]" :class="pointer == 4 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeNew[5]" :class="pointer == 5 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeNew[6]" :class="pointer == 6 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                </div>
            </template>
            <template v-if="contentPasscode == 3"
                ><div class="label-passcode">{{ $t("enter_passcode_confirm") }}</div>
                <div class="password-passcode">
                    <input v-model="passcodeConfirm[1]" :class="pointer == 1 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeConfirm[2]" :class="pointer == 2 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeConfirm[3]" :class="pointer == 3 ? 'focus' : ''" class="box-input box-input-center" type="text" maxlength="1" readonly />
                    <input v-model="passcodeConfirm[4]" :class="pointer == 4 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeConfirm[5]" :class="pointer == 5 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                    <input v-model="passcodeConfirm[6]" :class="pointer == 6 ? 'focus' : ''" class="box-input" type="text" maxlength="1" readonly />
                </div>
            </template>
            <div class="number-passcode">
                <ul class="keyboard-pass">
                    <li class="bg-keyboard" @click="numClick(1)">
                        <span class="font-number">1</span>
                    </li>
                    <li class="bg-keyboard" @click="numClick(2)">
                        <span class="font-number">2</span>
                    </li>
                    <li class="bg-keyboard" @click="numClick(3)">
                        <span class="font-number">3</span>
                    </li>
                    <li class="bg-keyboard clearl" @click="numClick(4)">
                        <span class="font-number">4</span>
                    </li>
                    <li class="bg-keyboard" @click="numClick(5)">
                        <span class="font-number">5</span>
                    </li>
                    <li class="bg-keyboard" @click="numClick(6)">
                        <span class="font-number">6</span>
                    </li>
                    <li class="bg-keyboard clearl" @click="numClick(7)">
                        <span class="font-number">7</span>
                    </li>
                    <li class="bg-keyboard" @click="numClick(8)">
                        <span class="font-number">8</span>
                    </li>
                    <li class="bg-keyboard" @click="numClick(9)">
                        <span class="font-number">9</span>
                    </li>
                    <li class="bg-keyboard right-keyboard clearl" @click="numDelete()">
                        <font-awesome-icon class="img-lock" :icon="['fa', 'delete-left']"></font-awesome-icon>
                    </li>
                    <li class="bg-keyboard right-keyboard" @click="numClick(0)">
                        <span class="font-number">0</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pointer: 1,
            passcodeNow: {
                1: "",
                2: "",
                3: "",
                4: "",
                5: "",
                6: "",
            },
            passcodeNew: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" },
            passcodeConfirm: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" },
            contentPasscode: 1,
        };
    },
    methods: {
        numClick(num) {
            if (this.contentPasscode == 1) {
                this.passcodeNow[this.pointer] = num;
            } else if (this.contentPasscode == 2) {
                this.passcodeNew[this.pointer] = num;
            } else {
                this.passcodeConfirm[this.pointer] = num;
            }

            if (this.pointer < 6) {
                this.pointer++;
            } else {
                if (this.contentPasscode == 1) {
                    this.contentPasscode = 2;
                    this.pointer = 1;
                } else if (this.contentPasscode == 2) {
                    this.contentPasscode = 3;
                    this.pointer = 1;
                }
            }
        },
        numDelete() {
            if (this.pointer != 1) {
                this.pointer--;
            }
            if (this.contentPasscode == 1) {
                this.passcodeNow[this.pointer] = "";
            } else if (this.contentPasscode == 2) {
                this.passcodeNew[this.pointer] = "";
            } else {
                this.passcodeConfirm[this.pointer] = "";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>