<template>
    <div>
        <div class="btn_radio_checkbox">
            <div class="time-group">
                <button class="type-buttonss ng-star-inserted" v-for="(val, i) in text_date" :key="i" :class="{ type_active: val.key }" @click="clickDate(val.text, val.func)">{{ val.text }}</button>
            </div>
        </div>
        <div>Date Start : {{ dateStart }}</div>
        <div>Date End : {{ dateEnd }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dateStart: "",
            dateEnd: "",
            text_date: [
                {
                    text: "Previous",
                    key: false,
                    func: "btnTimePN",
                },
                {
                    text: "Today",
                    key: true,
                    func: "btnTime",
                },
                {
                    text: "Yesterday",
                    key: false,
                    func: "btnTime",
                },
                {
                    text: "This Week",
                    key: false,
                    func: "btnTime",
                },
                {
                    text: "Last Week",
                    key: false,
                    func: "btnTime",
                },
                {
                    text: "This Month",
                    key: false,
                    func: "btnTime",
                },
                {
                    text: "Last Month",
                    key: false,
                    func: "btnTime",
                },
                {
                    text: "Next",
                    key: false,
                    func: "btnTimePN",
                },
            ],
            typeTime: "Day",
        };
    },
    mounted() {
        const date = new Date();
        var dateToday = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
        this.dateStart = dateToday;
        this.dateEnd = dateToday;
    },
    methods: {
        clickDate(type, func) {
            if (func == "btnTime") {
                this.btnTime(type);
                for (var i in this.text_date) {
                    this.text_date[i].key = false;
                    if (this.text_date[i].text == type) {
                        this.text_date[i].key = true;
                    }
                }
            } else if (func == "btnTimePN") {
                this.btnTimePN(type);
            }
        },
        btnTime(text_val) {
            const date = new Date();
            if (text_val == "Today") {
                let dateToday = date;
                dateToday = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
                this.dateStart = dateToday;
                this.dateEnd = dateToday;
                this.typeTime = "Day";
            } else if (text_val == "Yesterday") {
                let todayTimeStamp = +new Date();
                let oneDayTimeStamp = 1000 * 60 * 60 * 24;
                let diff = todayTimeStamp - oneDayTimeStamp;
                let yesterdayDate = new Date(diff);
                let yesterdayString = yesterdayDate.getFullYear() + "-" + ("0" + (yesterdayDate.getMonth() + 1)).slice(-2) + "-" + ("0" + yesterdayDate.getDate()).slice(-2);
                this.dateStart = yesterdayString;
                this.dateEnd = yesterdayString;
                this.typeTime = "Day";
            } else if (text_val == "This Week") {
                let firstday = date.getDate() - date.getDay();
                let lastday = firstday + 7;
                let date1 = new Date(date.getTime());
                let date2 = new Date(date.getTime());
                date1 = new Date(date1.setDate(firstday));
                date2 = new Date(date2.setDate(lastday));
                let startDate = date1.getFullYear() + "-" + ("0" + (date1.getMonth() + 1)).slice(-2) + "-" + ("0" + date1.getDate()).slice(-2);
                let endDate = date2.getFullYear() + "-" + ("0" + (date2.getMonth() + 1)).slice(-2) + "-" + ("0" + date2.getDate()).slice(-2);
                this.dateStart = startDate;
                this.dateEnd = endDate;
                this.typeTime = "Week";
            } else if (text_val == "Last Week") {
                let firstday = date.getDate() - date.getDay() - 7;
                let lastday = firstday + 7;
                let date1 = new Date(date.getTime());
                let date2 = new Date(date.getTime());
                date1 = new Date(date1.setDate(firstday));
                date2 = new Date(date2.setDate(lastday));
                let startDate = date1.getFullYear() + "-" + ("0" + (date1.getMonth() + 1)).slice(-2) + "-" + ("0" + date1.getDate()).slice(-2);
                let endDate = date2.getFullYear() + "-" + ("0" + (date2.getMonth() + 1)).slice(-2) + "-" + ("0" + date2.getDate()).slice(-2);
                this.dateStart = startDate;
                this.dateEnd = endDate;
                this.typeTime = "Week";
            } else if (text_val == "This Month") {
                let date1 = new Date(date.getFullYear(), date.getMonth(), 1);
                let date2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                let startDate = date1.getFullYear() + "-" + ("0" + (date1.getMonth() + 1)).slice(-2) + "-" + ("0" + date1.getDate()).slice(-2);
                let endDate = date2.getFullYear() + "-" + ("0" + (date2.getMonth() + 1)).slice(-2) + "-" + ("0" + date2.getDate()).slice(-2);
                this.dateStart = startDate;
                this.dateEnd = endDate;
                this.typeTime = "Month";
            } else if (text_val == "Last Month") {
                let date1 = new Date(date.getFullYear(), date.getMonth() - 1, 1);
                let date2 = new Date(date.getFullYear(), date.getMonth(), 0);
                let startDate = date1.getFullYear() + "-" + ("0" + (date1.getMonth() + 1)).slice(-2) + "-" + ("0" + date1.getDate()).slice(-2);
                let endDate = date2.getFullYear() + "-" + ("0" + (date2.getMonth() + 1)).slice(-2) + "-" + ("0" + date2.getDate()).slice(-2);
                this.dateStart = startDate;
                this.dateEnd = endDate;
                this.typeTime = "Month";
            }
        },
        btnTimePN(text_val) {
            let startVal = new Date(this.dateStart);
            if (this.typeTime == "Day") {
                if (text_val == "Previous") {
                    let todayTimeStamp = startVal;
                    let oneDayTimeStamp = 1000 * 60 * 60 * 24;
                    let diff = todayTimeStamp - oneDayTimeStamp;
                    let yesterdayDate = new Date(diff);
                    let yesterdayString = yesterdayDate.getFullYear() + "-" + ("0" + (yesterdayDate.getMonth() + 1)).slice(-2) + "-" + ("0" + yesterdayDate.getDate()).slice(-2);
                    this.dateStart = yesterdayString;
                    this.dateEnd = yesterdayString;
                } else if (text_val == "Next") {
                    let Val = new Date(startVal.setDate(startVal.getDate() + 1));
                    let tomorrowString = Val.getFullYear() + "-" + ("0" + (Val.getMonth() + 1)).slice(-2) + "-" + ("0" + Val.getDate()).slice(-2);
                    this.dateStart = tomorrowString;
                    this.dateEnd = tomorrowString;
                }
            } else if (this.typeTime == "Week") {
                if (text_val == "Previous") {
                    let firstday = startVal.getDate() - startVal.getDay() - 7;
                    let lastday = firstday + 7;
                    let date1 = new Date(startVal.setDate(firstday));
                    let date2 = new Date(startVal.setDate(lastday));
                    let startDate = date1.getFullYear() + "-" + ("0" + (date1.getMonth() + 1)).slice(-2) + "-" + ("0" + date1.getDate()).slice(-2);
                    let endDate;
                    if (date1.getDate() > date2.getDate()) {
                        endDate = date2.getFullYear() + "-" + ("0" + (date2.getMonth() + 2)).slice(-2) + "-" + ("0" + date2.getDate()).slice(-2);
                    } else {
                        endDate = date2.getFullYear() + "-" + ("0" + (date2.getMonth() + 1)).slice(-2) + "-" + ("0" + date2.getDate()).slice(-2);
                    }
                    this.dateStart = startDate;
                    this.dateEnd = endDate;
                } else if (text_val == "Next") {
                    let firstday = startVal.getDate() - startVal.getDay() + 7;
                    let date1 = new Date(startVal.setDate(firstday));
                    let startDate = date1.getFullYear() + "-" + ("0" + (date1.getMonth() + 1)).slice(-2) + "-" + ("0" + date1.getDate()).slice(-2);
                    let date2 = new Date(date1.setTime(date1.getTime() + 7 * 24 * 60 * 60 * 1000));
                    let endDate = date2.getFullYear() + "-" + ("0" + (date2.getMonth() + 1)).slice(-2) + "-" + ("0" + date2.getDate()).slice(-2);
                    this.dateStart = startDate;
                    this.dateEnd = endDate;
                }
            } else if (this.typeTime == "Month") {
                if (text_val == "Previous") {
                    let current = new Date(startVal.getFullYear(), startVal.getMonth() - 1, 1);
                    let tomorrowString = current.getFullYear() + "-" + ("0" + (current.getMonth() + 1)).slice(-2) + "-" + ("0" + current.getDate()).slice(-2);
                    this.dateStart = tomorrowString;
                    let current2 = new Date(startVal.getFullYear(), startVal.getMonth(), 0);
                    let tomorrowString2 = current2.getFullYear() + "-" + ("0" + (current2.getMonth() + 1)).slice(-2) + "-" + ("0" + current2.getDate()).slice(-2);
                    this.dateEnd = tomorrowString2;
                } else if (text_val == "Next") {
                    let current = new Date(startVal.getFullYear(), startVal.getMonth() + 1, 1);
                    let tomorrowString = current.getFullYear() + "-" + ("0" + (current.getMonth() + 1)).slice(-2) + "-" + ("0" + current.getDate()).slice(-2);
                    this.dateStart = tomorrowString;
                    let current2 = new Date(startVal.getFullYear(), startVal.getMonth() + 2, 0);
                    let tomorrowString2 = current2.getFullYear() + "-" + ("0" + (current2.getMonth() + 1)).slice(-2) + "-" + ("0" + current2.getDate()).slice(-2);
                    this.dateEnd = tomorrowString2;
                }
            }
        },
    },
};
</script>