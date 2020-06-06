<template>
  <v-navigation-drawer app floating permanent color="grey darken-3" dark>
    <v-list nav dense>
      <v-list-item link v-for="menuItem in menu" :key="menuItem.name" :to="{name: menuItem.route}">
        <v-list-item-icon>
          <v-icon>{{ menuItem.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          name: "Payment",
          icon: "mdi-email",
          route: "payment-page"
        },
        {
          name: "Loan",
          icon: "mdi-folder",
          route: "loan-page"
        },
        {
          name: "Loaner",
          icon: "mdi-bank",
          route: "loaner-page"
        }
      ]
    };
  }
};
</script>
