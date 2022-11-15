export default function ({ $axios, store, app }) {
  $axios.onRequest((config) => {
      // store.commit("showLoader", true);
      $axios.setToken(store.state.token, "Bearer");
  });

  $axios.onResponse((response) => {
      // store.commit("showLoader", false);
  });

  $axios.onResponseError((error) => {
       console.log(error);
       if (error.response.data.code == 4001) {
            setTimeout(() => {
                app.router.push("/login");
            }, 1000);
        }
      // store.commit("showLoader", false);
      // return Promise.resolve(false);
  });
}

