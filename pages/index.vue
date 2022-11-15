<template></template>

<script>
export default {
    name: "IndexPage",
    mounted() {
        if (this.$cookies.get("username")) {
            this.$router.push("/home");
        } else {
            this.$router.push("/login");
        }
    },
};
</script>
