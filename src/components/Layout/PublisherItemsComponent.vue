<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {PublisherInterface} from "@/types";
import {PropType} from "vue";

@Options({
  name: "PublisherItemsComponent",
  props: {
    product_type: {required: true, type: String},
    publishers: {required: true, type: Array as PropType<PublisherInterface[]>, default: []},
  },
})
export default class PublisherItemsComponent extends Vue {
  protected publishers?: PublisherInterface[];
  protected product_type?: string;

  protected get publishersList() {
    return this.publishers;
  }

  getRoute(publisher?: PublisherInterface): object {
    return {name: "category", params: {product_type: this.product_type, publisher_slug: publisher?.slug}};
  }

  getIndex(publisher: PublisherInterface) {
    return `/${this.product_type}/${publisher ? publisher.slug : ""}`;
  }
}
</script>
<template>
  <div v-if="publishersList && product_type">
    <el-menu-item :index="'/'+product_type" :route="getRoute()">
      {{ $t("all") }}
    </el-menu-item>
    <el-menu-item
        v-for="publisher in publishersList"
        :key="publisher.id"
        :index="getIndex(publisher)"
        :route="getRoute(publisher)"
    >
      {{ publisher.name }}
    </el-menu-item>
  </div>
</template>
<style scoped>
/*.is-active {*/
/*  background-color: #727979;*/
/*}*/
</style>