<template>
    <!-- <div class="main-Navbar" :class="shownav == false ? 'hide' : ''"> -->
    <div class="navbar-container" :class="$store.state.shownav == false ? 'hide' : ''">
        <div class="navbar">
            <ul class="navbar-ul">
                <template v-for="(val, index) in ShowMenu">
                    <li class="navbar-li" :key="index" :class="navbarMenu.length != index + 1 ? 'bottom-line' : ''" >
                        <a @click="menuclick(index + 1)">
                            <div class="navbar-content" :class="$store.state.shownav == false ? 'hide' : ''">
                                <div class="left">
                                    <div class="num" v-if="$store.state.shownav">{{ index + 1 }}</div>
                                    <div class="icon">
                                        <font-awesome-icon :icon="['fas', val.icon]"></font-awesome-icon>
                                    </div>
                                    <div class="text" v-if="$store.state.shownav">{{ $t(val.text) }}</div>
                                </div>
                                <div class="right" v-if="$store.state.shownav">
                                    <div class="icon" :class="showsubMenu == index + 1 ? 'icon-rotate' : ''">
                                        <font-awesome-icon :icon="['fas', 'angle-down']"></font-awesome-icon>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <!-- {{ ShowMenu }} -->
                        <transition name="slide">
                            <div v-if="showsubMenu == index + 1">
                                <div class="subnavbar">
                                    <ul class="subnavbar-ul">
                                        <li class="subnavbar-li" v-for="(v, i) in val.subMenu" :key="i" @click="test_menu(val.text, v.text_submenu)">
                                            <NuxtLink :to="localePath(v.link)" :class="v.active == true ? 'btnActive' : ''" >
                                                <div class="subnavbar-content">
                                                    <div class="num" :class="{ menu_active: v.active }">{{ index + 1 }}.{{ i + 1 }}</div>
                                                    <div class="icon">
                                                        <font-awesome-icon :icon="['fas', v.icon]"></font-awesome-icon>
                                                    </div>
                                                    <div class="text">{{ $t(v.text_submenu) }}</div>
                                                </div>
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </transition>
                    </li>
                </template>
            </ul>
        </div>
        <div class="bottom-button">
            <div class="hide-btn" @click="navbarclick">
                <font-awesome-icon class="icon" :class="$store.state.shownav == false ? 'icon-rotate' : ''" :icon="['fas', 'arrow-left']"></font-awesome-icon>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>
<script>
export default {
    data() {
        return {
            showsubMenu: 0,
            textShowTabMenu: "",
            package: this.$cookies.get("package"),
            // shownav: true,

            navbarMenu: [
                {
                    text: "Dashboard",
                    icon: "house-user",
                    subMenu: [{ text_submenu: "Dashboard", link: "/home", icon: "circle-right", active: true, hide: true }],
                    hide: true,
                },
                {
                    text: "account",
                    icon: "user",
                    subMenu: [{ text_submenu: "change_password", link: "/Account/changepassword", icon: "circle-right", active: true, hide: true }],
                    hide: true,
                },
                {
                    text: "Setting",
                    icon: "gear",
                    subMenu: [
                        { text_submenu: "Setting Web", link: "/Settingpage/Settingweb", icon: "circle-right", active: false, hide: true },
                        { text_submenu: "Setting SEO", link: "/Settingpage/Settingseo", icon: "circle-right", active: false, hide: true },
                        { text_submenu: "Setting Authen", link: "/Settingpage/SettingAuthen", icon: "circle-right", active: false, hide: this.$cookies.get("authen") == 2 ? true : false },
                        { text_submenu: "Setting Webpage", link: "/Settingpage/SettingwebPage", icon: "circle-right", active: false, hide: this.$cookies.get("configother").show_homepage == 1 ? true : false },
                    ],
                    hide: true,
                },
                {
                    text: "Member Management",
                    icon: "user",
                    subMenu: [{ text_submenu: "member", link: "/Member/MemberList", icon: "circle-right", active: false, hide: true }],
                    hide: this.$cookies.get("authen") == 2 ? true : false,
                },
                {
                    text: "Advertisement",
                    icon: "rectangle-ad",
                    subMenu: [
                        { text_submenu: "Add Advertisement Image", link: "/Ads/AdsNewimage", icon: "circle-right", active: false, hide: true },
                        { text_submenu: "Advertisement Image", link: "/Ads/Adsimg", icon: "circle-right", active: false, hide: true },
                        {
                            text_submenu: "Add Advertisement Video",
                            link: "/Ads/AdsNewVideo",
                            icon: "circle-right",
                            active: false,
                            hide: this.$cookies.get("authen") == 2 || (this.$cookies.get("package").package_manga == 1 && this.$cookies.get("package").package_movie == 0 && this.$cookies.get("package").package_anime == 0 && this.$cookies.get("package").package_av == 0) ? false : true,
                        },
                        {
                            text_submenu: "Advertisement Video",
                            link: "/Ads/Adsvideo",
                            icon: "circle-right",
                            active: false,
                            hide: this.$cookies.get("authen") == 2 || (this.$cookies.get("package").package_manga == 1 && this.$cookies.get("package").package_movie == 0 && this.$cookies.get("package").package_anime == 0 && this.$cookies.get("package").package_av == 0) ? false : true,
                        },
                        { text_submenu: "Setting Alignment Image", link: "/Ads/AdsPosition", icon: "circle-right", active: false, hide: true },
                    ],
                    hide: true,
                },
                {
                    text: "Report",
                    icon: "file",
                    subMenu: [
                        { text_submenu: "Report Advertisement Image", link: "/Report/Reportimg", icon: "circle-right", active: false, hide: true },
                        {
                            text_submenu: "Report Advertisement Video",
                            link: "/Report/Reportvideo",
                            icon: "circle-right",
                            active: false,
                            hide: this.$cookies.get("authen") == 2 || (this.$cookies.get("package").package_manga == 1 && this.$cookies.get("package").package_movie == 0 && this.$cookies.get("package").package_anime == 0 && this.$cookies.get("package").package_av == 0) ? false : true,
                        },
                        { text_submenu: "Report Broken Movie", link: "/Report/Reportnotify", icon: "circle-right", active: false, hide: true },
                        { text_submenu: "Request Movie", link: "/Report/Reportrequest", icon: "circle-right", active: false, hide: true },
                        { text_submenu: "Request Advertisement", link: "/Report/Reportadvert", icon: "circle-right", active: false, hide: true },
                    ],
                    hide: true,
                },
                {
                    text: "Manage_Movie",
                    icon: "clapperboard",
                    subMenu: [
                        { text_submenu: "Movie_List", link: "/movie/list", icon: "circle-right", active: false, hide: this.$cookies.get("package").package_movie == 1 ? true : false },
                        { text_submenu: "Av List", link: "/av/list", icon: "circle-right", active: false, hide: this.$cookies.get("package").package_av == 1 ? true : false },
                        { text_submenu: "Anime List", link: "/anime/list", icon: "circle-right", active: false, hide: this.$cookies.get("package").package_anime == 1 ? true : false },
                    ],
                    hide: this.$cookies.get("package").package_movie == 1 || this.$cookies.get("package").package_av == 1 || this.$cookies.get("package").package_anime == 1 ? true : false,
                },
                {
                    text: "Manage Manga",
                    icon: "book-quran",
                    subMenu: [
                        { text_submenu: "Manga List", link: "/Manga/List", icon: "circle-right", active: false, hide: true },
                        { text_submenu: "Category Manga", link: "/Manga/CategoryList", icon: "circle-right", active: false, hide: true },
                    ],
                    hide: this.$cookies.get("package").package_manga == 1 ? true : false,
                },
                {
                    text: "Category Manage",
                    icon: "camera",
                    subMenu: [
                        { text_submenu: "Category Movie", link: "/CategoryMovie/CategoryList", icon: "circle-right", active: false, hide: this.$cookies.get("package").package_movie == 1 ? true : false },
                        { text_submenu: "Category Av", link: "/CategoryAv/CategoryList", icon: "circle-right", active: false, hide: this.$cookies.get("package").package_av == 1 ? true : false },
                        { text_submenu: "Category Anime", link: "/CategoryAnime/CategoryList", icon: "circle-right", active: false, hide: this.$cookies.get("package").package_anime == 1 ? true : false },
                    ],
                    hide: this.$cookies.get("package").package_movie == 1 || this.$cookies.get("package").package_av == 1 || this.$cookies.get("package").package_anime == 1 ? true : false,
                },
                {
                    text: "Manage_Poster",
                    icon: "image",
                    subMenu: [
                        { text_submenu: "Add Posters Movie", link: "/Poster/Addposter", icon: "circle-right", active: false, hide: this.$cookies.get("configother").show_poster == 1 ? true : false },
                        { text_submenu: "Posters Movie List", link: "/Poster/Posterlist", icon: "circle-right", active: false, hide: this.$cookies.get("configother").show_poster == 1 ? true : false },
                    ],
                    hide: this.$cookies.get("configother").show_poster == 1 ? true : false,
                },
                // {
                //     text: "ฟุตบอล",
                //     icon: "futbol",
                //     subMenu: [{ text_submenu: "เพิ่มไฮไลต์ ฟุตบอล", link: "/Football/HighFoot", icon: "circle-right", active: false }],
                // },

                {
                    text: "Document",
                    icon: "book",
                    subMenu: [{ text_submenu: "Document", link: "/Document/Login", icon: "circle-right", active: false, hide: this.$cookies.get("configother").show_poster == 1 ? true : false }],
                    hide: false,
                },
            ],
            dataListRoute: [
                {
                    name: "Dashboard",
                },
                {
                    name: "account",
                    list: [
                        {
                            nameGroup: "change_password",
                            listGroup: ["Account-changepassword___en", "Account-changepassword___cn", "Account-changepassword___th"],
                        },
                    ],
                },
                {
                    name: "Setting",
                    list: [
                        {
                            nameGroup: "Setting Web",
                            listGroup: ["Settingpage-Settingweb___en", "Settingpage-Settingweb___cn", "Settingpage-Settingweb___th"],
                        },
                        {
                            nameGroup: "Setting SEO",
                            listGroup: ["Settingpage-Settingseo___en", "Settingpage-Settingseo___cn", "Settingpage-Settingseo___th"],
                        },
                        {
                            nameGroup: "Setting Webpage",
                            listGroup: ["Settingpage-SettingwebPage___en", "Settingpage-SettingwebPage___cn", "Settingpage-SettingwebPage___th"],
                        },
                    ],
                },
                {
                    name: "Advertisement",
                    list: [
                        {
                            nameGroup: "Add Advertisement Image",
                            listGroup: ["Ads-AdsNewimage___en", "Ads-AdsNewimage___cn", "Ads-AdsNewimage___th"],
                        },
                        {
                            nameGroup: "Advertisement Image",
                            listGroup: ["Ads-Adsimg___en", "Ads-Adsimg___cn", "Ads-Adsimg___th"],
                        },
                        {
                            nameGroup: "Add Advertisement Video",
                            listGroup: ["Ads-AdsNewVideo___en", "Ads-AdsNewVideo___cn", "Ads-AdsNewVideo___th"],
                        },
                        {
                            nameGroup: "Advertisement Video",
                            listGroup: ["Ads-Adsvideo___en", "Ads-Adsvideo___cn", "Ads-Adsvideo___th"],
                        },
                        {
                            nameGroup: "Setting Alignment",
                            listGroup: ["Ads-AdsPosition___en", "Ads-AdsPosition___cn", "Ads-AdsPosition___th"],
                        },
                    ],
                },

                {
                    name: "Report",
                    list: [
                        {
                            nameGroup: "Report Advertisement Image",
                            listGroup: ["Report-Reportimg___en", "Report-Reportimg___cn", "Report-Reportimg___th"],
                        },
                        {
                            nameGroup: "Report Advertisement Video",
                            listGroup: ["Report-Reportvideo___en", "Report-Reportvideo___cn", "Report-Reportvideo___th"],
                        },
                        {
                            nameGroup: "Notify",
                            listGroup: ["Report-Reportnotify___en", "Report-Reportnotify___cn", "Report-Reportnotify___th"],
                        },
                        {
                            nameGroup: "Request Movie",
                            listGroup: ["Report-Reportrequest___en", "Report-Reportrequest___cn", "Report-Reportrequest___th"],
                        },
                        {
                            nameGroup: "Request Advert",
                            listGroup: ["Report-Reportadvert___en", "Report-Reportadvert___cn", "Report-Reportadvert___th"],
                        },
                    ],
                },

                {
                    name: "Manage_Movie",
                    list: [
                        {
                            nameGroup: "Movie_List",
                            listGroup: ["Movie-List___en", "Movie-List___cn", "Movie-List___th"],
                        },
                        {
                            nameGroup: "Av List",
                            listGroup: ["Av-List___en", "Av-List___cn", "Av-List___th"],
                        },
                        {
                            nameGroup: "Anime List",
                            listGroup: ["Anime-List___en", "Anime-List___cn", "Anime-List___th"],
                        },
                    ],
                },

                {
                    name: "Category Manage",
                    list: [
                        {
                            nameGroup: "Category Movie",
                            listGroup: ["CategoryMovie-CategoryList___en", "CategoryMovie-CategoryList___cn", "CategoryMovie-CategoryList___th"],
                        },
                        {
                            nameGroup: "Category Movie Promote",
                            listGroup: ["CategoryMovie-CategoryPromote___en", "CategoryMovie-CategoryPromote___cn", "CategoryMovie-CategoryPromote___th"],
                        },
                        {
                            nameGroup: "CategoryAdd",
                            listGroup: ["CategoryMovie-CategoryAdd___en", "CategoryMovie-CategoryAdd___cn", "CategoryMovie-CategoryAdd___th"],
                        },
                    ],
                },
                {
                    name: "Manage_Poster",
                    list: [
                        {
                            nameGroup: "Add Posters Movie",
                            listGroup: ["Poster-Addposter___en", "Poster-Addposter___cn", "Poster-Addposter___th"],
                        },
                        {
                            nameGroup: "Posters Movie List",
                            listGroup: ["Poster-Posterlist___en", "Poster-Posterlist___cn", "Poster-Posterlist___th"],
                        },
                    ],
                },

                {
                    name: "Manage Manga",
                    list: [
                        {
                            nameGroup: "Manga List",
                            listGroup: ["Manga-List___en", "Manga-List___cn", "Manga-List___th"],
                        },
                        {
                            nameGroup: "Category Manga",
                            listGroup: ["Manga-CategoryList___en", "Manga-CategoryList___cn", "Manga-CategoryList___th"],
                        },
                    ],
                },
                {
                    name: "Document",
                    list: [
                        {
                            nameGroup: "Document",
                            listGroup: ["Document-Login___en", "Document-Login___cn", "Document-Login___th"],
                        },
                    ],
                },
            ],
            routeNameGroup: "",
            routeNameGroupSub: "",
            showmenu_firsttime: 0,
        };
    },
    mounted() {},
    computed: {
        ShowMenu() {
            var mainmenu = [];
            for (let i = 0; i < this.navbarMenu.length; i++) {
                var menuOld = this.navbarMenu[i];
                if (menuOld.hide == true) {
                    var mainmenutmp = [];
                    mainmenutmp.text = menuOld.text;
                    mainmenutmp.icon = menuOld.icon;
                    mainmenutmp.subMenu = [];
                    mainmenutmp.hide = true;

                    var k = 0;
                    for (let index = 0; index < menuOld.subMenu.length; index++) {
                        if (menuOld.subMenu[index].hide == true) {
                            mainmenutmp.subMenu[k] = menuOld.subMenu[index];
                            k++;
                        }
                    }
                    mainmenu.push(mainmenutmp);
                }
            }
            this.showactivemenu(mainmenu);
            return mainmenu;
        },
    },
    methods: {
        showactivemenu(mainmenu) {
            if (this.showmenu_firsttime == 0) {
                this.showmenu_firsttime = 1;
                for (var item in this.dataListRoute) {
                    for (var name in this.dataListRoute[item].list) {
                        for (var nameGroup in this.dataListRoute[item].list[name].listGroup) {
                            if (this.dataListRoute[item].list[name].listGroup[nameGroup] == this.$route.name) {
                                this.routeNameGroup = this.dataListRoute[item].name;
                                this.routeNameGroupSub = this.dataListRoute[item].list[name].nameGroup;
                            }
                        }
                    }
                }
                if (this.routeNameGroup == "") {
                    mainmenu[0].subMenu[0].active = true;
                    this.showsubMenu = 1;
                } else {
                    for (var name in mainmenu) {
                        this.showsubMenu = this.showsubMenu + 1;
                        for (var list in mainmenu[name].subMenu) {
                            mainmenu[name].subMenu[list].active = false;
                        }
                        if (mainmenu[name].text == this.routeNameGroup) {
                            for (var list1 in mainmenu[name].subMenu) {
                                if (mainmenu[name].subMenu[list1].text_submenu == this.routeNameGroupSub) {
                                    mainmenu[name].subMenu[list1].active = true;
                                }
                            }
                            break;
                        }
                    }
                }
            }
        },
        test_menu(type, subtype) {
            for (var typeF in this.navbarMenu) {
                if (this.navbarMenu[typeF].text == type) {
                    for (var subtypeF in this.navbarMenu[typeF].subMenu) {
                        if (this.navbarMenu[typeF].subMenu[subtypeF].text_submenu == subtype) {
                            this.navbarMenu[typeF].subMenu[subtypeF].active = true;
                        } else {
                            this.navbarMenu[typeF].subMenu[subtypeF].active = false;
                        }
                    }
                } else {
                    for (var subtypeF in this.navbarMenu[typeF].subMenu) {
                        this.navbarMenu[typeF].subMenu[subtypeF].active = false;
                    }
                }
            }
        },
        menuclick(num) {
            var tis = this;
            if (this.showsubMenu == num) {
                tis.showsubMenu = 0;
            } else {
                tis.showsubMenu = num;
            }

            if (this.$store.state.shownav == false) {
                this.$store.commit("navbarclick", true);
            }
        },
        navbarclick() {
            if (this.$store.state.shownav == false) {
                this.$store.commit("navbarclick", true);
            } else {
                this.$store.commit("navbarclick", false);
                this.showsubMenu = 0;
            }
        },
    },
    watch: {},
};
</script>
