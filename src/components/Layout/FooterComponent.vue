<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  name: "FooterComponent",
  components: {},
})
export default class FooterComponent extends Vue {

}
</script>
<template>
  <el-footer height="auto">
    <el-row>
      <el-col :span="24">
        <a href="/" class="footer-logo">
          <img style="width: 29px; height: 29px" src="@/assets/logo.png" alt="logo">
        </a>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="footer-text">
        {{ $t("footer-text") }}
        <!-- Copyright -->
        <a class="text-dark" href="https://comics.com/"><p class="has-text-centered">Comics</p></a>
        <p class="has-text-centered">Copyright (c) {{ new Date().getFullYear() }}</p>
        <!-- Copyright -->
      </el-col>
    </el-row>
  </el-footer>
</template>
<style lang="scss" scoped>
.el-footer {
  padding: 130px 0;
  text-align: center;
  background-color: #9b9b9b;
  @media (max-width: 768px) {
    padding: 60px 0;
  }
}

.footer-logo {
  display: inline-block;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
}

.footer-text {
  font-size: 18px;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 14px;
  }
}
</style>
