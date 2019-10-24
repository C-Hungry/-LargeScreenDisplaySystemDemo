<template>
<transition :name="trans" mode="out-in">
  <router-view/>
</transition>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      trans: "slide-right"
    }
  },
}
</script>
