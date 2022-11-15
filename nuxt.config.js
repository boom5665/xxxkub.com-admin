export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    server: {
        port: process.env.PORT || 9000,
    },
    head: {
        title: process.env.DOMAIN ? process.env.DOMAIN : "Movie",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            {
                charset: "utf-8",
            },
            {
                name: "viewport",
                content: "width=1440",
            },
            {
                hid: "description",
                name: "description",
                content: "",
            },
            {
                name: "format-detection",
                content: "telephone=no",
            },
        ],
        link: [
            {
                rel: "icon",
                type: "image/x-icon",
                href: "/favicon.ico",
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["~/assets/css/main.scss"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{ src: "@/plugins/vue-sweetalert2" }, { src: "~/plugins/chart.js", mode: "client" }, { src: "~/plugins/debounce.js" }, { src: "@/plugins/axios" }],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ["@nuxtjs/fontawesome", "@nuxtjs/dotenv"],
    fontawesome: {
        icons: {
            solid: true,
        },
    },
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        "nuxt-i18n",
        "cookie-universal-nuxt",
        "nuxt-vue-multiselect",
    ],
    i18n: {
        locales: ["en", "th", "cn"],
        defaultLocale: "th",
        lazy: true,
        langDir: "locales/",
        locales: [
            {
                code: "en",
                file: "en.json",
            },
            {
                code: "th",
                file: "th.json",
            },
            {
                code: "cn",
                file: "cn.json",
            },
        ],
        detectBrowserLanguage: false,
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        headers: {
            common: {
                domain: process.env.DOMAIN || "devmovie",
            },
        },
        baseURL: process.env.BASE_API_URL || "https://dev-movie-api.pirate168.com/",
    },
    router: {
        middleware: "checktoken",
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
};
