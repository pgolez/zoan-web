<template>
  <v-app>
    <v-app-bar app>
      <!-- -->
      v-app-bar
    </v-app-bar>

    <AppNavigationDrawer />

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <router-link to="/payment">Go to payments</router-link>

      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>


<script>
import AppNavigationDrawer from "@/components/base/TheNavigationDrawer";

export default {
  name: "App",
  components: {
    AppNavigationDrawer
  },
  data: () => ({
    //
  })
};
</script>
