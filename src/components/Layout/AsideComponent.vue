<script lang="ts">
import {Options, Vue} from "vue-class-component";
import PublisherItemsComponent from "@/components/Layout/PublisherItemsComponent.vue";
import {createNamespacedHelpers} from "vuex";
import {PublisherInterface} from "@/types";

const storePublisher = createNamespacedHelpers("publisher");

@Options({
  name: "AsideComponent",
  components: {
    PublisherItemsComponent
  },
  computed: {
    ...storePublisher.mapState(["publishers"]),
  },
})
export default class AsideComponent extends Vue {
  protected publishers?: PublisherInterface[];

  protected get activeItem() {
    const publisher_slug = this.$route.params.publisher_slug;
    const product_type = this.$route.params.product_type;
    return `/${product_type}/${publisher_slug}`;
  }
}
</script>
<template>
  <el-aside>
    <el-scrollbar>
      <el-menu
          v-if="publishers"
          :router="true"
          class="el-menu-vertical-demo"
          :default-active="$route.fullPath"
          :default-openeds="['publishers']"
      >
        <el-sub-menu index="publishers">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>{{ $t("publishers") }}</span>
          </template>
          <PublisherItemsComponent
              :publishers="publishers"
              :product_type="$route.params.product_type"
          ></PublisherItemsComponent>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<style scoped>

</style>