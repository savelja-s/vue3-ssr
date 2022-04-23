<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { createNamespacedHelpers } from "vuex";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import PublisherItemsComponent from "@/components/Layout/PublisherItemsComponent.vue";
import { PublisherInterface } from "@/types";

// library.add(faShoppingCart);

const storeAuth = createNamespacedHelpers("auth");
const storeCart = createNamespacedHelpers("cart");
const storePublisher = createNamespacedHelpers("publisher");

@Options({
  name: "HeaderComponent",
  components: {
    PublisherItemsComponent,
  },
  computed: {
    ...storeAuth.mapState(["user", "status"]),
    ...storePublisher.mapState(["publishers"]),
  },
  methods: {
    ...storeAuth.mapMutations(["logout", "changeLanguage"]),
    ...storeCart.mapGetters(["cartTotalLength"]),
    ...storePublisher.mapActions(["getListPublisher"]),
  },
})
export default class HeaderComponent extends Vue {
  protected menuIsActive = false;
  private user?: any;
  protected publishers?: PublisherInterface[];
  private status?: any;
  protected logout?: any;
  protected changeLanguage?: any;
  protected cartTotalLength?: any;
  private logoPath = require("@/assets/logo.png");
  protected getListPublisher?: any;

  mounted() {
    this.$i18n.locale = this.status.language;
    !this.publishersList.length &&
      this.getListPublisher &&
      this.getListPublisher();
  }

  get publishersList() {
    return this.publishers ?? [];
  }

  changeLang(val: any) {
    if (val && this.changeLanguage) {
      this.changeLanguage(val);
      this.$i18n.locale = val;
    }
  }

  logoutUser() {
    this.logout && this.logout();
    this.$router.push("/");
  }

  login() {
    !this.user.username && this.$router.push("/login");
  }

  menuNav() {
    this.menuIsActive = !this.menuIsActive;
  }

  cartLength(): number {
    return this.cartTotalLength ? this.cartTotalLength()() : 0;
  }
}
</script>
<template>
  <el-header height="auto">
    <el-row class="" :gutter="20">
      <el-col class="header-menu" :span="18">
        <el-button plain size="small" class="mobile-nav" @click="menuNav">
          <el-icon v-if="menuIsActive">
            <menu />
          </el-icon>
          <el-icon v-else>
            <close />
          </el-icon>
        </el-button>
        <el-menu
          :default-active="$route.fullPath"
          mode="horizontal"
          :router="true"
          :class="{ '': !menuIsActive, isOpen: menuIsActive }"
        >
          <el-menu-item index="/">
            <router-link to="/">
              <img
                style="width: 25px; height: 35px"
                :src="logoPath"
                alt="logo"
              />
            </router-link>
          </el-menu-item>
          <el-sub-menu index="/preorder-comics">
            <template #title>{{ $t("menu.preorder-comics") }}</template>
            <PublisherItemsComponent
              :publishers="publishersList"
              :product_type="'preorder-comics'"
            ></PublisherItemsComponent>
          </el-sub-menu>
          <el-sub-menu index="/comics">
            <template #title>{{ $t("menu.comics") }}</template>
            <PublisherItemsComponent
              :publishers="publishersList"
              :product_type="'comics'"
            ></PublisherItemsComponent>
          </el-sub-menu>
          <el-menu-item index="/about">
            <router-link to="/about">{{ $t("menu.about") }}</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col class="header-user-cart" :span="6">
        <el-radio-group
          v-model="status.language"
          size="small"
          @change="changeLang"
        >
          <el-radio-button
            v-for="(locale, i) in $i18n.availableLocales"
            :key="i"
            :label="locale"
          >
            {{ locale.toUpperCase() }}
          </el-radio-button>
        </el-radio-group>
        <el-dropdown v-if="status.isAuthenticated" size="small">
          <el-button type="primary">
            {{ user.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <span @click="logoutUser" class="text-block">
                  <i class="el-icon-upload el-icon-right"></i>
                  {{ $t("buttons.logout") }}
                </span>
              </el-dropdown-item>
              <el-dropdown-item> Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item>Action 4</el-dropdown-item>
              <el-dropdown-item>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button
          v-else
          @click="login"
          class="logout-btn"
          size="small"
          type="info"
        >
          <i class="el-icon-upload el-icon-right"></i>
          <span class="text-block">{{ $t("buttons.login") }}</span>
        </el-button>
        <router-link to="/cart" class="button is-success">
          <el-badge :value="cartLength()" class="item">
            <el-button round type="info" size="small">
              <font-awesome-icon icon="shopping-cart" />
            </el-button>
          </el-badge>
        </router-link>
      </el-col>
    </el-row>
  </el-header>
</template>
<style lang="scss" scoped>
.el-header {
  padding: 0;
  position: relative;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}

.header-menu {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.el-button.el-button--info.el-button--mini {
  border: none;

  .el-menu-item {
    background: transparent;

    a {
      font-size: 16px;
      text-decoration: none;
    }

    &.is-active {
      border: none;
    }
  }

  @media (max-width: 776px) {
    display: none;
    opacity: 0;
    background: #585757;
  }

  &.isOpen {
    position: absolute;
    width: 100%;
    top: 60%;
    display: block;
    opacity: 1;
  }
}

.mobile-nav {
  display: none;
  margin: 15px 10px 0 0;
  font-size: 14px;
  height: 29px;
  padding: 0 5px;
  @media (max-width: 768px) {
    display: block;
  }
}

.header-logo {
  padding: 5px 10px;
  display: flex;
  height: 29px;
}

.el-radio-group {
  margin: 15px 15px 0 0;
}

.logout-btn {
  margin: 15px 15px 0 0;
  font-size: 14px;
  height: 29px;
  @media (max-width: 480px) {
    .text-block {
      display: none;
    }
  }
}

li.el-menu-item:first-of-type {
  padding-left: 5px;
  padding-right: 5px;
}

li.el-menu-item:first-of-type img {
  margin-bottom: 13px;
}

.bg-secondary {
  background-color: #6c757d;
}
</style>
