<template>
  <div id="app">

    <mh-h-h-e-t-e-r v-if="this.$route.path=='/' ||
    !this.$route.path=='/login' ||
    !this.$route.path=='/register'"/>
    <mh-hea-ter
        v-if="this.$route.path=='/woshizhu'  ||
    !this.$route.path=='/login' ||
    !this.$route.path=='/register'"/>
    <router-view/>
    <mh-footer v-if="!this.$route.path=='/login' ||
    !this.$route.path=='/register'"/>
  </div>
</template>

<script>
import MhHHETER from "@/components/mh-hHETER";
import MhFooter from "@/components/Mh-footer";
import MhHeaTer from "@/components/mh-heaTer";

export default {
  components: {MhHeaTer, MhFooter, MhHHETER}
}
</script>

<style scoped>

</style>
<style>
* {
  text-decoration: none;
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
